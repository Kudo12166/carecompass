import { useMode } from '../modes'

// The 3 main things a user can do. Each one has its own screen file.
// "simple" is the wording used in Reading or remembering mode.
const MENU = [
  { id: 'find', icon: '🏥', title: 'Find Care Near Me', simple: 'Find a doctor', subtitle: 'Clinics that fit your needs' },
  { id: 'bills', icon: '📄', title: 'Understand a Bill', simple: 'Help with a bill', subtitle: 'Snap a photo, get a plain explanation' },
  { id: 'profile', icon: '🙋', title: 'My Needs & Insurance', simple: 'About me', subtitle: 'Tell us what helps you' },
]

export default function HomeScreen({ onPick }) {
  const simple = useMode('simple')

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center">CareCompass</h1>
      <p className="text-xl text-center text-slate-600 mb-4">
        {simple ? 'What do you want to do?' : 'What do you need help with today?'}
      </p>

      {MENU.map((item) => (
        <button
          key={item.id}
          onClick={() => onPick(item.id)}
          className="flex items-center gap-4 p-6 rounded-2xl bg-white border-4 border-blue-700 text-left
                     hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          <span className={simple ? 'text-7xl' : 'text-5xl'} aria-hidden="true">{item.icon}</span>
          <span>
            <span className="block text-2xl font-bold text-blue-900">{simple ? item.simple : item.title}</span>
            {!simple && <span className="block text-lg text-slate-700">{item.subtitle}</span>}
          </span>
        </button>
      ))}

      <button
        onClick={() => onPick('modes')}
        className="mt-4 p-4 rounded-xl bg-slate-200 text-xl font-semibold
                   focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        ⚙️ {simple ? 'Change how the app looks' : 'Change Access Modes'}
      </button>
    </div>
  )
}
