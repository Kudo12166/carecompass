import BackButton from '../components/BackButton'

export default function FindCareScreen({ onBack }) {
  return (
    <div className="flex flex-col gap-4">
      <BackButton onBack={onBack} />
      <h2 className="text-3xl font-bold">Find Care Near Me</h2>
      <p className="text-xl">Coming soon!</p>
    </div>
  )
}
