import { useEffect, useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import FindCareScreen from './screens/FindCareScreen'
import BillsScreen from './screens/BillsScreen'

// Load the saved profile from the browser, or start empty.
function loadProfile() {
  const saved = localStorage.getItem('profile')
  return saved ? JSON.parse(saved) : { needs: [], insurance: '' }
}

export default function App() {
  // "screen" remembers which page we're on. Changing it re-draws the app.
  const [screen, setScreen] = useState('home')
  // "profile" holds the user's needs + insurance, shared by every screen.
  const [profile, setProfile] = useState(loadProfile)
  const goHome = () => setScreen('home')

  // Save the profile whenever it changes, so it survives a page refresh.
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-xl mx-auto">
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
  )
}
