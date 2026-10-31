// SAMPLE clinic data for the demo. Names, phones and accessibility details are
// placeholders - replace with real Gwinnett clinics (Google Maps) before judging.
// "features" and "insurance" must use the ids from options.js.

export const CLINIC_TYPES = ['Primary Care', 'Dentist', 'Urgent Care', 'Pediatrics', 'Eye Care', 'Mental Health']

export const CLINICS = [
  { id: 1, name: 'Lawrenceville Family Medicine', type: 'Primary Care', city: 'Lawrenceville', phone: '770-555-0101',
    lat: 33.9562, lng: -83.9880, features: ['wheelchair', 'parking', 'asl', 'largeprint'], insurance: ['medicaid', 'medicare', 'bcbs', 'aetna'] },
  { id: 2, name: 'Duluth Community Health Center', type: 'Primary Care', city: 'Duluth', phone: '770-555-0102',
    lat: 34.0029, lng: -84.1446, features: ['wheelchair', 'parking', 'spanish', 'telehealth', 'serviceanimal'], insurance: ['medicaid', 'peachcare', 'none', 'united'] },
  { id: 3, name: 'Snellville Quiet Care Clinic', type: 'Primary Care', city: 'Snellville', phone: '770-555-0103',
    lat: 33.8573, lng: -84.0199, features: ['quiet', 'wheelchair', 'serviceanimal', 'telehealth'], insurance: ['bcbs', 'cigna', 'aetna', 'medicare'] },
  { id: 4, name: 'Gwinnett Urgent Care - Norcross', type: 'Urgent Care', city: 'Norcross', phone: '770-555-0104',
    lat: 33.9412, lng: -84.2135, features: ['wheelchair', 'parking', 'spanish'], insurance: ['medicaid', 'medicare', 'bcbs', 'united', 'aetna', 'cigna', 'none'] },
  { id: 5, name: 'Buford Urgent Care', type: 'Urgent Care', city: 'Buford', phone: '770-555-0105',
    lat: 34.1207, lng: -84.0044, features: ['parking'], insurance: ['bcbs', 'united', 'none'] },
  { id: 6, name: 'Bright Smiles Dental of Lilburn', type: 'Dentist', city: 'Lilburn', phone: '770-555-0106',
    lat: 33.8901, lng: -84.1430, features: ['wheelchair', 'quiet', 'parking'], insurance: ['medicaid', 'peachcare', 'cigna'] },
  { id: 7, name: 'Suwanee Family Dentistry', type: 'Dentist', city: 'Suwanee', phone: '770-555-0107',
    lat: 34.0515, lng: -84.0713, features: ['asl', 'largeprint'], insurance: ['bcbs', 'aetna', 'united'] },
  { id: 8, name: "Dacula Children's Clinic", type: 'Pediatrics', city: 'Dacula', phone: '770-555-0108',
    lat: 33.9887, lng: -83.8980, features: ['quiet', 'wheelchair', 'spanish', 'serviceanimal'], insurance: ['medicaid', 'peachcare', 'bcbs', 'kaiser'] },
  { id: 9, name: 'Grayson Pediatric Partners', type: 'Pediatrics', city: 'Grayson', phone: '770-555-0109',
    lat: 33.8943, lng: -83.9557, features: ['parking', 'telehealth'], insurance: ['peachcare', 'cigna', 'aetna'] },
  { id: 10, name: 'ClearView Eye Care Lawrenceville', type: 'Eye Care', city: 'Lawrenceville', phone: '770-555-0110',
    lat: 33.9701, lng: -84.0010, features: ['largeprint', 'wheelchair', 'serviceanimal', 'parking'], insurance: ['medicare', 'bcbs', 'united'] },
  { id: 11, name: 'Peachtree Corners Mind & Wellness', type: 'Mental Health', city: 'Peachtree Corners', phone: '770-555-0111',
    lat: 33.9701, lng: -84.2216, features: ['telehealth', 'quiet', 'asl', 'wheelchair'], insurance: ['medicaid', 'medicare', 'kaiser', 'none'] },
  { id: 12, name: 'Kaiser Permanente Gwinnett', type: 'Primary Care', city: 'Duluth', phone: '770-555-0112',
    lat: 33.9890, lng: -84.1180, features: ['wheelchair', 'parking', 'asl', 'spanish', 'telehealth', 'largeprint'], insurance: ['kaiser'] },
]
