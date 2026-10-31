import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { SAMPLE_BILL } from '../data/sampleBill'
import { useMode } from '../modes'

// Phone photos are huge - shrink to max 1600px so uploads are fast.
function shrinkImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

function speak(text) {
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.9
  speechSynthesis.speak(utterance)
}

export default function BillsScreen({ profile, onBack }) {
  const simple = useMode('simple')
  const vision = useMode('vision')
  const [preview, setPreview] = useState(null)
  const [pasting, setPasting] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  async function explain(payload) {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/explain-bill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, modes: profile.modes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function onPhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const image = await shrinkImage(file)
    setPreview(image)
    explain({ image })
  }

  // Seeing mode: read the answer out loud as soon as it arrives.
  useEffect(() => {
    if (result && vision) speak(`${result.summary} You owe ${result.youOwe}. ${result.looksWrong ? 'This bill may have a mistake.' : ''}`)
  }, [result, vision])

  return (
    <div className="flex flex-col gap-5">
      <BackButton onBack={onBack} />
      <h2 className="text-3xl font-bold">{simple ? 'Help with a bill' : 'Understand a Bill'}</h2>
      <p className="text-xl text-slate-700">
        {simple ? 'Take a picture of your bill. We will explain it.' : 'Take a photo of a medical bill or insurance letter. We will explain it in plain words.'}
      </p>

      <label className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-blue-700 text-white text-2xl font-bold cursor-pointer
                        focus-within:ring-4 focus-within:ring-yellow-400">
        <span aria-hidden="true">📷</span> Take or choose a photo
        <input type="file" accept="image/*" capture="environment" onChange={onPhoto} className="sr-only" />
      </label>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => setPasting(!pasting)} aria-expanded={pasting}
                className="flex-1 p-4 rounded-xl bg-slate-200 text-xl font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-400">
          📝 Type or paste text
        </button>
        <button onClick={() => { setPreview(null); explain({ text: SAMPLE_BILL }) }}
                className="flex-1 p-4 rounded-xl bg-slate-200 text-xl font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-400">
          🧪 Try a sample bill
        </button>
      </div>

      {pasting && (
        <div className="flex flex-col gap-3">
          <label htmlFor="billText" className="text-xl font-semibold">Bill text</label>
          <textarea id="billText" rows={6} value={text} onChange={(e) => setText(e.target.value)}
                    className="p-4 rounded-xl border-4 border-slate-300 text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400" />
          <button onClick={() => text.trim() && explain({ text })}
                  className="p-4 rounded-xl bg-green-700 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400">
            Explain this →
          </button>
        </div>
      )}

      {preview && <img src={preview} alt="Your bill photo" className="max-h-64 object-contain rounded-xl border-2 border-slate-300" />}

      <div aria-live="polite">
        {loading && (
          <p className="p-5 rounded-2xl bg-white border-4 border-blue-700 text-2xl font-semibold text-center">
            ⏳ Reading your bill… this takes about 10 seconds.
          </p>
        )}
        {error && <p role="alert" className="p-5 rounded-2xl bg-red-50 border-4 border-red-600 text-xl">{error}</p>}
        {result && <BillResult result={result} simple={simple} />}
      </div>
    </div>
  )
}

function BillResult({ result, simple }) {
  const [copied, setCopied] = useState(false)

  return (
    <section className="flex flex-col gap-4" aria-label="Bill explanation">
      {result.looksWrong && (
        <div role="alert" className="p-5 rounded-2xl bg-yellow-100 border-4 border-yellow-600">
          <p className="text-2xl font-bold">⚠️ {simple ? 'This bill may be wrong.' : 'This bill may have a mistake'}</p>
          <ul className="mt-2 list-disc pl-6 text-lg">
            {result.problems.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      )}

      <div className="p-5 rounded-2xl bg-white border-4 border-slate-300">
        <p className="text-lg font-semibold text-slate-600">{result.documentType}</p>
        <p className="text-xl mt-1">{result.summary}</p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[['You owe', result.youOwe], ['Insurance paid', result.insurancePaid], ['Due date', result.dueDate]].map(([label, value]) => (
          <div key={label} className="p-4 rounded-2xl bg-white border-4 border-blue-700">
            <dt className="text-lg text-slate-700">{label}</dt>
            <dd className="text-2xl font-bold text-blue-900">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="p-5 rounded-2xl bg-white border-4 border-slate-300">
        <h3 className="text-2xl font-bold mb-2">What to do next</h3>
        <ol className="list-decimal pl-7 text-xl flex flex-col gap-2">
          {result.nextSteps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </div>

      <div className="p-5 rounded-2xl bg-green-50 border-4 border-green-700">
        <h3 className="text-2xl font-bold mb-2">{simple ? 'What to say' : 'What to say to the billing office'}</h3>
        <p className="text-xl">{result.contactScript}</p>
        <div className="flex flex-wrap gap-3 mt-3">
          <button onClick={() => { navigator.clipboard.writeText(result.contactScript); setCopied(true) }}
                  className="flex-1 p-4 rounded-xl bg-green-700 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400">
            {copied ? '✓ Copied!' : '📋 Copy message'}
          </button>
          <button onClick={() => speak(result.contactScript)}
                  className="flex-1 p-4 rounded-xl bg-blue-700 text-white text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400">
            🔊 Read it to me
          </button>
        </div>
      </div>

      <p className="text-base text-slate-600">CareCompass gives general help, not legal or medical advice.</p>
    </section>
  )
}
