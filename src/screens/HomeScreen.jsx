// The 3 main things a user can do. Each one has its own screen file.
const MENU = [
  { id: 'find', icon: '🏥', title: 'Find Care Near Me', subtitle: 'Clinics that fit your needs' },
  { id: 'bills', icon: '📄', title: 'Understand a Bill', subtitle: 'Snap a photo, get a plain explanation' },
  { id: 'profile', icon: '🙋', title: 'My Needs & Insurance', subtitle: 'Tell us what helps you' },
]

export default function HomeScreen({ onPick }) {
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
