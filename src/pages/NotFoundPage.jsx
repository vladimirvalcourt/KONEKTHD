export default function NotFoundPage({ theme }) {
  return (
    <main style={{ minHeight:"100vh", background:theme.black, display:"grid", placeItems:"center", padding:"40px 20px" }}>
      <div style={{ textAlign:"center", maxWidth:"620px" }}>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:theme.gold, marginBottom:"16px" }}>
          404
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(42px,7vw,72px)", lineHeight:0.96, color:theme.cream, marginBottom:"16px" }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"16px", lineHeight:1.8, color:theme.muted, marginBottom:"28px" }}>
          The page you requested is not available right now.
        </p>
        <a href="/" style={{ display:"inline-block", background:theme.gold, color:theme.black, textDecoration:"none", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"12px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"12px 24px", cursor:"pointer" }}>
          Return Home
        </a>
      </div>
    </main>
  );
}
