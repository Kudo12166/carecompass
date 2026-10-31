import { useState } from 'react'

// Reads everything on the current screen out loud using the browser's built-in voice.
export default function ReadAloudButton() {
  const [speaking, setSpeaking] = useState(false)

  function toggle() {
    if (speaking) {
      speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const text = document.getElementById('screen')?.innerText ?? ''
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.onend = () => setSpeaking(false)
    speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 px-5 py-4 rounded-full bg-blue-900 text-white text-xl font-bold shadow-lg
                 focus:outline-none focus:ring-4 focus:ring-yellow-400"
    >
      {speaking ? '⏹ Stop' : '🔊 Read to me'}
    </button>
  )
}
