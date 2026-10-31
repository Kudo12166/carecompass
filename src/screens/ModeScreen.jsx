import { MODES } from '../data/options'

export default function ModeScreen({ profile, setProfile, onDone }) {
  // Turning a mode on also pre-selects the clinic needs that go with it.
  function toggleMode(mode) {
    const on = profile.modes.includes(mode.id)
    const modes = on ? profile.modes.filter((m) => m !== mode.id) : [...profile.modes, mode.id]
    const needs = on ? profile.needs : [...new Set([...profile.needs, ...mode.autoNeeds])]
    setProfile({ ...profile, modes, needs })
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center">Welcome to CareCompass</h1>
      <p className="text-2xl text-center text-slate-700">How can we make this app easier for you?</p>
      <p className="text-lg text-center text-slate-600">Pick any that help. The app changes right away.</p>

      {MODES.map((mode) => {
        const picked = profile.modes.includes(mode.id)
        return (
          <button
            key={mode.id}
            onClick={() => toggleMode(mode)}
            aria-pressed={picked}
            className={`flex items-center gap-4 p-5 rounded-2xl border-4 text-left
                        focus:outline-none focus:ring-4 focus:ring-yellow-400
                        ${picked ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
          >
            <span className="text-5xl" aria-hidden="true">{mode.icon}</span>
            <span className="flex-1">
              <span className="block text-2xl font-bold">{mode.label}</span>
              <span className="block text-lg">{mode.desc}</span>
            </span>
            <span className="text-3xl" aria-hidden="true">{picked ? '✓' : ''}</span>
          </button>
        )
      })}

      <button
        onClick={onDone}
        className="mt-2 p-5 rounded-2xl bg-green-700 text-white text-2xl font-bold
                   hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        {profile.modes.length ? 'Continue →' : 'Skip, none of these →'}
      </button>
    </div>
  )
}
