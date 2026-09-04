import { useEffect, useState } from "react"
import { ProviderCard } from "../components/ProductPreview"
import { findPublishedProvider, loadPublishedProviders } from "../providerDiscovery"

export default function ProviderPage({ providerID, language }) {
  const [state, setState] = useState({ status: "loading" })
  const isHT = language === "ht"

  useEffect(() => {
    let active = true
    loadPublishedProviders()
      .then((providers) => {
        if (!active) return
        const provider = findPublishedProvider(providers, providerID)
        setState(provider ? { status: "ready", provider } : { status: "not-found" })
      })
      .catch(() => {
        if (active) setState({ status: "error" })
      })
    return () => { active = false }
  }, [providerID])

  useEffect(() => {
    if (state.status === "ready") {
      document.title = `${state.provider.business_name || state.provider.name} | KONEKT`
    }
  }, [state])

  return (
    <main id="main-content" className="provider-page">
      <section className="provider-page__hero">
        <div className="shell provider-page__hero-inner">
          <p className="eyebrow">{isHT ? "Pwofil piblik" : "Public provider profile"}</p>
          <h1>{isHT ? "Jwenn detay sèvis la." : "Get the service details."}</h1>
          <p>{isHT ? "Konfime disponiblite ak founisè a dirèkteman anvan ou ale." : "Confirm availability directly with the provider before you visit."}</p>
        </div>
      </section>
      <div className="shell provider-page__content" aria-live="polite">
        {state.status === "loading" && <p className="provider-page__status">{isHT ? "N ap chaje pwofil la…" : "Loading provider…"}</p>}
        {state.status === "ready" && <ProviderCard provider={state.provider} language={language} expanded />}
        {state.status === "not-found" && (
          <section className="provider-page__message">
            <h2>{isHT ? "Pwofil sa a pa disponib" : "This provider is unavailable"}</h2>
            <p>{isHT ? "Pwofil la ka pa pibliye ankò. Chèche lòt sèvis ki disponib." : "The profile may no longer be published. Search the providers currently available."}</p>
          </section>
        )}
        {state.status === "error" && (
          <section className="provider-page__message">
            <h2>{isHT ? "Nou pa t kapab chaje pwofil la" : "We couldn’t load this provider"}</h2>
            <p>{isHT ? "Tcheke koneksyon ou epi eseye ankò." : "Check your connection and try again."}</p>
            <button className="button button--navy" type="button" onClick={() => window.location.reload()}>{isHT ? "Eseye ankò" : "Try again"}</button>
          </section>
        )}
        <a className="provider-page__back" href="/#provider-search">{isHT ? "Chèche tout founisè" : "Search all providers"}</a>
      </div>
    </main>
  )
}
