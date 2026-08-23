export default function NotFoundPage({ language }) {
  return (
    <main id="main-content" className="not-found shell">
      <p className="eyebrow">404</p>
      <h1>{language === "ht" ? "Nou pa jwenn paj sa a." : "We couldn't find that page."}</h1>
      <p>{language === "ht" ? "Lyen an ka chanje oswa paj la ka pa egziste ankò." : "The link may have changed or the page may no longer exist."}</p>
      <a className="button button--navy" href="/">{language === "ht" ? "Tounen nan akèy" : "Return home"} <img className="button__icon" src="/icons/caret-right.svg" alt="" /></a>
    </main>
  )
}
