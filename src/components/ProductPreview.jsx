import { useEffect, useMemo, useState, memo } from "react"
import { availableProviderCategories, directionsUrl, isLikelyBookingUrl, loadPublishedProviders, providerCategory, providerMatches, safeExternalUrl, splitProvidersForState, stateFromCoordinates, stateFromZip } from "../providerDiscovery"

const LOCATION_KEY = "konekt-search-state-v1"
const LOCATION_EVENT = "konekt-location-change"
const categoryLabels = {
  all: { en: "All services", ht: "Tout sèvis" },
  healthcare: { en: "Healthcare", ht: "Swen sante" },
  legal: { en: "Legal", ht: "Lalwa" },
  financial: { en: "Tax & financial", ht: "Taks ak finans" },
  translation: { en: "Translation", ht: "Tradiksyon" },
  community: { en: "Community", ht: "Kominote" },
}

const serviceLabelsHT = {
  "family medicine": "Medsin fanmi",
  pediatrics: "Pedyatri",
  interpretation: "Entèpretasyon",
  translation: "Tradiksyon",
  "tax preparation": "Preparasyon taks",
  bookkeeping: "Kontablite",
  "legal services": "Sèvis legal",
  "immigration law": "Lalwa imigrasyon",
  doula: "Doula",
  "doula services": "Sèvis doula",
  "doula care": "Swen doula",
  "maternal care": "Swen matènite",
  "birth doula": "Doula pou akouchman",
  "postpartum doula": "Doula apre akouchman",
}


// ── Weekly Hours Calendar ──────────────────────────────────────────────────
const DAY_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DAY_LABELS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DAY_LABELS_HT = ["Lun", "Mar", "Mèk", "Jeu", "Ven", "Sam", "Dim"]

const DAY_ALIAS_MAP = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
  friday: "Fri", saturday: "Sat", sunday: "Sun",
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun"
}

function parseWeeklyHours(weekly_hours) {
  if (!weekly_hours || typeof weekly_hours !== "object") return null
  const entries = {}
  for (const [rawKey, val] of Object.entries(weekly_hours)) {
    if (!val) continue
    const normKey = DAY_ALIAS_MAP[rawKey.toLowerCase().trim()]
    if (!normKey) continue
    if (typeof val === "object") {
      const open = val.open || val.opens || val.start || null
      const close = val.close || val.closes || val.end || null
      if (open && close) entries[normKey] = { open, close }
      else if (val.closed === true || val === "closed") entries[normKey] = null
    } else if (typeof val === "string") {
      const str = val.trim()
      if (str.toLowerCase() === "closed" || !str) {
        entries[normKey] = null
      } else {
        const parts = str.split(/[-–—]/).map(s => s.trim())
        if (parts.length === 2) {
          entries[normKey] = { open: parts[0], close: parts[1] }
        }
      }
    }
  }
  return Object.keys(entries).length ? entries : null
}

function parseTimeToMinutes(t) {
  if (!t) return null
  const match = String(t).match(/(\d+):?(\d+)?\s*(AM|PM|am|pm)?/i)
  if (!match) return null
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2] || "0", 10)
  const ampm = match[3] ? match[3].toUpperCase() : null
  if (ampm === "PM" && hours < 12) hours += 12
  if (ampm === "AM" && hours === 12) hours = 0
  return hours * 60 + minutes
}

function formatTime(t) {
  if (!t) return ""
  const str = String(t).trim()
  if (/AM|PM/i.test(str)) return str
  const parts = str.split(":")
  if (parts.length < 2) return str
  const h = parseInt(parts[0], 10)
  const m = parts[1].slice(0, 2)
  const suffix = h < 12 ? "am" : "pm"
  const hour = h % 12 || 12
  return m === "00" ? `${hour}${suffix}` : `${hour}:${m}${suffix}`
}

function getTodayKey() {
  return DAY_KEYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
}

function getTodayStatus(todayEntry, language) {
  const isHT = language === "ht"
  if (!todayEntry) return { isOpen: false, text: isHT ? "Fèmen jodiya" : "Closed today" }

  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  const openMins = parseTimeToMinutes(todayEntry.open)
  const closeMins = parseTimeToMinutes(todayEntry.close)

  if (openMins === null || closeMins === null) {
    return {
      isOpen: true,
      text: isHT
        ? `Louvri jodiya · ${formatTime(todayEntry.open)}–${formatTime(todayEntry.close)}`
        : `Open today · ${formatTime(todayEntry.open)}–${formatTime(todayEntry.close)}`
    }
  }

  if (nowMins >= openMins && nowMins < closeMins) {
    const minsLeft = closeMins - nowMins
    if (minsLeft <= 60) {
      return {
        isOpen: true,
        isClosingSoon: true,
        text: isHT
          ? `Ap fèmen bento (${minsLeft} min) · Lè fèmen: ${formatTime(todayEntry.close)}`
          : `Closing soon (${minsLeft}m left) · Closes at ${formatTime(todayEntry.close)}`
      }
    }
    return {
      isOpen: true,
      text: isHT
        ? `Louvri kounye a · Ap fèmen nan ${formatTime(todayEntry.close)}`
        : `Open now · Closes at ${formatTime(todayEntry.close)}`
    }
  }

  if (nowMins < openMins) {
    return {
      isOpen: false,
      text: isHT
        ? `Fèmen kounye a · Ap louvri nan ${formatTime(todayEntry.open)}`
        : `Closed now · Opens at ${formatTime(todayEntry.open)}`
    }
  }

  return {
    isOpen: false,
    text: isHT ? "Fèmen pou jodiya" : "Closed for the day"
  }
}

const WeeklyHours = memo(function WeeklyHours({ weekly_hours, hours_status_text, language }) {
  const parsed = parseWeeklyHours(weekly_hours)
  const isHT = language === "ht"
  const todayKey = getTodayKey()

  if (!parsed) {
    if (!hours_status_text) return null
    return (
      <div className="hours-status-text">
        <span className="hours-status-label">{isHT ? "Lè" : "Hours"}</span>
        <span>{hours_status_text}</span>
      </div>
    )
  }

  const todayEntry = parsed[todayKey]
  const todayStatus = getTodayStatus(todayEntry, language)

  return (
    <div className="weekly-hours">
      <div className="weekly-hours__header">
        <span className="weekly-hours__label">{isHT ? "Lè travay" : "Office hours"}</span>
        <span className={`weekly-hours__today-pill ${todayStatus.isOpen ? (todayStatus.isClosingSoon ? "is-warning" : "is-open") : "is-closed"}`}>
          {todayStatus.text}
        </span>
      </div>
      <div className="weekly-hours__grid">
        {DAY_KEYS.map((key, i) => {
          const label = isHT ? DAY_LABELS_HT[i] : DAY_LABELS_EN[i]
          const entry = parsed[key]
          const isToday = key === todayKey
          return (
            <div key={key} className={`weekly-hours__row${isToday ? " is-today" : ""}${!entry ? " is-closed" : ""}`}>
              <span className="weekly-hours__day">{label}</span>
              <span className="weekly-hours__bar-wrap">
                {entry ? <span className="weekly-hours__bar" /> : null}
              </span>
              <span className="weekly-hours__time">
                {entry
                  ? `${formatTime(entry.open)}–${formatTime(entry.close)}`
                  : (isHT ? "Fèmen" : "Closed")}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
// ──────────────────────────────────────────────────────────────────────────

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

function formatLabel(value) {
  if (!value) return value
  return String(value).replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function languageAccess(provider, language) {
  const type = provider.language_access_type?.toLowerCase()
  if (type?.includes("provider")) return language === "ht" ? "Founisè a pale Kreyòl" : "Provider speaks Haitian Creole"
  if (type?.includes("staff")) return language === "ht" ? "Yon anplwaye pale Kreyòl" : "Staff member speaks Haitian Creole"
  if (type?.includes("interpreter")) return language === "ht" ? "Gen yon entèprèt" : "Interpreter available"
  return language === "ht" ? "Mande sou sèvis an Kreyòl" : "Ask about Haitian Creole support"
}

function verifiedLanguageAccess(provider, language) {
  const status = provider.language_verification_status
  if (!["VERIFIED_PROVIDER_SPEAKS", "VERIFIED_STAFF_SPEAKS", "INTERPRETER_CONFIRMED"].includes(status)) return null
  return language === "ht" ? "KONEKT tcheke èd an Kreyòl la" : "Haitian Creole access verified"
}

function localizedLocation(value, language) {
  if (!value || language !== "ht") return value
  return value
    .replace(/^Telehealth service in /i, "Sèvis telesante nan ")
    .replace(/^Nationwide remote and scheduled on-site service$/i, "Sèvis adistans nan tout peyi a ak sèvis sou plas sou randevou")
    .replace(/^Nationwide remote and on-site service$/i, "Sèvis adistans nan tout peyi a ak sèvis sou plas")
    .replace(/^Nationwide remote service$/i, "Sèvis adistans nan tout peyi a")
}

function providerDetails(provider, language) {
  const isHT = language === "ht"
  const items = []
  // hours rendered by WeeklyHours component
  if (provider.service_area) items.push({ label: isHT ? "Zòn sèvis" : "Service area", value: localizedLocation(provider.service_area, language) })
  if (provider.accepting_new_patients) items.push({ label: isHT ? "Disponiblite" : "Availability", value: isHT ? "Aksepte nouvo kliyan oswa pasyan" : "Accepting new clients or patients" })
  if (provider.telehealth_available) items.push({ label: isHT ? "Opsyon" : "Options", value: isHT ? "Sèvis adistans disponib" : "Remote service available" })
  const insurance = Array.isArray(provider.insurance_accepted) ? provider.insurance_accepted.filter(Boolean).map(formatLabel) : []
  if (provider.medicaid_accepted) insurance.unshift("Medicaid")
  if (provider.medicare_accepted) insurance.unshift("Medicare")
  if (insurance.length) items.push({ label: isHT ? "Asirans" : "Insurance", value: [...new Set(insurance)].join(", ") })
  return items
}

function ProviderCard({ provider, language }) {
  const isHT = language === "ht"
  const name = provider.business_name || provider.name
  const category = providerCategory(provider)
  const specialty = isHT ? (provider.specialty_ht || categoryLabels[category]?.ht || provider.category) : provider.specialty
  const description = isHT ? provider.description_ht : provider.description
  const website = safeExternalUrl(provider.website)
  const appointment = safeExternalUrl(provider.appointment_url)
  const booking = appointment && appointment !== website && isLikelyBookingUrl(appointment) ? appointment : null
  const primaryWebsite = website || (!booking ? appointment : null)
  const directions = directionsUrl(provider)
  const phone = provider.phone?.replace(/[^\d+]/g, "")
  const services = Array.isArray(provider.services) ? provider.services.filter(Boolean).map((service) => { const localized = isHT ? serviceLabelsHT[service.toLowerCase()] : null; return localized || formatLabel(service); }) : []
  const details = providerDetails(provider, language)
  const verifiedLanguage = verifiedLanguageAccess(provider, language)
  return (
    <article className="preview-result">
      <div className="preview-result__summary">
        <div className="preview-result__copy">
        <h3>{name}</h3>
        <p>{[formatLabel(specialty || provider.category), localizedLocation(provider.address, language)].filter(Boolean).join(" · ")}</p>
        <span className="preview-language-badge">{languageAccess(provider, language)}</span>
          {verifiedLanguage && <span className="preview-verified-badge">{verifiedLanguage}</span>}
        </div>
        <div className="preview-result__actions">
          {phone && <a href={`tel:${phone}`}>{isHT ? "Rele" : "Call"}</a>}
          {booking && <a href={booking} target="_blank" rel="noreferrer">{isHT ? "Pran randevou" : "Book"}</a>}
          {primaryWebsite && <a href={primaryWebsite} target="_blank" rel="noreferrer">{isHT ? "Sit entènèt" : "Website"}</a>}
        </div>
      </div>
      <details className="preview-result__details">
        <summary>{isHT ? "Gade detay" : "View details"}</summary>
        <div className="preview-result__details-body">
          {description && <p>{description}</p>}
          {!!services.length && <div><strong>{isHT ? "Sèvis" : "Services"}</strong><p>{services.join(", ")}</p></div>}
          <WeeklyHours weekly_hours={provider.weekly_hours} hours_status_text={provider.hours_status_text} language={language} />
          {details.map((item) => <div key={item.label}><strong>{item.label}</strong><p>{item.value}</p></div>)}
          <div className="preview-result__secondary-actions">
            {directions && <a href={directions} target="_blank" rel="noreferrer">{isHT ? "Jwenn direksyon" : "Directions"}</a>}
            {booking && primaryWebsite && <a href={primaryWebsite} target="_blank" rel="noreferrer">{isHT ? "Sit entènèt" : "Website"}</a>}
          </div>
          {!description && !services.length && !details.length && <p>{isHT ? "Kontakte founisè a pou konfime detay sèvis la." : "Contact the provider to confirm service details."}</p>}
        </div>
      </details>
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
    Promise.resolve().then(loadPublishedProviders).then((data) => {
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

  const categoryOptions = useMemo(() => ["all", ...availableProviderCategories(providers)].map((id) => ({ id, ...categoryLabels[id] })), [providers])

  const stateName = location?.stateCode || ""
  const isHT = language === "ht"
  return (
    <div className="product-preview" id="provider-search" aria-label={isHT ? "Rechèch founisè KONEKT" : "KONEKT provider search"}>
      <div className="product-preview__topline"><span>{isHT ? "Anyè KONEKT an dirèk" : "Live KONEKT directory"}</span><span>{location ? `${location.place ? `${location.place}, ` : ""}${location.stateCode}` : (isHT ? "Chwazi kote ou" : "Choose your location")}</span></div>
      <div className="product-preview__brand"><img src="/konekt-favicon.png" alt="" /> KONEKT</div>
      {!location ? (
        <div className="preview-location">
          <h3>{isHT ? "Jwenn founisè nan eta ou" : "Find providers in your state"}</h3>
          <p>{isHT ? "Antre kòd postal ou oswa chwazi itilize kote ou ye a. Ou pa bezwen yon kont." : "Enter your ZIP code or choose to use your location. No account is required."}</p>
          <form onSubmit={submitZip} className="preview-location__form">
            <label><span className="sr-only">{isHT ? "Kòd postal" : "ZIP code"}</span><input inputMode="numeric" autoComplete="postal-code" maxLength="5" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, ""))} placeholder={isHT ? "Kòd postal" : "ZIP code"} /></label>
            <button type="submit" disabled={locationStatus === "loading"}>{isHT ? "Chèche" : "Search"}</button>
          </form>
          <button className="preview-location__gps" type="button" onClick={useMyLocation} disabled={locationStatus === "loading"}><img src="/icons/map-pin.svg" alt="" /> {isHT ? "Itilize kote mwen ye a" : "Use my location"}</button>
          {locationStatus === "loading" && <p className="preview-status">{isHT ? "N ap jwenn eta ou..." : "Finding your state..."}</p>}
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
            {status === "ready" && <><div className="preview-results__heading"><strong>{isHT ? "Nan eta ou" : "In your state"}</strong><span>{results.local.length}</span></div>{results.local.length ? results.local.map((provider) => <ProviderCard key={provider.id} provider={provider} language={language} />) : <p className="preview-empty">{isHT ? "Nou poko gen yon founisè ki mache ak rechèch sa a nan eta ou. Eseye yon lòt sèvis." : "We do not have a matching provider in your state yet. Try another service."}</p>}{!!results.nationwide.length && <section className="preview-nationwide" aria-label={isHT ? "Sèvis adistans nan tout peyi a" : "Nationwide remote services"}><div className="preview-results__heading"><strong>{isHT ? "Sèvis adistans nan tout peyi a" : "Nationwide remote services"}</strong><span>{results.nationwide.length}</span></div>{results.nationwide.map((provider) => <ProviderCard key={provider.id} provider={provider} language={language} />)}</section>}</>}
          </div>
          <p className="preview-disclaimer">{isHT ? "Konfime detay, disponiblite, ak sèvis an Kreyòl dirèkteman ak founisè a." : "Confirm details, availability, and Haitian Creole support directly with the provider."}</p>
        </>
      )}
    </div>
  )
}
