import { useEffect, useMemo, useState } from "react"
import { loadPublishedProviders, providerMatches, safeExternalUrl, splitProvidersForState, stateFromCoordinates, stateFromZip } from "../providerDiscovery"

const LOCATION_KEY = "konekt-search-state-v1"
const LOCATION_EVENT = "konekt-location-change"
const categoryOptions = [
  { id: "all", en: "All services", ht: "Tout sèvis" },
  { id: "healthcare", en: "Healthcare", ht: "Swen sante" },
  { id: "legal", en: "Legal", ht: "Lalwa" },
  { id: "financial", en: "Financial", ht: "Finans" },
  { id: "community", en: "Community", ht: "Kominote" },
]

function getSavedLocation() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(LOCATION_KEY))
    return /^[A-Z]{2}$/.test(saved?.stateCode) ? saved : null
  } catch {
    return null
  }
}

function getErrorCopy(error, language) {
  const messages = {
    "invalid-zip": { en: "Enter a valid 5-digit U.S. ZIP code.", ht: "Antre yon kòd postal Etazini ki gen 5 chif." },
    "permission-denied": { en: "Location access was not allowed. Enter your ZIP code instead.", ht: "Ou pa bay aksè ak kote ou ye a. Antre kòd postal ou pito." },
    "outside-us": { en: "Public provider search currently covers U.S. locations.", ht: "Rechèch founisè piblik la kouvri kote Ozetazini kounye a." },
    "provider-directory-not-configured": { en: "Provider search is temporarily unavailable.", ht: "Rechèch founisè a pa disponib pou kounye a." },
    default: { en: "We could not load provider results. Please try again.", ht: "Nou pa t kapab chaje rezilta yo. Tanpri eseye ankò." },
  }
  return (messages[error?.message] || messages.default)[language]
}

function languageAccess(provider, language) {
  const type = provider.language_access_type?.toLowerCase()
  if (type?.includes("provider")) return language === "ht" ? "Founisè a pale Kreyòl" : "Provider speaks Kreyòl"
  if (type?.includes("staff")) return language === "ht" ? "Yon anplwaye pale Kreyòl" : "Staff member speaks Kreyòl"
  if (type?.includes("interpreter")) return language === "ht" ? "Gen yon entèprèt" : "Interpreter available"
  return language === "ht" ? "Mande sou sèvis an Kreyòl" : "Ask about Kreyòl service"
}

function ProviderCard({ provider, language }) {
  const name = provider.business_name || provider.name
  const specialty = language === "ht" ? (provider.specialty_ht || provider.specialty) : provider.specialty
  const website = safeExternalUrl(provider.website)
  const appointment = safeExternalUrl(provider.appointment_url)
  const phone = provider.phone?.replace(/[^\d+]/g, "")
  return (
    <article className="preview-result">
      <div className="preview-result__copy">
        <h3>{name}</h3>
        <p>{[specialty || provider.category, provider.address].filter(Boolean).join(" · ")}</p>
        <span className="preview-language-badge">{languageAccess(provider, language)}</span>
      </div>
      <div className="preview-result__actions">
        {phone && <a href={`tel:${phone}`}>{language === "ht" ? "Rele" : "Call"}</a>}
        {appointment && <a href={appointment} target="_blank" rel="noreferrer">{language === "ht" ? "Pran randevou" : "Book"}</a>}
        {!appointment && website && <a href={website} target="_blank" rel="noreferrer">{language === "ht" ? "Sit entènèt" : "Website"}</a>}
      </div>
    </article>
  )
}

export default function ProductPreview({ language }) {
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [zip, setZip] = useState("")
  const [location, setLocation] = useState(getSavedLocation)
  const [providers, setProviders] = useState([])
  const [status, setStatus] = useState("loading")
  const [locationStatus, setLocationStatus] = useState("idle")
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    loadPublishedProviders().then((data) => {
      if (active) { setProviders(data); setStatus("ready") }
    }).catch((requestError) => {
      if (active) { setError(requestError); setStatus("error") }
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    const syncLocation = (event) => setLocation(event.detail)
    window.addEventListener(LOCATION_EVENT, syncLocation)
    return () => window.removeEventListener(LOCATION_EVENT, syncLocation)
  }, [])

  const saveLocation = (nextLocation) => {
    setLocation(nextLocation)
    window.localStorage.setItem(LOCATION_KEY, JSON.stringify(nextLocation))
    window.dispatchEvent(new CustomEvent(LOCATION_EVENT, { detail: nextLocation }))
  }

  const clearLocation = () => {
    setLocation(null)
    window.localStorage.removeItem(LOCATION_KEY)
    window.dispatchEvent(new CustomEvent(LOCATION_EVENT, { detail: null }))
  }

  const submitZip = async (event) => {
    event.preventDefault()
    setLocationStatus("loading"); setError(null)
    try { saveLocation(await stateFromZip(zip)); setLocationStatus("idle") }
    catch (locationError) { setError(locationError); setLocationStatus("error") }
  }

  const useMyLocation = () => {
    setLocationStatus("loading"); setError(null)
    if (!navigator.geolocation) { setError(new Error("location-unavailable")); setLocationStatus("error"); return }
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try { saveLocation(await stateFromCoordinates(coords.latitude, coords.longitude)); setLocationStatus("idle") }
      catch (locationError) { setError(locationError); setLocationStatus("error") }
    }, (geolocationError) => {
      setError(new Error(geolocationError.code === 1 ? "permission-denied" : "location-unavailable")); setLocationStatus("error")
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 })
  }

  const results = useMemo(() => {
    if (!location) return { local: [], nationwide: [] }
    const split = splitProvidersForState(providers, location.stateCode)
    const filters = { category, query }
    return { local: split.local.filter((provider) => providerMatches(provider, filters)), nationwide: split.nationwide.filter((provider) => providerMatches(provider, filters)) }
  }, [category, location, providers, query])

  const stateName = location?.stateCode || ""
  const isHT = language === "ht"
  return (
    <div className="product-preview" aria-label={isHT ? "Rechèch founisè KONEKT" : "KONEKT provider search"}>
      <div className="product-preview__topline"><span>{isHT ? "Anyè KONEKT an dirèk" : "Live KONEKT directory"}</span><span>{location ? `${location.place ? `${location.place}, ` : ""}${location.stateCode}` : (isHT ? "Chwazi kote ou" : "Choose your location")}</span></div>
      <div className="product-preview__brand"><img src="/konekt-favicon.png" alt="" /> KONEKT</div>
      {!location ? (
        <div className="preview-location">
          <h3>{isHT ? "Jwenn founisè nan zòn ou" : "Find providers in your area"}</h3>
          <p>{isHT ? "Antre kòd postal ou oswa chwazi itilize kote ou ye a. Ou pa bezwen yon kont." : "Enter your ZIP code or choose to use your location. No account is required."}</p>
          <form onSubmit={submitZip} className="preview-location__form">
            <label><span className="sr-only">{isHT ? "Kòd postal" : "ZIP code"}</span><input inputMode="numeric" autoComplete="postal-code" maxLength="5" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, ""))} placeholder={isHT ? "Kòd postal" : "ZIP code"} /></label>
            <button type="submit" disabled={locationStatus === "loading"}>{isHT ? "Chèche" : "Search"}</button>
          </form>
          <button className="preview-location__gps" type="button" onClick={useMyLocation} disabled={locationStatus === "loading"}><img src="/icons/map-pin.svg" alt="" /> {isHT ? "Itilize kote mwen ye a" : "Use my location"}</button>
          {locationStatus === "loading" && <p className="preview-status">{isHT ? "N ap jwenn zòn ou..." : "Finding your area..."}</p>}
          {error && <p className="preview-error" role="alert">{getErrorCopy(error, language)}</p>}
        </div>
      ) : (
        <>
          <div className="preview-location-summary"><span>{isHT ? `Rezilta pou ${stateName}` : `Results for ${stateName}`}</span><button type="button" onClick={clearLocation}>{isHT ? "Chanje kote" : "Change location"}</button></div>
          <label className="preview-search"><span className="sr-only">{isHT ? "Chèche sèvis" : "Search services"}</span><img src="/icons/magnifying-glass.svg" alt="" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isHT ? "Ki sèvis ou bezwen?" : "What service do you need?"} /></label>
          <div className="preview-categories" role="group" aria-label={isHT ? "Kategori sèvis" : "Service categories"}>{categoryOptions.map((option) => <button key={option.id} type="button" className={category === option.id ? "is-active" : ""} onClick={() => setCategory(option.id)} aria-pressed={category === option.id}>{option[language]}</button>)}</div>
          <div className="preview-results" aria-live="polite">
            {status === "loading" && <p className="preview-empty">{isHT ? "N ap chaje founisè yo..." : "Loading providers..."}</p>}
            {status === "error" && <p className="preview-error" role="alert">{getErrorCopy(error, language)}</p>}
            {status === "ready" && <><div className="preview-results__heading"><strong>{isHT ? "Nan zòn ou" : "In your area"}</strong><span>{results.local.length}</span></div>{results.local.length ? results.local.map((provider) => <ProviderCard key={provider.id} provider={provider} language={language} />) : <p className="preview-empty">{isHT ? "Nou poko gen yon founisè ki mache ak rechèch sa a nan eta ou. Eseye yon lòt sèvis." : "We do not have a matching provider in your state yet. Try another service."}</p>}{!!results.nationwide.length && <section className="preview-nationwide" aria-label={isHT ? "Sèvis adistans nan tout peyi a" : "Nationwide remote services"}><div className="preview-results__heading"><strong>{isHT ? "Sèvis adistans nan tout peyi a" : "Nationwide remote services"}</strong><span>{results.nationwide.length}</span></div>{results.nationwide.map((provider) => <ProviderCard key={provider.id} provider={provider} language={language} />)}</section>}</>}
          </div>
          <p className="preview-disclaimer">{isHT ? "Konfime detay, disponiblite, ak sèvis an Kreyòl dirèkteman ak founisè a." : "Confirm details, availability, and Kreyòl access directly with the provider."}</p>
        </>
      )}
    </div>
  )
}
