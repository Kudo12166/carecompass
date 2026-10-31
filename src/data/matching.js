// Scores how well a clinic fits a person. Returns a 0-100 "match" plus details.

// Distance in miles between two map points (haversine formula).
export function milesBetween(a, b) {
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 3958.8 * 2 * Math.asin(Math.sqrt(h))
}

// Access Modes make some needs matter more (e.g. Hearing -> ASL counts double).
const MODE_BOOSTS = {
  hearing: ['asl', 'telehealth'],
  sensory: ['quiet'],
  vision: ['largeprint', 'serviceanimal'],
}

export function scoreClinic(clinic, profile, here) {
  const met = profile.needs.filter((n) => clinic.features.includes(n))
  const missing = profile.needs.filter((n) => !clinic.features.includes(n))

  const boosted = profile.modes.flatMap((m) => MODE_BOOSTS[m] ?? [])
  const weight = (n) => (boosted.includes(n) ? 2 : 1)
  const total = profile.needs.reduce((sum, n) => sum + weight(n), 0)
  const needsScore = total ? met.reduce((sum, n) => sum + weight(n), 0) / total : 1

  const takesInsurance = !profile.insurance || clinic.insurance.includes(profile.insurance)
  const match = Math.round(100 * (0.7 * needsScore + 0.3 * (takesInsurance ? 1 : 0)))

  // Movement mode: a clinic without wheelchair access is not an option at all.
  const blocked = profile.modes.includes('movement') && !clinic.features.includes('wheelchair')

  return { clinic, match, met, missing, takesInsurance, blocked, miles: milesBetween(here, clinic) }
}

export function rankClinics(clinics, profile, here) {
  return clinics
    .map((c) => scoreClinic(c, profile, here))
    .filter((r) => !r.blocked)
    .sort((a, b) => b.match - a.match || a.miles - b.miles)
}
