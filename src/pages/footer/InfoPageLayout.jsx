export default function InfoPageLayout({ page, viewportWidth, theme, breakpoints, getSectionPadding }) {
  const sectionPadding = getSectionPadding(viewportWidth);
  return (
    <main style={{ minHeight:"100vh", background:theme.black }}>
      <section style={{ padding:sectionPadding, borderBottom:`1px solid ${theme.mutedLow}` }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <a href="/" style={{ display:"inline-flex", alignItems:"center", gap:"10px", marginBottom:"30px",
            textDecoration:"none", color:theme.gold, fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.14em",
            textTransform:"uppercase", cursor:"pointer" }}>
            <span style={{ width:"20px", height:"1px", background:theme.gold, display:"inline-block" }} />
            Back to Home
          </a>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase",
            color:theme.gold, marginBottom:"14px" }}>
            {page.group}
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"clamp(46px, 8vw, 88px)", lineHeight:0.95,
            color:theme.cream, letterSpacing:"-0.02em", marginBottom:"22px" }}>
            {page.title}
          </h1>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"18px", lineHeight:1.8, color:theme.muted, maxWidth:"760px" }}>
            {page.intro}
          </p>
        </div>
      </section>
      <section style={{ padding:getSectionPadding(viewportWidth, { desktop:"100px 60px", xl:"95px 48px", tablet:"85px 36px", mobile:"70px 20px" }) }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", display:"grid", gridTemplateColumns: viewportWidth <= breakpoints.md ? "1fr" : "repeat(3,1fr)", gap:"14px" }}>
          {page.sections.map((sec) => (
            <article key={sec.h} style={{ border:`1px solid ${theme.mutedLow}`, background:"rgba(242,237,228,0.02)", padding:"24px 20px" }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"24px", lineHeight:1.2, color:theme.cream, marginBottom:"10px" }}>
                {sec.h}
              </h2>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.75, color:theme.muted }}>
                {sec.p}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
