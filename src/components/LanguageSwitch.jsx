export default function LanguageSwitch({ language, onChange, inverse = false }) {
  return (
    <div className={`language-switch${inverse ? " language-switch--inverse" : ""}`} role="group" aria-label="Choose language">
      <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => onChange("en")} aria-pressed={language === "en"}>English</button>
      <button type="button" className={language === "ht" ? "is-active" : ""} onClick={() => onChange("ht")} aria-pressed={language === "ht"}>Kreyòl</button>
    </div>
  )
}
