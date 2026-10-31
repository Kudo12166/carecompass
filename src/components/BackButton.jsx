export default function BackButton({ onBack }) {
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
