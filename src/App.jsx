import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import FindCareScreen from './screens/FindCareScreen'
import BillsScreen from './screens/BillsScreen'

export default function App() {
  // "screen" remembers which page we're on. Changing it re-draws the app.
  const [screen, setScreen] = useState('home')
  const goHome = () => setScreen('home')

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-xl mx-auto">
        {screen === 'home' && <HomeScreen onPick={setScreen} />}
        {screen === 'profile' && <ProfileScreen onBack={goHome} />}
        {screen === 'find' && <FindCareScreen onBack={goHome} />}
        {screen === 'bills' && <BillsScreen onBack={goHome} />}
      </div>
    </main>
  )
}
