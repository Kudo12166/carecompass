import BackButton from '../components/BackButton'
import { NEEDS, INSURANCE } from '../data/options'

export default function ProfileScreen({ profile, setProfile, onBack, onDone }) {
  // Add the need if it's not picked yet, remove it if it is.
  function toggleNeed(id) {
    const needs = profile.needs.includes(id)
      ? profile.needs.filter((n) => n !== id)
      : [...profile.needs, id]
    setProfile({ ...profile, needs })
  }

  return (
    <div className="flex flex-col gap-6">
      <BackButton onBack={onBack} />
      <h2 className="text-3xl font-bold">My Needs &amp; Insurance</h2>

      <section>
        <h3 className="text-2xl font-semibold mb-1">What helps you at a doctor's office?</h3>
        <p className="text-lg text-slate-600 mb-3">Tap all that apply. Tap again to remove.</p>
        <div className="grid gap-3">
          {NEEDS.map((need) => {
            const picked = profile.needs.includes(need.id)
            return (
              <button
                key={need.id}
                onClick={() => toggleNeed(need.id)}
                aria-pressed={picked}
                className={`flex items-center gap-4 p-4 rounded-xl border-4 text-left text-xl font-semibold
                            focus:outline-none focus:ring-4 focus:ring-yellow-400
                            ${picked ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
              >
                <span className="text-3xl" aria-hidden="true">{need.icon}</span>
                <span className="flex-1">{need.label}</span>
                <span aria-hidden="true">{picked ? '✓' : ''}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <label htmlFor="insurance" className="block text-2xl font-semibold mb-3">
          What insurance do you have?
        </label>
        <select
          id="insurance"
          value={profile.insurance}
          onChange={(e) => setProfile({ ...profile, insurance: e.target.value })}
          className="w-full p-4 rounded-xl border-4 border-slate-300 bg-white text-xl
                     focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          <option value="">Choose one…</option>
          {INSURANCE.map((ins) => (
            <option key={ins.id} value={ins.id}>{ins.label}</option>
          ))}
        </select>
      </section>

      <button
        onClick={onDone}
        className="p-5 rounded-2xl bg-green-700 text-white text-2xl font-bold
                   hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        Save &amp; Find Care →
      </button>
    </div>
  )
}
