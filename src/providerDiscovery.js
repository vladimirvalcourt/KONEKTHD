const STATE_PATTERN = /\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)\b/g

const CATEGORY_ALIASES = {
  healthcare: ["health", "medical", "clinic", "dental", "therapy", "care", "doula", "doulas", "midwife", "maternal", "birthing"],
  legal: ["legal", "law", "attorney", "immigration"],
  financial: ["financial", "finance", "tax", "account", "insurance"],
  translation: ["translation", "interpretation", "interpreter", "language service"],
  community: ["community", "education", "housing", "food", "social", "nonprofit"],
}

export const PROVIDER_CATEGORIES = ["healthcare", "legal", "financial", "translation", "community"]

let providerRequest

const KNOWN_UNAVAILABLE_URLS = new Set([
  "https://www.hillphysicians.com/doctor/lydie-dahlia-francillon-md",
])

function configuredSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "")
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) throw new Error("provider-directory-not-configured")
  return { url, key }
}

export function providerStateCodes(provider) {
  const locationText = `${provider.address || ""} ${provider.service_area || ""}`
  return [...new Set(locationText.match(STATE_PATTERN) || [])]
}

export function isNationwideProvider(provider) {
  const text = `${provider.address || ""} ${provider.service_area || ""}`.toLowerCase()
  return text.includes("nationwide") || text.includes("national remote")
}

export function providerCategory(provider) {
  const text = `${provider.category || ""} ${provider.specialty || ""}`.toLowerCase()
  return Object.entries(CATEGORY_ALIASES).find(([, terms]) => terms.some((term) => text.includes(term)))?.[0] || "other"
}

export function providerMatches(provider, { category = "all", query = "" } = {}) {
  if (category !== "all" && providerCategory(provider) !== category) return false
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true
  const searchable = [provider.name, provider.business_name, provider.category, provider.specialty, provider.specialty_ht, provider.description, provider.description_ht, provider.address, ...(Array.isArray(provider.services) ? provider.services : [])].filter(Boolean).join(" ").toLowerCase()
  return searchable.includes(normalized)
}

export function availableProviderCategories(providers) {
  const available = new Set(providers.map(providerCategory))
  return PROVIDER_CATEGORIES.filter((category) => available.has(category))
}

export function splitProvidersForState(providers, stateCode) {
  const normalizedState = stateCode?.toUpperCase()
  return {
    local: providers.filter((provider) => !isNationwideProvider(provider) && providerStateCodes(provider).includes(normalizedState)),
    nationwide: providers.filter(isNationwideProvider),
  }
}

export function safeExternalUrl(value) {
  if (!value) return null
  try {
    const candidate = new URL(value.startsWith("http") ? value : `https://${value}`)
    if (!["http:", "https:"].includes(candidate.protocol)) return null
    const normalized = candidate.href.replace(/\/$/, "")
    return KNOWN_UNAVAILABLE_URLS.has(normalized) ? null : candidate.href
  } catch {
    return null
  }
}

export function isLikelyBookingUrl(value) {
  const url = safeExternalUrl(value)
  if (!url) return false
  return /(?:book|booking|appointment|schedule|request-an-appointment|make-an-appointment)/i.test(new URL(url).pathname)
}

export function directionsUrl(provider) {
  const destination = provider.address?.trim()
  if (!destination) return null
  const params = new URLSearchParams({ api: "1", destination })
  return `https://www.google.com/maps/dir/?${params}`
}

export function loadPublishedProviders() {
  if (providerRequest) return providerRequest
  const { url, key } = configuredSupabase()
  const baseColumns = ["id", "name", "business_name", "category", "specialty", "specialty_ht", "description", "description_ht", "phone", "website", "appointment_url", "address", "service_area", "latitude", "longitude", "image_url", "services", "language_access_type", "language_verification_status", "business_verification_status", "accepting_new_patients", "hours_status_text", "weekly_hours", "insurance_accepted", "medicaid_accepted", "medicare_accepted", "telehealth_available", "last_verified_at"]
  const publicColumns = [...baseColumns, "source_count", "identity_source_confirmed", "language_source_confirmed", "contact_source_confirmed", "last_source_checked_at", "source_freshness", "source_references"].join(",")
  const headers = { apikey: key }
  const publicEndpoint = `${url}/rest/v1/public_provider_directory?select=${publicColumns}&order=name.asc`
  const compatibleEndpoint = `${url}/rest/v1/providers?select=${baseColumns.join(",")}&publication_status=eq.PUBLISHED&order=name.asc`
  providerRequest = fetch(publicEndpoint, { headers }).then(async (response) => {
    if (response.ok) return response.json()
    if (response.status !== 404) throw new Error(`provider-directory-${response.status}`)
    const fallback = await fetch(compatibleEndpoint, { headers })
    if (!fallback.ok) throw new Error(`provider-directory-${fallback.status}`)
    return fallback.json()
  }).catch((error) => {
    providerRequest = undefined
    throw error
  })
  return providerRequest
}

export async function stateFromZip(zipCode) {
  const zip = zipCode.trim()
  if (!/^\d{5}$/.test(zip)) throw new Error("invalid-zip")
  const response = await fetch(`https://api.zippopotam.us/us/${zip}`)
  if (!response.ok) throw new Error(response.status === 404 ? "invalid-zip" : "location-unavailable")
  const data = await response.json()
  const stateCode = data.places?.[0]?.["state abbreviation"]
  if (!stateCode) throw new Error("location-unavailable")
  return { stateCode, place: data.places[0]["place name"] }
}

export async function stateFromCoordinates(latitude, longitude) {
  const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), localityLanguage: "en" })
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`)
  if (!response.ok) throw new Error("location-unavailable")
  const data = await response.json()
  if (data.countryCode !== "US") throw new Error("outside-us")
  const stateCode = data.principalSubdivisionCode?.replace(/^US-/, "")
  if (!stateCode || !/^[A-Z]{2}$/.test(stateCode)) throw new Error("location-unavailable")
  return { stateCode, place: data.locality || data.city || data.principalSubdivision }
}
