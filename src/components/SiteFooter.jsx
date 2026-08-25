import BrandMark from "./BrandMark"
import LanguageSwitch from "./LanguageSwitch"
import { SITE, supportMailto } from "../siteConfig"

export default function SiteFooter({ language, onLanguageChange }) {
  const isHT = language === "ht"
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <BrandMark compact />
          <p>{isHT ? "KONEKT ede kominote ayisyen ak moun ki pale Kreyòl jwenn sèvis ak bon enfòmasyon." : "KONEKT helps Haitian and Haitian Creole-speaking communities find services with clearer information."}</p>
        </div>
        <div>
          <h2>{isHT ? "Eksplore" : "Explore"}</h2>
          <a href="/#experience">{isHT ? "Chèche sèvis" : "Explore services"}</a>
          <a href="/#language-access">{isHT ? "Aksè nan lang" : "Language access"}</a>
          <a href="/discover-businesses">{isHT ? "Kategori sèvis" : "Service categories"}</a>
        </div>
        <div>
          <h2>{isHT ? "Pou founisè" : "For providers"}</h2>
          <a href={SITE.providerPortalURL}>{isHT ? "Ajoute oswa reklame pwofil" : "Add or claim a profile"}</a>
          <a href="/community-reviews">{isHT ? "Kijan revizyon mache" : "How review works"}</a>
          <a href="/help-center">{isHT ? "Sant èd" : "Help center"}</a>
        </div>
        <div>
          <h2>{isHT ? "Sipò" : "Support"}</h2>
          <a href={supportMailto()}>{SITE.supportEmail}</a>
          <a href="/privacy-policy">{isHT ? "Konfidansyalite" : "Privacy"}</a>
          <a href="/terms">{isHT ? "Kondisyon sèvis" : "Terms"}</a>
          <a href="/age-rating">{isHT ? "Klasifikasyon laj" : "Age rating"}</a>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <p>© 2026 KONEKT. {isHT ? "Fèt pou kominote ayisyen an." : "Built for the Haitian community."}</p>
        <LanguageSwitch language={language} onChange={onLanguageChange} inverse />
      </div>
    </footer>
  )
}
