import { SITE } from "../siteConfig"

function localized(value, language) {
  return value?.[language] || value?.en || ""
}

export default function InfoPage({ page, language }) {
  return (
    <main id="main-content" className="info-page">
      <section className="info-hero">
        <div className="shell info-hero__inner">
          <p className="eyebrow">{localized(page.eyebrow, language)}</p>
          <h1>{localized(page.title, language)}</h1>
          <p className="info-hero__intro">{localized(page.intro, language)}</p>
        </div>
      </section>
      <div className="shell info-content">
        {page.steps && (
          <ol className="info-steps">
            {page.steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h2>{localized(step.title, language)}</h2>
                <p>{localized(step.body, language)}</p>
              </li>
            ))}
          </ol>
        )}
        {page.sections && (
          <div className="info-sections">
            {page.sections.map((section) => (
              <section key={localized(section.title, "en")}>
                <h2>{localized(section.title, language)}</h2>
                <p>{localized(section.body, language)}</p>
              </section>
            ))}
          </div>
        )}
        {page.platformStatus && (
          <div className="platform-grid">
            <article>
              <p className="eyebrow">iPhone</p>
              <h2>{SITE.appStoreURL ? (language === "ht" ? "Disponib sou App Store" : "Available on the App Store") : (language === "ht" ? "Ap prepare pou lansman" : "Preparing for release")}</h2>
              {SITE.appStoreURL ? <a className="text-link" href={SITE.appStoreURL}>{language === "ht" ? "Louvri App Store" : "Open App Store"}</a> : <p className="platform-status-note">{language === "ht" ? "Lyen ofisyèl la ap parèt isit la apre lansman." : "The official link will appear here after release."}</p>}
            </article>
            <article>
              <p className="eyebrow">Android</p>
              <h2>{SITE.googlePlayURL ? (language === "ht" ? "Disponib sou Google Play" : "Available on Google Play") : (language === "ht" ? "Ap prepare pou lansman" : "Preparing for release")}</h2>
              {SITE.googlePlayURL ? <a className="text-link" href={SITE.googlePlayURL}>{language === "ht" ? "Louvri Google Play" : "Open Google Play"}</a> : <p className="platform-status-note">{language === "ht" ? "Lyen ofisyèl la ap parèt isit la apre lansman." : "The official link will appear here after release."}</p>}
            </article>
          </div>
        )}
        {page.cta && <a className="button button--navy info-cta" href={page.cta.href}>{localized(page.cta.label, language)} <img className="button__icon" src="/icons/caret-right.svg" alt="" /></a>}
      </div>
    </main>
  )
}
