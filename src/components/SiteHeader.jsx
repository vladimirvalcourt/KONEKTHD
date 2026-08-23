import { useEffect, useState } from "react"
import BrandMark from "./BrandMark"
import LanguageSwitch from "./LanguageSwitch"

export default function SiteHeader({ language, onLanguageChange, labels, isLanding }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <BrandMark />
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-navigation">
          {open ? labels.close : labels.menu}
        </button>
        <div className={`site-header__panel${open ? " is-open" : ""}`} id="site-navigation">
          <nav aria-label="Primary navigation">
            {isLanding ? (
              <>
                <a href="#experience">{labels.experience}</a>
                <a href="#language-access">{labels.language}</a>
                <a href="#providers">{labels.providers}</a>
                <a href="/our-story">{labels.about}</a>
              </>
            ) : (
              <>
                <a href="/#experience">{labels.experience}</a>
                <a href="/#language-access">{labels.language}</a>
                <a href="/list-your-business">{labels.providers}</a>
                <a href="/our-story">{labels.about}</a>
              </>
            )}
          </nav>
          <LanguageSwitch language={language} onChange={onLanguageChange} inverse />
        </div>
      </div>
    </header>
  )
}
