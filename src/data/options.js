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
