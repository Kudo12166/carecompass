// Shared lists used by the Profile screen AND the clinic data.
// Clinics in clinics.js should use these same "id" values in their
// "features" and "insurance" lists so filtering works.

export const NEEDS = [
  { id: 'wheelchair', icon: '♿', label: 'Wheelchair access' },
  { id: 'asl', icon: '🤟', label: 'Sign language (ASL) interpreter' },
  { id: 'quiet', icon: '🤫', label: 'Quiet / sensory-friendly space' },
  { id: 'largeprint', icon: '🔍', label: 'Large print or Braille forms' },
  { id: 'serviceanimal', icon: '🐕‍🦺', label: 'Service animal friendly' },
  { id: 'parking', icon: '🅿️', label: 'Accessible parking' },
  { id: 'spanish', icon: '🗣️', label: 'Spanish-speaking staff' },
  { id: 'telehealth', icon: '💻', label: 'Video visits (telehealth)' },
]

export const INSURANCE = [
  { id: 'medicaid', label: 'Georgia Medicaid' },
  { id: 'medicare', label: 'Medicare' },
  { id: 'peachcare', label: 'PeachCare for Kids' },
  { id: 'bcbs', label: 'Anthem Blue Cross Blue Shield' },
  { id: 'aetna', label: 'Aetna' },
  { id: 'united', label: 'UnitedHealthcare' },
  { id: 'cigna', label: 'Cigna' },
  { id: 'kaiser', label: 'Kaiser Permanente' },
  { id: 'none', label: "I don't have insurance" },
]

// Access Modes change how the WHOLE app looks and behaves.
// "autoNeeds" are clinic needs we pre-select when a mode is turned on.
export const MODES = [
  { id: 'vision', icon: '👁️', label: 'Seeing', desc: 'Bigger text, stronger colors, read pages out loud', autoNeeds: ['largeprint'] },
  { id: 'hearing', icon: '👂', label: 'Hearing', desc: 'No phone calls needed, ASL-friendly clinics first', autoNeeds: ['asl'] },
  { id: 'movement', icon: '✋', label: 'Moving or using my hands', desc: 'Extra-large buttons, wheelchair access required', autoNeeds: ['wheelchair', 'parking'] },
  { id: 'simple', icon: '🧠', label: 'Reading or remembering', desc: 'Simple words, fewer things on screen', autoNeeds: [] },
  { id: 'sensory', icon: '🌿', label: 'Feeling overwhelmed (sensory)', desc: 'Calm colors, no motion, quiet clinics first', autoNeeds: ['quiet'] },
]
