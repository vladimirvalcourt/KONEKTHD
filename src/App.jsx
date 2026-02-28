import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import FOOTER_ROUTE_COMPONENTS from "./pages/footer/routes";
import NotFoundPage from "./pages/NotFoundPage";
const HERO_WORDS = ["Discover.", "Connect.", "Belong."];
const Motion = motion;

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  black: "#080808",
  cream: "#F2EDE4",
  gold: "#C8913A",
  goldLight: "#E5BA72",
  goldDim: "rgba(200,145,58,0.15)",
  blue: "#0F2347",
  red: "#B8311F",
  muted: "rgba(242,237,228,0.45)",
  mutedLow: "rgba(242,237,228,0.12)",
};

const BP = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 560,
};

const NAV_LINKS = [
  { label: "Features", sectionId: "features" },
  { label: "How It Works", sectionId: "how-it-works" },
  { label: "Community", sectionId: "community" },
  { label: "App", sectionId: "app" },
];

const STATS_ITEMS = [
  { num: 5000, suffix: "+", label: "Businesses Listed" },
  { num: 32, suffix: "+", label: "States & Cities" },
  { num: 50000, suffix: "+", label: "Community Members" },
  { num: 98, suffix: "%", label: "User Satisfaction" },
];

function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

function scrollToSection(sectionId) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body { background: ${T.black}; color: ${T.cream}; font-family: 'Outfit', sans-serif; overflow-x: hidden; cursor: auto; }
  ::selection { background: ${T.gold}; color: ${T.black}; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: ${T.black}; }
  ::-webkit-scrollbar-thumb { background: ${T.gold}; }
`;

function useViewportWidth() {
  const [width, setWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1440));

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

function getSectionPadding(viewportWidth, options = {}) {
  const {
    desktop = "140px 60px",
    xl = "130px 48px",
    tablet = "110px 36px",
    mobile = "90px 20px",
  } = options;

  if (viewportWidth <= BP.md) return mobile;
  if (viewportWidth <= BP.lg) return tablet;
  if (viewportWidth <= BP.xl) return xl;
  return desktop;
}

// ─── NOISE TEXTURE ────────────────────────────────────────────────────────────
const Noise = () => (
  <div style={{ position:"fixed", inset:0, zIndex:900, pointerEvents:"none", opacity:0.028,
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize:"256px 256px" }} />
);

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <Motion.div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", zIndex:800,
      background:`linear-gradient(90deg, ${T.blue}, ${T.gold}, ${T.red})`,
      scaleX, transformOrigin:"left" }} />
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ viewportWidth }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const navPadX = viewportWidth <= BP.md ? 20 : viewportWidth <= BP.lg ? 36 : viewportWidth <= BP.xl ? 48 : 60;
  const navPadY = scrolled ? 14 : viewportWidth <= BP.md ? 16 : 28;
  const showLinks = viewportWidth > BP.sm;
  const activeLinks = showLinks ? NAV_LINKS : NAV_LINKS.filter((l) => l.label === "App");
  return (
    <Motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ position:"fixed", top:0, left:0, right:0, zIndex:600,
        padding: `${navPadY}px ${navPadX}px`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.mutedLow}` : "none",
        transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      {/* Logo */}
      <button
        type="button"
        onClick={scrollToTop}
        style={{ textDecoration:"none", cursor:"pointer", background:"transparent", border:"none", padding:0 }}
      >
        <div style={{ fontFamily:"'Playfair Display', serif", fontWeight:900, fontSize:"22px",
          letterSpacing:"0.06em", color: T.cream }}>
          KON<span style={{ color: T.gold }}>EKT</span>
        </div>
      </button>
      {/* Desktop links */}
      <div style={{ display:"flex", gap:viewportWidth <= BP.md ? "16px" : "40px", alignItems:"center" }}>
        {activeLinks.map((link, i) => (
          <Motion.button key={link.label} type="button"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            style={{ fontFamily:"'Outfit',sans-serif", fontSize:viewportWidth <= BP.md ? "11px" : "13px", letterSpacing:"0.1em",
              textTransform:"uppercase", color: T.muted, textDecoration:"none", cursor:"pointer",
              background:"transparent", border:"none", padding:0,
              transition:"color 0.3s" }}
            onClick={() => scrollToSection(link.sectionId)}
            onMouseEnter={e => e.target.style.color = T.gold}
            onMouseLeave={e => e.target.style.color = T.muted}>{link.label}</Motion.button>
        ))}
        <Motion.button type="button" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay: 0.8 }}
          onClick={() => scrollToSection("download")}
          style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"12px",
            letterSpacing:"0.14em", textTransform:"uppercase", color: T.black,
            background: T.gold, padding:viewportWidth <= BP.md ? "10px 16px" : "11px 28px", textDecoration:"none", cursor:"pointer",
            border:"none",
            transition:"background 0.3s, transform 0.2s" }}
          onMouseEnter={e => { e.target.style.background = T.goldLight; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.target.style.background = T.gold; e.target.style.transform = "translateY(0)"; }}>
          Get App
        </Motion.button>
      </div>
    </Motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ viewportWidth }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = reduceMotion ? 0 : yRaw;
  const opacity = reduceMotion ? 1 : opacityRaw;

  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % HERO_WORDS.length), 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} style={{ minHeight:"100vh", position:"relative", display:"flex",
      flexDirection:"column", justifyContent:"flex-end",
      padding: viewportWidth <= BP.md ? "0 20px 72px" : viewportWidth <= BP.lg ? "0 36px 80px" : "0 60px 90px",
      overflow:"hidden" }}>
      {/* BG layers */}
      <div style={{ position:"absolute", inset:0, zIndex:0 }}>
        {/* Haitian-flag split */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"50%",
          background: `linear-gradient(180deg, ${T.blue} 0%, rgba(15,35,71,0.6) 100%)` }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%",
          background: `linear-gradient(0deg, rgba(184,49,31,0.35) 0%, transparent 100%)` }} />
        {/* Grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(${T.goldDim} 1px, transparent 1px), linear-gradient(90deg, ${T.goldDim} 1px, transparent 1px)`,
          backgroundSize:"100px 100px" }} />
        {/* Radial glow */}
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)",
          width:"900px", height:"900px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(200,145,58,0.08) 0%, transparent 65%)`,
          animation:"pulse 10s ease-in-out infinite" }} />
      </div>

      <style>{`@keyframes pulse { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.2); } }`}</style>

      <Motion.div style={{ position:"relative", zIndex:2, y, opacity }}>
        {/* Eyebrow */}
        <Motion.div initial={reduceMotion ? { opacity:0 } : { opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.45, delay: reduceMotion ? 0.05 : 0.15 }}
          style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"32px" }}>
          <div style={{ width:"36px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Haitian Business Discovery</span>
        </Motion.div>

        {/* Main headline */}
        <div style={{ overflow:"hidden" }}>
          <Motion.h1 initial={reduceMotion ? { opacity:0 } : { y:"100%" }} animate={reduceMotion ? { opacity:1 } : { y:"0%" }}
            transition={{ duration:reduceMotion ? 0.2 : 0.62, delay:reduceMotion ? 0.1 : 0.28, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
              fontSize:"clamp(68px, 11vw, 160px)", lineHeight:0.88,
              letterSpacing:"-0.02em", color: T.cream, display:"block" }}>
            The Haitian
          </Motion.h1>
        </div>
        <div style={{ overflow:"hidden" }}>
          <Motion.div initial={reduceMotion ? { opacity:0 } : { y:"100%" }} animate={reduceMotion ? { opacity:1 } : { y:"0%" }}
            transition={{ duration:reduceMotion ? 0.2 : 0.62, delay:reduceMotion ? 0.16 : 0.38, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
              fontSize:"clamp(68px, 11vw, 160px)", lineHeight:0.88,
              letterSpacing:"-0.02em", color:"transparent",
              WebkitTextStroke:`1px ${T.cream}`, display:"block" }}>
            Business
          </Motion.div>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:"24px", overflow:"hidden" }}>
          <Motion.div initial={reduceMotion ? { opacity:0 } : { y:"100%" }} animate={reduceMotion ? { opacity:1 } : { y:"0%" }}
            transition={{ duration:reduceMotion ? 0.2 : 0.62, delay:reduceMotion ? 0.22 : 0.48, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
              fontSize:"clamp(68px, 11vw, 160px)", lineHeight:0.88,
              letterSpacing:"-0.02em", color: T.gold, display:"block" }}>
            Network.
          </Motion.div>
        </div>

        {/* Subline + CTAs */}
        <Motion.div initial={reduceMotion ? { opacity:0 } : { opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:reduceMotion ? 0.22 : 0.55, delay:reduceMotion ? 0.28 : 0.62, ease:[0.16,1,0.3,1] }}
          style={{ marginTop:"52px", display:"flex", alignItems:"flex-end",
            justifyContent:"space-between", gap:"40px", flexWrap:"wrap" }}>
          <div style={{ maxWidth:"500px" }}>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"18px", lineHeight:1.75,
              color: T.muted, fontWeight:300, marginBottom:"36px" }}>
              One platform connecting the Haitian diaspora to{" "}
              <span style={{ color: T.cream, fontWeight:500 }}>restaurants, lawyers, doctors,
              creatives, and entrepreneurs</span> — wherever you are in the world.
            </p>
            {/* Animated word */}
            <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
              <div style={{ width:"2px", height:"52px", background:`linear-gradient(${T.gold}, ${T.red})` }} />
              <AnimatePresence mode="wait">
                <Motion.span key={wordIdx}
                  initial={reduceMotion ? { opacity:0 } : { opacity:0, y:16, filter:"blur(8px)" }}
                  animate={reduceMotion ? { opacity:1 } : { opacity:1, y:0, filter:"blur(0px)" }}
                  exit={reduceMotion ? { opacity:0 } : { opacity:0, y:-16, filter:"blur(8px)" }}
                  transition={{ duration:reduceMotion ? 0.18 : 0.28, ease:[0.16,1,0.3,1] }}
                  style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
                    fontSize:"clamp(28px, 3vw, 42px)", color: T.gold }}>
                  {HERO_WORDS[wordIdx]}
                </Motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Store buttons */}
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <StoreBtn store="apple" />
            <StoreBtn store="google" />
          </div>
        </Motion.div>
      </Motion.div>

      {/* Scroll indicator */}
      <Motion.div initial={{ opacity:0 }} animate={{ opacity: viewportWidth <= BP.sm ? 0 : 1 }} transition={{ delay:0.8 }}
        style={{ position:"absolute", bottom:"40px", right:"60px", zIndex:3,
          display: viewportWidth <= BP.sm ? "none" : "flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
        <div style={{ width:"1px", height:"72px", background:`linear-gradient(${T.gold}, transparent)`,
          animation:"scrollLine 2.2s ease-in-out infinite" }} />
        <style>{`@keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }`}</style>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"9px", letterSpacing:"0.22em",
          textTransform:"uppercase", color: T.muted, writingMode:"vertical-rl" }}>Scroll</span>
      </Motion.div>

      {/* Corner stat */}
      <Motion.div initial={{ opacity:0, x:20 }} animate={{ opacity: viewportWidth <= BP.sm ? 0 : 1, x:0 }}
        transition={{ delay:0.72 }}
        style={{ position:"absolute", top:"120px", right:"60px", zIndex:3,
          borderLeft:`1px solid ${T.gold}`, paddingLeft:"20px",
          display: viewportWidth <= BP.sm ? "none" : "block" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"48px",
          lineHeight:1, color: T.cream }}>5K<span style={{ color: T.gold }}>+</span></div>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.14em",
          textTransform:"uppercase", color: T.muted, marginTop:"4px" }}>Businesses</div>
      </Motion.div>
    </section>
  );
}

// ─── STORE BUTTON ─────────────────────────────────────────────────────────────
function StoreBtn({ store }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={() => scrollToSection("download")} data-hover style={{ cursor:"pointer", textDecoration:"none",
      display:"flex", alignItems:"center", gap:"14px", padding:"14px 22px",
      border:`1px solid ${hov ? T.gold : "rgba(242,237,228,0.2)"}`,
      background: hov ? T.goldDim : "rgba(8,8,8,0.5)",
      backdropFilter:"blur(10px)", transition:"all 0.3s", minWidth:"196px",
      transform: hov ? "translateY(-2px)" : "translateY(0)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {store === "apple" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={T.cream}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={T.cream}>
          <path d="M3.18 23.76c.27.15.57.2.89.15l12.47-7.12-2.62-2.63-10.74 9.6zm-1.41-20.9C1.46 3.22 1.3 3.63 1.3 4.13v15.74c0 .5.16.91.47 1.27l.07.06 8.82-8.82v-.21L1.84 3.35l-.07.51zM20.13 10.3l-2.5-1.43-2.94 2.94 2.94 2.94 2.52-1.44c.72-.41.72-1.6-.02-2.01zM4.07.24L16.54 7.4l-2.62 2.63L3.18.47C3.47.42 3.78.47 4.07.24z"/>
        </svg>
      )}
      <div>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"9px", letterSpacing:"0.1em",
          textTransform:"uppercase", color: T.muted }}>
          {store === "apple" ? "Download on the" : "Get it on"}
        </div>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"15px",
          color: T.cream, lineHeight:1.2 }}>
          {store === "apple" ? "App Store" : "Google Play"}
        </div>
      </div>
    </button>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Business Discovery","Haitian Community","Restaurants & Food",
    "Legal Services","Healthcare","Real Estate","Creative Arts","Technology",
    "Finance & Banking","Beauty & Wellness","Construction","Education"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: T.gold, padding:"13px 0", overflow:"hidden",
      borderTop:`1px solid rgba(200,145,58,0.3)` }}>
      <div style={{ display:"flex", gap:"60px", animation:"marq 30s linear infinite", width:"max-content" }}>
        <style>{`@keyframes marq { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600,
            fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase",
            color: T.black, flexShrink:0, whiteSpace:"nowrap" }}>
            {item}{i < doubled.length - 1 ? " ✦" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SCROLL STORY SECTION ────────────────────────────────────────────────────
const storySlides = [
  {
    label: "Our Mission",
    lines: ["We didn't build", "an app."],
    accent: "We built a bridge.",
    body: "Between Haitian entrepreneurs and the people who need them most. KONEKT is the infrastructure of community — invisible until you need it, impossible to imagine living without.",
    align: "left",
  },
  {
    label: "The Problem",
    lines: ["Millions of Haitian", "businesses exist."],
    accent: "Almost none are findable.",
    body: "The talent is there. The ambition is there. What's been missing is a single trusted place where the diaspora can discover, support, and amplify its own.",
    align: "center",
  },
  {
    label: "The Solution",
    lines: ["One search."],
    accent: "Infinite community.",
    body: "KONEKT surfaces Haitian-owned restaurants, lawyers, doctors, creatives, and contractors — anywhere in the world. Smart discovery. Real reviews. Genuine connections.",
    align: "right",
  },
  {
    label: "For Owners",
    lines: ["Your business", "deserves to be seen."],
    accent: "List it in minutes.",
    body: "Create your profile, upload photos, add services and hours. Instantly reach thousands of community members already searching for exactly what you offer.",
    align: "left",
  },
  {
    label: "The Vision",
    lines: ["This is just", "the beginning."],
    accent: "Ayiti chèri.",
    body: "We're building the most powerful economic network the Haitian diaspora has ever had — not just in Miami or New York, but everywhere our people are.",
    align: "center",
  },
];

function StorySlide({ slide, containerRef, segStart, segEnd }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const opacity = useTransform(scrollYProgress,
    [segStart, segStart + 0.08, segEnd - 0.08, segEnd], [0, 1, 1, 0]);
  const yRaw = useTransform(scrollYProgress,
    [segStart, segStart + 0.08, segEnd - 0.08, segEnd], reduceMotion ? [20, 0, 0, -20] : [70, 0, 0, -70]);
  const blurRaw = useTransform(scrollYProgress,
    [segStart, segStart + 0.06, segEnd - 0.06, segEnd], reduceMotion ? [0, 0, 0, 0] : [10, 0, 0, 10]);
  const filter = useTransform(blurRaw, b => `blur(${b}px)`);
  const y = useSpring(yRaw, { stiffness: 70, damping: 20 });
  const opacityS = useSpring(opacity, { stiffness: 90, damping: 24 });

  const alignMap = { left:"flex-start", center:"center", right:"flex-end" };
  const textAlign = { left:"left", center:"center", right:"right" };

  return (
    <Motion.div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
      alignItems: alignMap[slide.align], justifyContent:"center",
      padding:"0 clamp(28px, 8vw, 120px)", pointerEvents:"none",
      opacity: opacityS, y, filter }}>
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"32px",
        justifyContent: slide.align === "center" ? "center" : slide.align === "right" ? "flex-end" : "flex-start" }}>
        {slide.align !== "right" && <div style={{ width:"28px", height:"1px", background: T.gold }} />}
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.26em",
          textTransform:"uppercase", color: T.gold }}>{slide.label}</span>
        {slide.align === "right" && <div style={{ width:"28px", height:"1px", background: T.gold }} />}
      </div>
      {/* Headline */}
      <div style={{ textAlign: textAlign[slide.align] }}>
        {slide.lines.map((l, i) => (
          <div key={i} style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
            fontSize:"clamp(44px, 7.5vw, 108px)", lineHeight:0.94, letterSpacing:"-0.02em",
            color: T.cream, display:"block" }}>{l}</div>
        ))}
        <div style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontWeight:700,
          fontSize:"clamp(44px, 7.5vw, 108px)", lineHeight:0.94, letterSpacing:"-0.02em",
          color: T.gold, display:"block", marginBottom:"36px" }}>{slide.accent}</div>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(15px, 1.3vw, 18px)",
          lineHeight:1.8, color: T.muted, fontWeight:300, maxWidth:"560px",
          marginLeft: slide.align === "left" ? "0" : "auto",
          marginRight: slide.align === "right" ? "0" : "auto" }}>{slide.body}</p>
      </div>
    </Motion.div>
  );
}

function StoryProgressDot({ scrollYProgress, index, total }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.18, 1, 1, 0.18]);
  return (
    <Motion.div style={{ width:"5px", height:"5px", borderRadius:"50%", background: T.gold, opacity }} />
  );
}

function ScrollStory({ viewportWidth }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Ambient orb pos
  const orbX = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["50%", "50%"] : ["20%", "80%"]);
  const orbX2 = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["50%", "50%"] : ["75%", "25%"]);

  // Big ghost number
  const numVal = useTransform(scrollYProgress, v =>
    String(Math.min(Math.floor(v * storySlides.length) + 1, storySlides.length)));

  return (
    <div ref={containerRef} style={{ height:`${storySlides.length * (viewportWidth <= BP.md ? 115 : 130)}vh`, position:"relative" }}
      id="features">
      {/* Sticky viewport */}
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden", background: T.black }}>
        {/* Grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(${T.goldDim} 1px, transparent 1px), linear-gradient(90deg, ${T.goldDim} 1px, transparent 1px)`,
          backgroundSize:"100px 100px", opacity:0.5 }} />

        {/* Moving ambient orbs */}
        <Motion.div style={{ position:"absolute", width:"700px", height:"700px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(15,35,71,0.35) 0%, transparent 65%)`,
          top:"50%", left: orbX, translateX:"-50%", translateY:"-50%", filter:"blur(60px)" }} />
        <Motion.div style={{ position:"absolute", width:"500px", height:"500px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(200,145,58,0.1) 0%, transparent 65%)`,
          top:"50%", left: orbX2, translateX:"-50%", translateY:"-50%", filter:"blur(80px)" }} />

        {/* Ghost number */}
        <Motion.div style={{ position:"absolute", bottom:"-60px", right:"clamp(20px,5vw,80px)",
          fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(200px, 30vw, 380px)", lineHeight:1,
          color:"transparent", WebkitTextStroke:`1px rgba(200,145,58,0.07)`,
          userSelect:"none", pointerEvents:"none" }}>
          <Motion.span>{numVal}</Motion.span>
        </Motion.div>

        {/* Slides */}
        {storySlides.map((slide, i) => {
          const seg = 1 / storySlides.length;
          return (
            <StorySlide key={i} slide={slide} containerRef={containerRef}
              segStart={i * seg} segEnd={(i + 1) * seg} />
          );
        })}

        {/* Dot nav */}
        <div style={{ position:"absolute", right:"36px", top:"50%",
          transform:"translateY(-50%)", display:"flex", flexDirection:"column",
          gap:"10px", zIndex:10 }}>
          {storySlides.map((_, i) => (
            <StoryProgressDot key={i} scrollYProgress={scrollYProgress} index={i} total={storySlides.length} />
          ))}
        </div>

        {/* Wordmark */}
        <div style={{ position:"absolute", bottom:"36px", left:"clamp(28px,8vw,120px)",
          fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.2em",
          color:"rgba(242,237,228,0.15)", textTransform:"uppercase" }}>
          KONEKT — Haitian Business Discovery
        </div>
      </div>
    </div>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = target / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(id); return; }
      setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {count >= 1000 ? (count / 1000).toFixed(0) + "K" : count}{suffix}
    </span>
  );
}

function StatCard({ stat, index, columns, compact }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const showRightBorder = columns === 4 ? index < 3 : columns === 2 ? index % 2 === 0 : false;
  const showBottomBorder = columns === 2 ? index < 2 : false;

  return (
    <Motion.div ref={ref}
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay: index * 0.1, ease:[0.16,1,0.3,1] }}
      style={{ padding: compact ? "44px 24px" : "60px 48px",
        borderRight: showRightBorder ? `1px solid ${T.mutedLow}` : "none",
        borderBottom: showBottomBorder ? `1px solid ${T.mutedLow}` : "none" }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
        fontSize:"clamp(42px, 5vw, 68px)", lineHeight:1, color: T.cream, marginBottom:"10px" }}>
        <Counter target={stat.num} suffix={stat.suffix} />
      </div>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px",
        letterSpacing:"0.1em", textTransform:"uppercase", color: T.muted }}>{stat.label}</div>
    </Motion.div>
  );
}

function Stats({ viewportWidth }) {
  const columns = viewportWidth <= BP.sm ? 1 : viewportWidth <= BP.lg ? 2 : 4;
  const compact = viewportWidth <= BP.md;
  return (
    <section style={{ display:"grid", gridTemplateColumns:`repeat(${columns},1fr)`,
      borderTop:`1px solid ${T.mutedLow}`, borderBottom:`1px solid ${T.mutedLow}` }}>
      {STATS_ITEMS.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} columns={columns} compact={compact} />
      ))}
    </section>
  );
}

// ─── FEATURES GRID ────────────────────────────────────────────────────────────
const features = [
  { n:"01", icon: <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"/>,
    title:"Smart Discovery", desc:"Find Haitian-owned businesses by category, rating, or location. Powerful filters, instant results." },
  { n:"02", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="1.5" stroke="currentColor" fill="none"/><circle cx="9" cy="7" r="4" strokeWidth="1.5" stroke="currentColor" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.5" stroke="currentColor" fill="none"/></>,
    title:"Community Network", desc:"Connect, refer, and support entrepreneurs. Build relationships that outlast transactions." },
  { n:"03", icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="1.5" stroke="currentColor" fill="none"/>,
    title:"Verified Reviews", desc:"Authentic ratings from real community members. Every review verified for trust." },
  { n:"04", icon: <><rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.5" stroke="currentColor" fill="none"/><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="1.5" stroke="currentColor" fill="none"/></>,
    title:"Business Profiles", desc:"Showcase with photos, menus, hours, services. Your digital storefront, fully yours." },
  { n:"05", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="1.5" stroke="currentColor" fill="none"/><circle cx="12" cy="10" r="3" strokeWidth="1.5" stroke="currentColor" fill="none"/></>,
    title:"Local & Global", desc:"Miami, New York, Montreal, Port-au-Prince — KONEKT maps the diaspora worldwide." },
  { n:"06", icon: <><path d="M18 20V10" strokeWidth="1.5" stroke="currentColor"/><path d="M12 20V4" strokeWidth="1.5" stroke="currentColor"/><path d="M6 20v-6" strokeWidth="1.5" stroke="currentColor"/></>,
    title:"Business Analytics", desc:"Profile views, search impressions, customer inquiries. Data-driven growth for owners." },
];

function FeatureCard({ f, i, compact }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:"-80px" });
  const [hov, setHov] = useState(false);
  return (
    <Motion.div ref={ref}
      initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay: i * 0.09, ease:[0.16,1,0.3,1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      data-hover
      style={{ padding:"48px 40px", border:`1px solid ${hov ? "rgba(200,145,58,0.3)" : T.mutedLow}`,
        background: hov ? "rgba(200,145,58,0.05)" : "rgba(242,237,228,0.02)",
        position:"relative", overflow:"hidden", cursor:"default", minHeight: compact ? "auto" : "320px",
        transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      {/* Top shimmer */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px",
        background:`linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
        opacity: hov ? 1 : 0, transition:"opacity 0.4s" }} />
      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.2em",
        color: T.muted, display:"block", marginBottom:"28px" }}>{f.n}</span>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"22px",
        color: T.cream, marginBottom:"14px" }}>{f.title}</div>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.75,
        color: T.muted }}>{f.desc}</p>
    </Motion.div>
  );
}

function Features({ viewportWidth }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const cols = viewportWidth <= BP.md ? 1 : viewportWidth <= BP.lg ? 2 : 3;
  const gap = viewportWidth <= BP.md ? "10px" : "12px";
  return (
    <section style={{ padding:getSectionPadding(viewportWidth), background:"#0C0C0C" }}>
      <Motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }} style={{ maxWidth:"700px", marginBottom:"80px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Why KONEKT</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(40px, 5.5vw, 76px)", lineHeight:1, letterSpacing:"-0.02em",
          color: T.cream }}>Built for our<br /><em style={{ color: T.gold }}>community</em></h2>
      </Motion.div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap }}>
        {features.map((f, i) => <FeatureCard key={i} f={f} i={i} compact={cols === 1} />)}
      </div>
    </section>
  );
}

// ─── PHONE MOCKUP ─────────────────────────────────────────────────────────────
function PhoneMockup({ offset = 0, rotate = 0, zIndex = 2, opacity = 1 }) {
  const cards = [
    { name:"Mama's Kitchen", sub:"Haitian Restaurant · Miami, FL", badge:"★ 4.9  Open Now", color: T.gold },
    { name:"Larose Law Firm", sub:"Legal Services · Brooklyn, NY", badge:"★ 4.8  Verified", color:"#5B8DB8" },
    { name:"ArtisanKreyol Studio", sub:"Creative Agency · Boston, MA", badge:"★ 5.0  Featured", color:"#7BAF6E" },
  ];
  return (
    <div style={{ width:"230px", background:"#111", borderRadius:"44px", padding:"10px",
      boxShadow:`0 0 0 1px rgba(255,255,255,0.07), 0 60px 120px rgba(0,0,0,0.85), 0 0 60px rgba(200,145,58,0.12)`,
      position:"absolute", transform:`rotate(${rotate}deg) translateY(${offset}px)`,
      zIndex, opacity, animation: zIndex === 2 ? "floatP 6s ease-in-out infinite" : "none" }}>
      <style>{`@keyframes floatP { 0%,100%{transform:rotate(${rotate}deg) translateY(${offset}px)} 50%{transform:rotate(${rotate}deg) translateY(${offset - 14}px)} }`}</style>
      <div style={{ background:`linear-gradient(155deg, ${T.blue} 0%, #1A0A08 100%)`,
        borderRadius:"36px", padding:"18px 14px", aspectRatio:"9/19.5", display:"flex", flexDirection:"column" }}>
        <div style={{ width:"70px", height:"20px", background:"#000", borderRadius:"20px",
          margin:"0 auto 18px" }} />
        <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", fontWeight:600,
          letterSpacing:"0.18em", textTransform:"uppercase", color: T.gold, marginBottom:"12px" }}>KONEKT</div>
        <div style={{ background:"rgba(242,237,228,0.07)", borderRadius:"10px",
          padding:"9px 12px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"7px" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", color: T.muted }}>Search businesses...</span>
        </div>
        {cards.map((c, i) => (
          <div key={i} style={{ background:"rgba(242,237,228,0.04)",
            border:`1px solid rgba(242,237,228,0.08)`, borderRadius:"12px",
            padding:"12px", marginBottom:"8px" }}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"11px",
              color: T.cream, marginBottom:"3px" }}>{c.name}</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"9px", color: T.muted }}>{c.sub}</div>
            <div style={{ display:"inline-block", marginTop:"5px",
              background: c.color, color: T.black, fontFamily:"'Outfit',sans-serif",
              fontSize:"7px", fontWeight:700, padding:"2px 7px", borderRadius:"20px",
              letterSpacing:"0.08em" }}>{c.badge}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppSection({ viewportWidth }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:"-100px" });
  const stacked = viewportWidth <= BP.lg;
  return (
    <section style={{ display:"grid", gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
      gap: stacked ? "40px" : "80px", padding:getSectionPadding(viewportWidth), alignItems:"center" }} id="app">
      {/* Phones */}
      <Motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        style={{ position:"relative", height:"580px", display:"flex",
          alignItems:"center", justifyContent:"center", order: stacked ? 2 : 1 }}>
        <div style={{ position:"absolute", width:"480px", height:"480px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(200,145,58,0.14) 0%, transparent 65%)`,
          top:"50%", left:"50%", transform:"translate(-50%,-50%)", filter:"blur(40px)" }} />
        <PhoneMockup offset={0} rotate={0} zIndex={2} opacity={1} />
        <PhoneMockup offset={20} rotate={-7} zIndex={1} opacity={0.55} />
      </Motion.div>

      {/* Content */}
      <Motion.div ref={ref} initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:0.9, delay:0.15, ease:[0.16,1,0.3,1] }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>The App</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(38px, 4.5vw, 64px)", lineHeight:1.02, letterSpacing:"-0.02em",
          color: T.cream, marginBottom:"28px" }}>
          Your community<br /><em style={{ color: T.gold }}>in your pocket</em>
        </h2>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"17px", lineHeight:1.8,
          color: T.muted, fontWeight:300, marginBottom:"18px" }}>
          KONEKT is available on iOS and Android — intuitive, fast, and designed specifically for
          how the Haitian community discovers and supports local businesses.
        </p>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"17px", lineHeight:1.8,
          color: T.muted, fontWeight:300, marginBottom:"48px" }}>
          Browse, save, review, and connect — anytime, anywhere in the world.
        </p>
        <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
          <StoreBtn store="apple" />
          <StoreBtn store="google" />
        </div>
      </Motion.div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const steps = [
  { n:"01", title:"Create Your Account", desc:"Sign up in seconds with email or phone. Join thousands already building connections in the network." },
  { n:"02", title:"Explore Businesses", desc:"Browse by category, location, or keyword. Restaurants, lawyers, doctors, mechanics — all Haitian-owned, all verified." },
  { n:"03", title:"Connect & Support", desc:"Call, message, book, or visit directly from the app. Leave reviews and refer friends to strengthen the community." },
  { n:"04", title:"List Your Business", desc:"Own a business? Create your profile in minutes and reach thousands already searching for your services." },
];

function HowItWorksStepCard({ step, index, columns, total, compact }) {
  const stepRef = useRef(null);
  const stepInView = useInView(stepRef, { once: true, margin:"-80px" });
  const showRightBorder = columns === 4 ? index < total - 1 : columns === 2 ? index % 2 === 0 : false;
  const showBottomBorder = columns === 2 ? index < total - 2 : false;
  const showArrow = columns === 4 ? index < total - 1 : columns === 2 ? index % 2 === 0 : false;

  return (
    <Motion.div key={step.n} ref={stepRef}
      initial={{ opacity:0, y:30 }} animate={stepInView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay: index * 0.13, ease:[0.16,1,0.3,1] }}
      style={{ padding: compact ? "38px 26px" : "48px 36px",
        borderRight: showRightBorder ? `1px solid ${T.mutedLow}` : "none",
        borderBottom: showBottomBorder ? `1px solid ${T.mutedLow}` : "none",
        position:"relative" }}>
      <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
        fontSize:"72px", lineHeight:1, color:"rgba(200,145,58,0.12)",
        display:"block", marginBottom:"20px" }}>{step.n}</span>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"20px",
        color: T.cream, marginBottom:"14px" }}>{step.title}</div>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.75,
        color: T.muted }}>{step.desc}</p>
      {showArrow && (
        <div style={{ position:"absolute", top:"50%", right:"-17px",
          width:"34px", height:"34px", borderRadius:"50%",
          background: T.black, border:`1px solid rgba(200,145,58,0.3)`,
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      )}
    </Motion.div>
  );
}

function HowItWorks({ viewportWidth }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const columns = viewportWidth <= BP.md ? 1 : viewportWidth <= BP.lg ? 2 : 4;
  const compact = viewportWidth <= BP.md;
  return (
    <section style={{ padding:getSectionPadding(viewportWidth), background:"#0C0C0C" }} id="how-it-works">
      <Motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }} style={{ marginBottom:"80px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>How It Works</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(40px, 5.5vw, 76px)", lineHeight:1, letterSpacing:"-0.02em",
          color: T.cream }}>Simple. Powerful.<br /><em style={{ color: T.gold }}>Built for you.</em></h2>
      </Motion.div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${columns},1fr)`,
        border:`1px solid ${T.mutedLow}`, gap:"0" }}>
        {steps.map((step, index) => (
          <HowItWorksStepCard
            key={step.n}
            step={step}
            index={index}
            columns={columns}
            total={steps.length}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const cats = ["Restaurants","Legal","Healthcare","Real Estate","Beauty","Auto",
  "Technology","Creative","Finance","Education","Retail","Construction"];

function CategoryCard({ category, index, isActive, onSelect, compact }) {
  const cRef = useRef(null);
  const cInView = useInView(cRef, { once: true });
  return (
    <Motion.div ref={cRef}
      initial={{ opacity:0, scale:0.92 }} animate={cInView ? { opacity:1, scale:1 } : {}}
      transition={{ duration:0.5, delay: index * 0.05, ease:[0.16,1,0.3,1] }}
      onClick={() => onSelect(index)} data-hover
      style={{ border:`1px solid ${isActive ? T.gold : T.mutedLow}`,
        background: isActive ? T.goldDim : "transparent",
        padding: compact ? "14px 12px" : "18px 16px", textAlign:"center", cursor:"pointer",
        fontFamily:"'Outfit',sans-serif", fontSize:"13px",
        color: isActive ? T.gold : T.muted,
        fontWeight: isActive ? 600 : 400,
        transition:"all 0.3s" }}>
      {category}
    </Motion.div>
  );
}

function Categories({ viewportWidth }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const columns = viewportWidth <= BP.md ? 2 : viewportWidth <= BP.lg ? 3 : 6;
  const compact = viewportWidth <= BP.md;
  return (
    <section style={{ padding:getSectionPadding(viewportWidth, { desktop:"120px 60px", xl:"120px 48px", tablet:"100px 36px", mobile:"90px 20px" }), background: T.black }}>
      <Motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }} style={{ marginBottom:"56px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Business Categories</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(38px, 5vw, 68px)", lineHeight:1.02, letterSpacing:"-0.02em",
          color: T.cream }}>Every service,<br /><em style={{ color: T.gold }}>every business</em></h2>
      </Motion.div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${columns},1fr)`, gap:"8px" }}>
        {cats.map((category, index) => (
          <CategoryCard
            key={category}
            category={category}
            index={index}
            isActive={active === index}
            onSelect={setActive}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = [
  { q:"KONEKT changed how I find Haitian businesses. I found an incredible attorney and a catering company in the same afternoon. This app is exactly what our community needed.", name:"Marie Joseph", role:"Teacher · Miami, FL", initials:"MJ" },
  { q:"Since listing my restaurant on KONEKT, my customer base has doubled. The community genuinely wants to support each other — this platform makes it possible.", name:"Pierre Desrosiers", role:"Restaurant Owner · Boston, MA", initials:"PD" },
  { q:"As a Haitian-American entrepreneur, visibility is everything. KONEKT gave my consulting firm access to clients I never would have reached otherwise.", name:"Claudette Lafleur", role:"Business Consultant · New York, NY", initials:"CL" },
  { q:"Finding a Haitian doctor who speaks Kreyol and understands our culture was always so hard. With KONEKT I found exactly what I needed in five minutes.", name:"Roseline Baptiste", role:"Healthcare Worker · Brooklyn, NY", initials:"RB" },
  { q:"I moved to a new city and KONEKT was the first thing I used to find community. It's not just a business directory — it's a lifeline for the diaspora.", name:"Jean-Marc Pierre", role:"Software Engineer · Atlanta, GA", initials:"JM" },
  { q:"Building my brand in a new market felt impossible until KONEKT. Now I have clients who genuinely believe in what we do. This platform gives Haitian business a real voice.", name:"Nadia Thermidor", role:"Fashion Designer · Houston, TX", initials:"NT" },
];

function Testimonials({ viewportWidth }) {
  const doubled = [...testimonials, ...testimonials];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const sectionPadding = getSectionPadding(viewportWidth);
  const cardWidth = viewportWidth <= BP.sm ? "280px" : viewportWidth <= BP.md ? "300px" : "340px";
  return (
    <section style={{ padding: `${sectionPadding.split(" ")[0]} 0`, background:"#0C0C0C", overflow:"hidden" }} id="community">
      <Motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }}
        style={{ padding:`0 ${sectionPadding.split(" ")[1]}`, marginBottom:"60px", display:"flex",
          justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
            <div style={{ width:"24px", height:"1px", background: T.gold }} />
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
              textTransform:"uppercase", color: T.gold }}>Community Voices</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
            fontSize:"clamp(38px, 5vw, 68px)", lineHeight:1.02, letterSpacing:"-0.02em",
            color: T.cream }}>They trust<br /><em style={{ color: T.gold }}>KONEKT</em></h2>
        </div>
      </Motion.div>

      <div style={{ display:"flex", gap:"20px", animation:"slideT 45s linear infinite", width:"max-content" }}>
        <style>{`@keyframes slideT { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
        {doubled.map((t, i) => (
          <div key={i} style={{ width:cardWidth, flexShrink:0, padding:"36px 32px",
            background:"rgba(242,237,228,0.03)", border:`1px solid ${T.mutedLow}` }}>
            {/* Stars */}
            <div style={{ display:"flex", gap:"4px", marginBottom:"20px" }}>
              {[...Array(5)].map((_, j) => (
                <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill={T.gold}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.8,
              color:"rgba(242,237,228,0.7)", fontStyle:"italic", fontWeight:300,
              marginBottom:"28px" }}>"{t.q}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"42px", height:"42px", borderRadius:"50%", flexShrink:0,
                background:`linear-gradient(135deg, ${T.blue}, ${T.red})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"14px", color: T.cream }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"14px",
                  color: T.cream }}>{t.name}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", color: T.muted,
                  marginTop:"2px" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────
function CTA({ viewportWidth }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section style={{ minHeight:"88vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:getSectionPadding(viewportWidth), position:"relative", overflow:"hidden" }} id="download">
      {/* BG */}
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,35,71,0.4) 0%, transparent 70%)` }} />
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,49,31,0.18) 0%, transparent 65%)` }} />
      {/* Haitian flag colors floating */}
      <div style={{ position:"absolute", left:"10%", top:"20%", width:"300px", height:"300px",
        background:`radial-gradient(circle, rgba(15,35,71,0.4) 0%, transparent 70%)`,
        borderRadius:"50%", filter:"blur(60px)" }} />
      <div style={{ position:"absolute", right:"10%", bottom:"20%", width:"250px", height:"250px",
        background:`radial-gradient(circle, rgba(184,49,31,0.3) 0%, transparent 70%)`,
        borderRadius:"50%", filter:"blur(60px)" }} />

      <Motion.div ref={ref} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        style={{ position:"relative", zIndex:2 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", marginBottom:"36px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Get Started Today</span>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
        </div>

        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(52px, 9vw, 130px)", lineHeight:0.92, letterSpacing:"-0.025em",
          color: T.cream, marginBottom:"36px" }}>
          Your community<br />
          <em style={{ color: T.gold }}>is waiting.</em>
        </h2>

        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"18px", lineHeight:1.75,
          color: T.muted, maxWidth:"520px", margin:"0 auto 60px", fontWeight:300 }}>
          Download KONEKT and join the fastest-growing Haitian business network in the world.
          Free for individuals. Free to list your business.
        </p>

        <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap", marginBottom:"60px" }}>
          <StoreBtn store="apple" />
          <StoreBtn store="google" />
        </div>

        {/* Trust badges */}
        <div style={{ display:"flex", gap:"40px", justifyContent:"center", flexWrap:"wrap" }}>
          {["5,000+ Businesses","50K+ Members","Free to Join"].map((b, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", background: T.gold }} />
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px",
                letterSpacing:"0.06em", color: T.muted }}>{b}</span>
            </div>
          ))}
        </div>
      </Motion.div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const FOOTER_COLUMNS = [
  {
    h:"Product",
    links:[
      { label:"Discover Businesses", href:"/discover-businesses" },
      { label:"List Your Business", href:"/list-your-business" },
      { label:"Community Reviews", href:"/community-reviews" },
      { label:"Download the App", href:"/download-the-app" },
    ],
  },
  {
    h:"Company",
    links:[
      { label:"Our Story", href:"/our-story" },
      { label:"Mission & Vision", href:"/mission-vision" },
      { label:"Community Partners", href:"/community-partners" },
      { label:"Careers", href:"/careers" },
    ],
  },
  {
    h:"Support",
    links:[
      { label:"Help Center", href:"/help-center" },
      { label:"Contact Support", href:"/contact-support" },
      { label:"Privacy Policy", href:"/privacy-policy" },
      { label:"Terms of Service", href:"/terms" },
    ],
  },
];

function Footer({ viewportWidth }) {
  const cols = FOOTER_COLUMNS;
  const columns = viewportWidth <= BP.md ? "1fr" : viewportWidth <= BP.lg ? "repeat(2,1fr)" : "2fr 1fr 1fr 1fr";
  const sectionPadding = viewportWidth <= BP.md ? "70px 20px 32px" : viewportWidth <= BP.lg ? "70px 36px 36px" : "80px 60px 40px";
  return (
    <footer style={{ background:"#000", padding:sectionPadding,
      borderTop:`1px solid ${T.mutedLow}` }}>
      <div style={{ display:"grid", gridTemplateColumns:columns, gap:viewportWidth <= BP.lg ? "28px" : "60px", marginBottom:"60px" }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"24px",
            letterSpacing:"0.06em", color: T.cream, marginBottom:"18px" }}>
            KON<span style={{ color: T.gold }}>EKT</span>
          </div>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.85,
            color: T.muted, maxWidth:"320px", fontWeight:300 }}>
            KONEKT helps the Haitian diaspora discover, support, and grow businesses worldwide.
            One trusted platform for community-powered commerce.
          </p>
        </div>
        {cols.map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"11px",
              letterSpacing:"0.18em", textTransform:"uppercase", color: T.cream,
              marginBottom:"20px" }}>{col.h}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {col.links.map(l => (
                <a key={l.label} href={l.href} style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px",
                  color: T.muted, textDecoration:"none", cursor:"pointer", transition:"color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = T.gold}
                  onMouseLeave={e => e.target.style.color = T.muted}>{l.label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        paddingTop:"32px", borderTop:`1px solid ${T.mutedLow}`, flexWrap:"wrap", gap:"16px" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px",
          color:"rgba(242,237,228,0.25)" }}>© 2026 KONEKT. Built for the Haitian diaspora.</p>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px",
            color:"rgba(242,237,228,0.25)" }}>Rooted in Haiti. Connected worldwide.</span>
          <div style={{ width:"24px", height:"15px", display:"flex", flexDirection:"column",
            overflow:"hidden", borderRadius:"2px" }}>
            <div style={{ background:"#00209F", flex:1 }} />
            <div style={{ background:"#D21034", flex:1 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function KonektLanding() {
  const viewportWidth = useViewportWidth();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) return;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }, []);
  const pathname = typeof window !== "undefined"
    ? (window.location.pathname.replace(/\/+$/, "") || "/")
    : "/";
  const isLanding = pathname === "/" || pathname === "/index.html";
  const RoutePage = FOOTER_ROUTE_COMPONENTS[pathname];

  if (!isLanding && RoutePage) {
    return (
      <>
        <style>{FONT_STYLE}</style>
        <Noise />
        <ProgressBar />
        <RoutePage
          viewportWidth={viewportWidth}
          theme={T}
          breakpoints={BP}
          getSectionPadding={getSectionPadding}
        />
        <Footer viewportWidth={viewportWidth} />
      </>
    );
  }

  if (!isLanding && !RoutePage) {
    return (
      <>
        <style>{FONT_STYLE}</style>
        <Noise />
        <ProgressBar />
        <NotFoundPage theme={T} />
        <Footer viewportWidth={viewportWidth} />
      </>
    );
  }

  return (
    <>
      <style>{FONT_STYLE}</style>
      <Noise />
      <ProgressBar />
      <Nav viewportWidth={viewportWidth} />
      <Hero viewportWidth={viewportWidth} />
      <Marquee />
      <Stats viewportWidth={viewportWidth} />
      <ScrollStory viewportWidth={viewportWidth} />
      <Features viewportWidth={viewportWidth} />
      <AppSection viewportWidth={viewportWidth} />
      <HowItWorks viewportWidth={viewportWidth} />
      <Categories viewportWidth={viewportWidth} />
      <Testimonials viewportWidth={viewportWidth} />
      <CTA viewportWidth={viewportWidth} />
      <Footer viewportWidth={viewportWidth} />
    </>
  );
}
