export default function BrandMark({ compact = false }) {
  return (
    <a className={`brand-mark${compact ? " brand-mark--compact" : ""}`} href="/" aria-label="KONEKT home">
      <img src="/konekt-favicon.png" alt="" width="48" height="48" />
      <span>KON<strong>EKT</strong></span>
    </a>
  )
}
