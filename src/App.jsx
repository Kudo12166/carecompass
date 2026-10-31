import { useEffect, useState } from 'react'
import { ModesContext } from './modes'
import ReadAloudButton from './components/ReadAloudButton'
import ModeScreen from './screens/ModeScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import FindCareScreen from './screens/FindCareScreen'
import BillsScreen from './screens/BillsScreen'

const EMPTY_PROFILE = { needs: [], insurance: '', modes: [], onboarded: false }

// Load the saved profile from the browser, or start empty.
function loadProfile() {
  const saved = localStorage.getItem('profile')
  return { ...EMPTY_PROFILE, ...(saved ? JSON.parse(saved) : {}) }
}

export default function App() {
  // "profile" holds the user's modes, needs + insurance, shared by every screen.
  const [profile, setProfile] = useState(loadProfile)
  // "screen" remembers which page we're on. First-time users see Access Modes.
  const [screen, setScreen] = useState(profile.onboarded ? 'home' : 'modes')
  const goHome = () => setScreen('home')

  // Save the profile whenever it changes, so it survives a page refresh.
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  // Put each Access Mode on <html> (e.g. data-vision) so index.css can restyle everything.
  useEffect(() => {
    const html = document.documentElement
    for (const attr of Object.keys(html.dataset)) delete html.dataset[attr]
    for (const mode of profile.modes) html.dataset[mode] = 'on'
  }, [profile.modes])

  return (
    <ModesContext.Provider value={profile.modes}>
      <main className="min-h-screen bg-slate-100 p-6 pb-28">
        <div id="screen" className="max-w-xl mx-auto">
          {screen === 'modes' && (
            <ModeScreen
              profile={profile}
              setProfile={setProfile}
              onDone={() => {
                setProfile({ ...profile, onboarded: true })
                goHome()
              }}
            />
          )}
          {screen === 'home' && <HomeScreen onPick={setScreen} />}
          {screen === 'profile' && (
            <ProfileScreen
              profile={profile}
              setProfile={setProfile}
              onBack={goHome}
              onDone={() => setScreen('find')}
            />
          )}
          {screen === 'find' && <FindCareScreen profile={profile} onBack={goHome} />}
          {screen === 'bills' && <BillsScreen onBack={goHome} />}
        </div>
      </main>
      <ReadAloudButton />
    </ModesContext.Provider>
  )
}
