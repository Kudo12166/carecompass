import { useState } from 'react'

// The 3 main things a user can do. Each one becomes its own screen later.
const MENU = [
  { id: 'find', icon: '🏥', title: 'Find Care Near Me', subtitle: 'Clinics that fit your needs' },
  { id: 'bills', icon: '📄', title: 'Understand a Bill', subtitle: 'Snap a photo, get a plain explanation' },
  { id: 'profile', icon: '🙋', title: 'My Needs & Insurance', subtitle: 'Tell us what helps you' },
]

function HomeScreen({ onPick }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center">CareCompass</h1>
      <p className="text-xl text-center text-slate-600 mb-4">What do you need help with today?</p>

      {MENU.map((item) => (
        <button
          key={item.id}
          onClick={() => onPick(item.id)}
          className="flex items-center gap-4 p-6 rounded-2xl bg-white border-4 border-blue-700 text-left
                     hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          <span className="text-5xl" aria-hidden="true">{item.icon}</span>
          <span>
            <span className="block text-2xl font-bold text-blue-900">{item.title}</span>
            <span className="block text-lg text-slate-700">{item.subtitle}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

// Temporary screen we'll replace with the real ones in the next steps.
function ComingSoon({ title, onBack }) {
  return (
    <div className="flex flex-col gap-4">
      <BackButton onBack={onBack} />
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-xl">Coming soon!</p>
    </div>
  )
}

function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="self-start px-5 py-3 rounded-xl bg-slate-200 text-xl font-semibold
                 focus:outline-none focus:ring-4 focus:ring-yellow-400"
    >
      ← Back
    </button>
  )
}

export default function App() {
  // "screen" remembers which page we're on. Changing it re-draws the app.
  const [screen, setScreen] = useState('home')
  const goHome = () => setScreen('home')

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-xl mx-auto">
        {screen === 'home' && <HomeScreen onPick={setScreen} />}
        {screen !== 'home' && (
          <ComingSoon title={MENU.find((m) => m.id === screen).title} onBack={goHome} />
        )}
      </div>
    </main>
  )
}
