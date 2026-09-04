import { useEffect, useState } from "react"
import { copy } from "./content"
import ProductPreview from "./components/ProductPreview"
import SiteFooter from "./components/SiteFooter"
import SiteHeader from "./components/SiteHeader"
import InfoPage from "./pages/InfoPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProviderPage from "./pages/ProviderPage"
import { pageData } from "./pages/pageData"
import { SITE, supportMailto } from "./siteConfig"

function Icon({ name, className = "" }) {
  return <img className={`icon ${className}`} src={`/icons/${name}.svg`} alt="" />
}

function Arrow() {
  return <Icon name="caret-right" className="button__icon" />
}

function LandingPage({ language }) {
  const text = copy[language]

  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <img src="/images/konekt-community-service.jpg" alt="" />
        </div>
        <div className="shell hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">{text.hero.eyebrow}</p>
            <h1>{text.hero.title}</h1>
            <p className="hero__creole">{text.hero.creoleLine}</p>
            <p className="hero__body">{text.hero.body}</p>
            <div className="button-row">
              <a className="button button--navy" href="#provider-search">{text.hero.primary}<Arrow /></a>
              <a className="button button--outline" href="#providers">{text.hero.secondary}<Arrow /></a>
            </div>
          </div>
          <div className="hero__preview">
            <span>{text.hero.preview}</span>
            <ProductPreview language={language} />
          </div>
        </div>
      </section>

      <section className="trust-band" aria-labelledby="trust-title">
        <div className="shell trust-band__grid">
          <div>
            <p className="eyebrow eyebrow--gold">KONEKT</p>
            <h2 id="trust-title">{text.trust.title}</h2>
            <p>{text.trust.body}</p>
          </div>
          <ul>
            {text.trust.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section--paper" id="language-access" aria-labelledby="access-title">
        <div className="shell section-heading section-heading--split">
          <div>
            <p className="eyebrow">{text.access.eyebrow}</p>
            <h2 id="access-title">{text.access.title}</h2>
          </div>
          <p>{text.access.body}</p>
        </div>
        <div className="shell access-grid">
          {text.access.modes.map((mode) => (
            <article key={mode.title}>
              <Icon name={mode.icon} />
              <h3>{mode.title}</h3>
              <p>{mode.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--cream" id="experience" aria-labelledby="services-title">
        <div className="shell section-heading section-heading--split">
          <div>
            <p className="eyebrow">{text.services.eyebrow}</p>
            <h2 id="services-title">{text.services.title}</h2>
          </div>
          <div>
            <p>{text.services.body}</p>
            <a className="text-link" href="#provider-search">{text.services.explore}<Arrow /></a>
          </div>
        </div>
        <div className="shell service-grid">
          {text.services.categories.map((service) => (
            <article key={service.title}>
              <Icon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
        <div className="shell experience-preview">
          <div className="experience-preview__copy">
            <p className="eyebrow">{language === "ht" ? "Eseye KONEKT" : "Try KONEKT"}</p>
            <h2>{language === "ht" ? "Chèche yon sèvis." : "Search for a service."}</h2>
            <p>{language === "ht" ? "Chwazi yon kategori oswa antre sa ou bezwen an. Chak rezilta montre kiyès ki ka ede w an Kreyòl." : "Choose a category or type what you need. Each result shows who can help you in Haitian Creole."}</p>
          </div>
          <a className="button button--navy experience-preview__action" href="#provider-search">{language === "ht" ? "Ale nan rechèch la" : "Go to provider search"}<Arrow /></a>
        </div>
      </section>

      <section className="provider-section" id="providers" aria-labelledby="provider-title">
        <img className="provider-section__image" src="/images/konekt-provider.jpg" alt={language === "ht" ? "Yon founisè sèvis ap travay sou pwofil li" : "A service provider working on her profile"} />
        <div className="provider-section__overlay">
          <div className="provider-section__copy">
            <p className="eyebrow eyebrow--gold">{text.provider.eyebrow}</p>
            <h2 id="provider-title">{text.provider.title}</h2>
            <p>{text.provider.body}</p>
            <div className="button-row">
              <a className="button button--gold" href={SITE.providerPortalURL}>{language === "ht" ? "Louvri kont founisè a" : "Open provider account"}<Arrow /></a>
              <a className="button button--ghost" href="/community-reviews">{text.provider.secondary}<Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="shell closing-section__inner">
          <p className="eyebrow">{text.close.eyebrow}</p>
          <h2 id="closing-title">{text.close.title}</h2>
          <p>{text.close.body}</p>
          <div className="button-row button-row--center">
            <a className="button button--navy" href="#experience">{text.close.primary}<Arrow /></a>
            <a className="button button--outline" href={supportMailto()}>{text.close.secondary}<Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  )
}

function normalizePath(pathname) {
  if (pathname === "/index.html") return "/"
  return pathname.replace(/\/+$/, "") || "/"
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    const saved = window.localStorage.getItem("konekt-language")
    return saved === "ht" ? "ht" : "en"
  })
  const pathname = normalizePath(window.location.pathname)
  const isLanding = pathname === "/"
  const providerMatch = pathname.match(/^\/provider\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i)
  const providerID = providerMatch?.[1]
  const activePage = pageData[pathname]
  const labels = copy[language].nav

  useEffect(() => {
    window.localStorage.setItem("konekt-language", language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    if (isLanding) {
      document.title = language === "ht" ? "KONEKT — Jwenn sèvis ak èd an Kreyòl" : "KONEKT — Find services and Haitian Creole support"
      return
    }
    if (providerID) {
      document.title = language === "ht" ? "Pwofil founisè | KONEKT" : "Provider profile | KONEKT"
      return
    }
    const pageTitle = activePage?.title?.[language] || activePage?.title?.en
    document.title = pageTitle ? `${pageTitle} | KONEKT` : "Page not found | KONEKT"
  }, [activePage, isLanding, language, providerID])

  return (
    <>
      <a className="skip-link" href="#main-content">{copy[language].skip}</a>
      <SiteHeader language={language} onLanguageChange={setLanguage} labels={labels} isLanding={isLanding} />
      {isLanding ? <LandingPage language={language} /> : providerID ? <ProviderPage providerID={providerID} language={language} /> : activePage ? <InfoPage page={activePage} language={language} /> : <NotFoundPage language={language} />}
      <SiteFooter language={language} onLanguageChange={setLanguage} />
    </>
  )
}
