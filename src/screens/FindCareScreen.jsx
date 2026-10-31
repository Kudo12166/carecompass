import { useState } from 'react'
import BackButton from '../components/BackButton'
import { CLINICS, CLINIC_TYPES } from '../data/clinics'
import { NEEDS, INSURANCE } from '../data/options'
import { rankClinics } from '../data/matching'
import { useMode } from '../modes'

// Starting point until the user shares their location (Lawrenceville, GA).
const DEFAULT_SPOT = { lat: 33.9562, lng: -83.988, label: 'Lawrenceville' }

const needLabel = (id) => NEEDS.find((n) => n.id === id)
const insuranceLabel = (id) => INSURANCE.find((i) => i.id === id)?.label

export default function FindCareScreen({ profile, onBack }) {
  const simple = useMode('simple')
  const [type, setType] = useState('All')
  const [here, setHere] = useState(DEFAULT_SPOT)
  const [locating, setLocating] = useState(false)

  function useMyLocation() {
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setHere({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'your location' })
        setLocating(false)
      },
      () => setLocating(false),
    )
  }

  const pool = type === 'All' ? CLINICS : CLINICS.filter((c) => c.type === type)
  const results = rankClinics(pool, profile, here).slice(0, simple ? 3 : undefined)

  return (
    <div className="flex flex-col gap-5">
      <BackButton onBack={onBack} />
      <h2 className="text-3xl font-bold">{simple ? 'Doctors for you' : 'Find Care Near Me'}</h2>

      {profile.needs.length === 0 && !profile.insurance && (
        <p className="p-4 rounded-xl bg-yellow-100 border-2 border-yellow-500 text-lg">
          Tip: go to “My Needs &amp; Insurance” first so we can find the best match for you.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-lg">Near <strong>{here.label}</strong></span>
        <button
          onClick={useMyLocation}
          className="px-4 py-2 rounded-xl bg-slate-200 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          {locating ? 'Finding you…' : '📍 Use my location'}
        </button>
      </div>

      {!simple && (
        <div role="group" aria-label="Type of care" className="flex flex-wrap gap-2">
          {['All', ...CLINIC_TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`px-4 py-2 rounded-full border-2 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-400
                          ${type === t ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white border-slate-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {profile.modes.includes('movement') && (
        <p className="text-lg text-slate-700">♿ Showing only places with wheelchair access.</p>
      )}

      <ol className="flex flex-col gap-4" aria-label="Clinics, best match first">
        {results.map((r) => (
          <li key={r.clinic.id}>
            <ClinicCard result={r} profile={profile} simple={simple} />
          </li>
        ))}
      </ol>
      {results.length === 0 && <p className="text-xl">No clinics found. Try “All” types.</p>}
    </div>
  )
}

function ClinicCard({ result, profile, simple }) {
  const { clinic, match, met, missing, takesInsurance, miles } = result
  const hearing = useMode('hearing')
  const [copied, setCopied] = useState(false)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.name + ' ' + clinic.city + ' GA')}`

  // Deaf / hard-of-hearing users get a ready-to-send message instead of "call us".
  function copyMessage() {
    const needs = profile.needs.map((n) => needLabel(n)?.label.toLowerCase()).join(', ')
    const text = `Hello, I would like to make an appointment at ${clinic.name}. ` +
      `I am Deaf/hard of hearing, so please contact me by text or email instead of a phone call.` +
      (needs ? ` I will need: ${needs}.` : '') + ' Thank you!'
    navigator.clipboard.writeText(text)
    setCopied(true)
  }

  const badgeColor = match >= 80 ? 'bg-green-700' : match >= 50 ? 'bg-yellow-600' : 'bg-slate-600'

  return (
    <article className="p-5 rounded-2xl bg-white border-4 border-slate-300 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-blue-900">{clinic.name}</h3>
          <p className="text-lg text-slate-700">{clinic.type} · {clinic.city} · {miles.toFixed(1)} miles away</p>
        </div>
        <span className={`shrink-0 px-3 py-2 rounded-xl text-white text-xl font-bold ${badgeColor}`}>
          {match}% match
        </span>
      </div>

      <p className={`text-lg font-semibold ${takesInsurance ? 'text-green-800' : 'text-red-700'}`}>
        {takesInsurance
          ? `✓ ${profile.insurance ? `Takes ${insuranceLabel(profile.insurance)}` : 'Insurance not set'}`
          : `✗ Does not take ${insuranceLabel(profile.insurance)}`}
      </p>

      {!simple && (met.length > 0 || missing.length > 0) && (
        <ul className="flex flex-wrap gap-2" aria-label="Your needs">
          {met.map((n) => (
            <li key={n} className="px-3 py-1 rounded-full bg-green-100 border-2 border-green-700 text-base">
              ✓ {needLabel(n)?.label}
            </li>
          ))}
          {missing.map((n) => (
            <li key={n} className="px-3 py-1 rounded-full bg-red-50 border-2 border-red-300 text-base line-through decoration-2">
              <span className="sr-only">Missing: </span>✗ {needLabel(n)?.label}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3">
        <a href={mapsUrl} target="_blank" rel="noreferrer"
           className="flex-1 text-center p-4 rounded-xl bg-blue-700 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400">
          🗺️ Directions
        </a>
        {hearing ? (
          <button onClick={copyMessage}
                  className="flex-1 p-4 rounded-xl bg-green-700 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400">
            {copied ? '✓ Message copied!' : '✉️ Copy a message to send'}
          </button>
        ) : (
          <a href={`tel:${clinic.phone}`}
             className="flex-1 text-center p-4 rounded-xl bg-green-700 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400">
            📞 Call {clinic.phone}
          </a>
        )}
      </div>
    </article>
  )
}
