import { useMemo, useState } from "react"

const categoryOptions = [
  { id: "all", en: "All services", ht: "Tout sèvis" },
  { id: "healthcare", en: "Healthcare", ht: "Swen sante" },
  { id: "legal", en: "Legal", ht: "Lalwa" },
  { id: "financial", en: "Financial", ht: "Finans" },
]

const providers = [
  {
    category: "healthcare",
    name: { en: "Example family clinic", ht: "Egzanp klinik fanmi" },
    detail: { en: "Primary care", ht: "Swen prensipal" },
    location: "Miami, FL",
    access: { en: "Direct Kreyòl", ht: "Kreyòl dirèk" },
  },
  {
    category: "legal",
    name: { en: "Example legal office", ht: "Egzanp biwo legal" },
    detail: { en: "Immigration support", ht: "Sipò imigrasyon" },
    location: "North Miami, FL",
    access: { en: "Kreyòl-speaking staff", ht: "Anplwaye pale Kreyòl" },
  },
  {
    category: "financial",
    name: { en: "Example tax service", ht: "Egzanp sèvis taks" },
    detail: { en: "Tax preparation", ht: "Preparasyon taks" },
    location: "Miami, FL",
    access: { en: "Interpreter available", ht: "Entèprèt disponib" },
  },
]

export default function ProductPreview({ language }) {
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const filteredProviders = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return providers.filter((provider) => {
      const inCategory = category === "all" || provider.category === category
      const inQuery = !normalized || `${provider.name[language]} ${provider.detail[language]}`.toLowerCase().includes(normalized)
      return inCategory && inQuery
    })
  }, [category, language, query])

  return (
    <div className="product-preview" aria-label={language === "ht" ? "Apèsi sou eksperyans KONEKT" : "KONEKT experience preview"}>
      <div className="product-preview__topline">
        <span>{language === "ht" ? "Apèsi sou pwodwi a" : "Product preview"}</span>
        <span>{language === "ht" ? "Florid" : "Florida"}</span>
      </div>
      <div className="product-preview__brand"><img src="/konekt-favicon.png" alt="" /> KONEKT</div>
      <label className="preview-search">
        <span className="sr-only">{language === "ht" ? "Chèche sèvis" : "Search services"}</span>
        <img src="/icons/magnifying-glass.svg" alt="" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "ht" ? "Ki sèvis ou bezwen?" : "What service do you need?"} />
      </label>
      <div className="preview-categories" role="group" aria-label={language === "ht" ? "Kategori sèvis" : "Service categories"}>
        {categoryOptions.map((option) => (
          <button key={option.id} type="button" className={category === option.id ? "is-active" : ""} onClick={() => setCategory(option.id)} aria-pressed={category === option.id}>
            {option[language]}
          </button>
        ))}
      </div>
      <div className="preview-results" aria-live="polite">
        {filteredProviders.length ? filteredProviders.map((provider) => (
          <article className="preview-result" key={provider.category}>
            <div>
              <h3>{provider.name[language]}</h3>
              <p>{provider.detail[language]} · {provider.location}</p>
            </div>
            <span>{provider.access[language]}</span>
          </article>
        )) : (
          <p className="preview-empty">{language === "ht" ? "Pa gen egzanp ki matche ak rechèch sa a." : "No preview results match that search."}</p>
        )}
      </div>
      <p className="preview-disclaimer">{language === "ht" ? "Sa yo se egzanp pou montre kijan koòdone a mache." : "Illustrative content showing how the interface works."}</p>
    </div>
  )
}
