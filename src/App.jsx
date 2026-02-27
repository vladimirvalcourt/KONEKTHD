import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

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
const HERO_WORDS = ["Discover.", "Connect.", "Belong."];
const STATS_ITEMS = [
  { num: 5000, suffix: "+", label: "Businesses Listed" },
  { num: 32, suffix: "+", label: "States & Cities" },
  { num: 50000, suffix: "+", label: "Community Members" },
  { num: 98, suffix: "%", label: "User Satisfaction" },
];
const HOW_IT_WORKS_STEPS = [
  { n:"01", title:"Create Your Account", desc:"Sign up in seconds with email or phone. Join thousands already building connections in the network." },
  { n:"02", title:"Explore Businesses", desc:"Browse by category, location, or keyword. Restaurants, lawyers, doctors, mechanics — all Haitian-owned, all verified." },
  { n:"03", title:"Connect & Support", desc:"Call, message, book, or visit directly from the app. Leave reviews and refer friends to strengthen the community." },
  { n:"04", title:"List Your Business", desc:"Own a business? Create your profile in minutes and reach thousands already searching for your services." },
];
const CATEGORY_ITEMS = ["🍽 Restaurants","⚖️ Legal","🏥 Healthcare","🏠 Real Estate","💇 Beauty","🚗 Auto",
  "💻 Technology","🎨 Creative","💰 Finance","🎓 Education","🛍 Retail","🏗 Construction"];

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
const Motion = motion;

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
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Features", "How It Works", "Community", "App"];
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ position:"fixed", top:0, left:0, right:0, zIndex:600,
        padding: scrolled ? "14px 60px" : "28px 60px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.mutedLow}` : "none",
        transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      {/* Logo */}
      <a href="#" style={{ textDecoration:"none", cursor:"pointer" }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontWeight:900, fontSize:"22px",
          letterSpacing:"0.06em", color: T.cream }}>
          KON<span style={{ color: T.gold }}>EKT</span>
        </div>
      </a>
      {/* Desktop links */}
      <div style={{ display:"flex", gap:"40px", alignItems:"center" }}>
        {links.map((l, i) => (
          <motion.a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px", letterSpacing:"0.1em",
              textTransform:"uppercase", color: T.muted, textDecoration:"none", cursor:"pointer",
              transition:"color 0.3s" }}
            onMouseEnter={e => e.target.style.color = T.gold}
            onMouseLeave={e => e.target.style.color = T.muted}>{l}</motion.a>
        ))}
        <motion.a href="#download" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay: 0.8 }}
          style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"12px",
            letterSpacing:"0.14em", textTransform:"uppercase", color: T.black,
            background: T.gold, padding:"11px 28px", textDecoration:"none", cursor:"pointer",
            transition:"background 0.3s, transform 0.2s" }}
          onMouseEnter={e => { e.target.style.background = T.goldLight; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.target.style.background = T.gold; e.target.style.transform = "translateY(0)"; }}>
          Get App
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % HERO_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} style={{ minHeight:"100vh", position:"relative", display:"flex",
      flexDirection:"column", justifyContent:"flex-end", padding:"0 60px 90px", overflow:"hidden" }}>
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

      <motion.div style={{ position:"relative", zIndex:2, y, opacity }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8, delay:0.6 }}
          style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"32px" }}>
          <div style={{ width:"36px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Haitian Business Discovery</span>
        </motion.div>

        {/* Main headline */}
        <div style={{ overflow:"hidden" }}>
          <motion.h1 initial={{ y:"100%" }} animate={{ y:"0%" }}
            transition={{ duration:1, delay:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
              fontSize:"clamp(68px, 11vw, 160px)", lineHeight:0.88,
              letterSpacing:"-0.02em", color: T.cream, display:"block" }}>
            The Haitian
          </motion.h1>
        </div>
        <div style={{ overflow:"hidden" }}>
          <motion.div initial={{ y:"100%" }} animate={{ y:"0%" }}
            transition={{ duration:1, delay:0.95, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
              fontSize:"clamp(68px, 11vw, 160px)", lineHeight:0.88,
              letterSpacing:"-0.02em", color:"transparent",
              WebkitTextStroke:`1px ${T.cream}`, display:"block" }}>
            Business
          </motion.div>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:"24px", overflow:"hidden" }}>
          <motion.div initial={{ y:"100%" }} animate={{ y:"0%" }}
            transition={{ duration:1, delay:1.1, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
              fontSize:"clamp(68px, 11vw, 160px)", lineHeight:0.88,
              letterSpacing:"-0.02em", color: T.gold, display:"block" }}>
            Network.
          </motion.div>
        </div>

        {/* Subline + CTAs */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:1.4, ease:[0.16,1,0.3,1] }}
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
                <motion.span key={wordIdx}
                  initial={{ opacity:0, y:16, filter:"blur(8px)" }}
                  animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                  exit={{ opacity:0, y:-16, filter:"blur(8px)" }}
                  transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                  style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
                    fontSize:"clamp(28px, 3vw, 42px)", color: T.gold }}>
                  {HERO_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Store buttons */}
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <StoreBtn store="apple" />
            <StoreBtn store="google" />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner stat */}
      <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:1.8 }}
        style={{ position:"absolute", top:"120px", right:"60px", zIndex:3,
          borderLeft:`1px solid ${T.gold}`, paddingLeft:"20px" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"48px",
          lineHeight:1, color: T.cream }}>5K<span style={{ color: T.gold }}>+</span></div>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", letterSpacing:"0.14em",
          textTransform:"uppercase", color: T.muted, marginTop:"4px" }}>Businesses</div>
      </motion.div>
    </section>
  );
}

// ─── STORE BUTTON ─────────────────────────────────────────────────────────────
function StoreBtn({ store }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="#download" data-hover style={{ cursor:"pointer", textDecoration:"none",
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
    </a>
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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const opacity = useTransform(scrollYProgress,
    [segStart, segStart + 0.08, segEnd - 0.08, segEnd], [0, 1, 1, 0]);
  const yRaw = useTransform(scrollYProgress,
    [segStart, segStart + 0.08, segEnd - 0.08, segEnd], [90, 0, 0, -90]);
  const blurRaw = useTransform(scrollYProgress,
    [segStart, segStart + 0.06, segEnd - 0.06, segEnd], [14, 0, 0, 14]);
  const filter = useTransform(blurRaw, b => `blur(${b}px)`);
  const y = useSpring(yRaw, { stiffness: 70, damping: 20 });
  const opacityS = useSpring(opacity, { stiffness: 90, damping: 24 });

  const alignMap = { left:"flex-start", center:"center", right:"flex-end" };
  const textAlign = { left:"left", center:"center", right:"right" };

  return (
    <motion.div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
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
    </motion.div>
  );
}

function StoryProgressDot({ scrollYProgress, index }) {
  const segStart = index / storySlides.length;
  const segEnd = (index + 1) / storySlides.length;
  const dotOpacity = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.05, segEnd - 0.05, segEnd],
    [0.18, 1, 1, 0.18],
  );

  return (
    <motion.div style={{ width:"5px", height:"5px", borderRadius:"50%",
      background: T.gold, opacity: dotOpacity }} />
  );
}

function ScrollStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Ambient orb pos
  const orbX = useTransform(scrollYProgress, [0, 1], ["15%", "85%"]);
  const orbX2 = useTransform(scrollYProgress, [0, 1], ["80%", "20%"]);

  // Big ghost number
  const numVal = useTransform(scrollYProgress, v =>
    String(Math.min(Math.floor(v * storySlides.length) + 1, storySlides.length)));

  return (
    <div ref={containerRef} style={{ height:`${storySlides.length * 130}vh`, position:"relative" }}
      id="features">
      {/* Sticky viewport */}
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden", background: T.black }}>
        {/* Grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(${T.goldDim} 1px, transparent 1px), linear-gradient(90deg, ${T.goldDim} 1px, transparent 1px)`,
          backgroundSize:"100px 100px", opacity:0.5 }} />

        {/* Moving ambient orbs */}
        <motion.div style={{ position:"absolute", width:"700px", height:"700px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(15,35,71,0.35) 0%, transparent 65%)`,
          top:"50%", left: orbX, translateX:"-50%", translateY:"-50%", filter:"blur(80px)" }} />
        <motion.div style={{ position:"absolute", width:"500px", height:"500px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(200,145,58,0.1) 0%, transparent 65%)`,
          top:"50%", left: orbX2, translateX:"-50%", translateY:"-50%", filter:"blur(100px)" }} />

        {/* Ghost number */}
        <motion.div style={{ position:"absolute", bottom:"-60px", right:"clamp(20px,5vw,80px)",
          fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(200px, 30vw, 380px)", lineHeight:1,
          color:"transparent", WebkitTextStroke:`1px rgba(200,145,58,0.07)`,
          userSelect:"none", pointerEvents:"none" }}>
          <motion.span>{numVal}</motion.span>
        </motion.div>

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
            <StoryProgressDot key={i} scrollYProgress={scrollYProgress} index={i} />
          ))}
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

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay: index * 0.12, ease:[0.16,1,0.3,1] }}
      style={{ padding:"60px 48px",
        borderRight: index < STATS_ITEMS.length - 1 ? `1px solid ${T.mutedLow}` : "none" }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
        fontSize:"clamp(42px, 5vw, 68px)", lineHeight:1, color: T.cream, marginBottom:"10px" }}>
        <Counter target={stat.num} suffix={stat.suffix} />
      </div>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px",
        letterSpacing:"0.1em", textTransform:"uppercase", color: T.muted }}>{stat.label}</div>
    </motion.div>
  );
}

function Stats() {
  return (
    <section style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
      borderTop:`1px solid ${T.mutedLow}`, borderBottom:`1px solid ${T.mutedLow}` }}>
      {STATS_ITEMS.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
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

function FeatureCardContent({ f }) {
  return (
    <>
      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.2em",
        color: T.muted, display:"block", marginBottom:"28px" }}>{f.n}</span>
      <svg viewBox="0 0 24 24" style={{ width:"42px", height:"42px", color: T.gold, marginBottom:"24px", display:"block" }}>
        {f.icon}
      </svg>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"22px",
        color: T.cream, marginBottom:"14px" }}>{f.title}</div>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.75, color: T.muted }}>
        {f.desc}
      </p>
    </>
  );
}

function DeckBackCard({ f, layer, reduceMotion }) {
  const yOffset = layer === 1 ? 14 : 28;
  const scale = layer === 1 ? 0.96 : 0.92;
  const opacity = layer === 1 ? 0.6 : 0.34;
  const rotate = layer === 1 ? -1.2 : -2.1;

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={reduceMotion ? { opacity } : { y: yOffset, scale, opacity, rotate }}
      transition={{ type:"spring", stiffness:230, damping:28, mass:0.8 }}
      style={{ position:"absolute", inset:0, padding:"48px 40px",
        border:`1px solid ${T.mutedLow}`, background:"rgba(242,237,228,0.02)",
        overflow:"hidden", pointerEvents:"none", transformOrigin:"top center" }}>
      <FeatureCardContent f={f} />
    </motion.div>
  );
}

function DeckActiveCard({ f, direction, onAdvance, reduceMotion }) {
  const dir = direction >= 0 ? 1 : -1;
  const easeOut = [0.16, 1, 0.3, 1];
  const initial = reduceMotion
    ? { opacity:0, x: 8 * dir }
    : { opacity:0, x: 26 * dir, rotate: 2 * dir, scale: 0.985 };
  const animate = reduceMotion
    ? { opacity:1, x:0 }
    : { opacity:1, x:0, rotate:0, scale:1 };
  const exit = reduceMotion
    ? { opacity:0, x: -8 * dir }
    : { opacity:0, x: -32 * dir, rotate: -3 * dir, scale:0.97 };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAdvance();
    }
  };

  return (
    <motion.button
      type="button"
      onClick={onAdvance}
      onKeyDown={onKeyDown}
      data-hover
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration:0.42, ease:easeOut }}
      style={{ position:"absolute", inset:0, zIndex:3, textAlign:"left", width:"100%",
        border:`1px solid rgba(200,145,58,0.35)`, background:"rgba(200,145,58,0.07)",
        padding:"48px 40px", cursor:"pointer", color:"inherit",
        boxShadow:"0 18px 48px rgba(0,0,0,0.35)", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px",
        background:`linear-gradient(90deg, transparent, ${T.gold}, transparent)` }} />
      <FeatureCardContent f={f} />
      <div style={{ position:"absolute", left:0, right:0, bottom:0, height:"40px", display:"flex",
        alignItems:"center", padding:"0 14px", fontFamily:"'Outfit',sans-serif", fontSize:"10px", fontWeight:600,
        letterSpacing:"0.14em", textTransform:"uppercase", color:T.gold,
        background:"linear-gradient(180deg, rgba(200,145,58,0.16) 0%, rgba(200,145,58,0.3) 100%)",
        borderTop:`1px solid rgba(200,145,58,0.35)`, pointerEvents:"none" }}>
        Click to view next feature →
      </div>
    </motion.button>
  );
}

function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const ordered = features.map((_, offset) => features[(activeIndex + offset) % features.length]);
  const activeFeature = ordered[0];
  const stackFeatures = ordered.slice(1, 3);

  const nextFeature = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <section style={{ padding:"140px 60px", background:"#0C0C0C" }} id="how-it-works">
      <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }} style={{ maxWidth:"700px", marginBottom:"80px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Why KONEKT</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(40px, 5.5vw, 76px)", lineHeight:1, letterSpacing:"-0.02em",
          color: T.cream }}>Built for our<br /><em style={{ color: T.gold }}>community</em></h2>
      </motion.div>
      <div style={{ display:"flex", justifyContent:"center" }}>
        <div style={{ position:"relative", width:"min(100%, 700px)", minHeight:"360px", height:"360px" }}>
          {stackFeatures.map((f, idx) => (
            <DeckBackCard key={`back-${f.n}`} f={f} layer={idx + 1} reduceMotion={reduceMotion} />
          ))}
          <AnimatePresence mode="popLayout" initial={false}>
            <DeckActiveCard
              key={`active-${activeFeature.n}-${activeIndex}`}
              f={activeFeature}
              direction={direction}
              onAdvance={nextFeature}
              reduceMotion={reduceMotion}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── PHONE MOCKUP ─────────────────────────────────────────────────────────────
function PhoneMockup({ offset = 0, rotate = 0, zIndex = 2, opacity = 1, interactive = false }) {
  const cards = [
    { name:"Mama's Kitchen", sub:"Haitian Restaurant · Miami, FL", badge:"★ 4.9  Open Now", color: T.gold },
    { name:"Larose Law Firm", sub:"Legal Services · Brooklyn, NY", badge:"★ 4.8  Verified", color:"#5B8DB8" },
    { name:"ArtisanKreyol Studio", sub:"Creative Agency · Boston, MA", badge:"★ 5.0  Featured", color:"#7BAF6E" },
    { name:"Kreyol Health Center", sub:"Healthcare · Orlando, FL", badge:"★ 4.9  Trusted", color:"#76A8D8" },
    { name:"Nouvo Build Group", sub:"Construction · Newark, NJ", badge:"★ 4.7  Popular", color:"#D5A55B" },
    { name:"Belle Vie Beauty", sub:"Beauty & Wellness · Queens, NY", badge:"★ 4.8  Featured", color:"#C27AA0" },
  ];
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncCanHover = () => setCanHover(mediaQuery.matches);
    syncCanHover();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncCanHover);
      return () => mediaQuery.removeEventListener("change", syncCanHover);
    }
    mediaQuery.addListener(syncCanHover);
    return () => mediaQuery.removeListener(syncCanHover);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const measure = () => {
      const viewportEl = viewportRef.current;
      const trackEl = trackRef.current;
      if (!viewportEl || !trackEl) return;
      setScrollRange(Math.max(trackEl.scrollHeight - viewportEl.clientHeight, 0));
    };
    measure();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measure);
      if (viewportRef.current) resizeObserver.observe(viewportRef.current);
      if (trackRef.current) resizeObserver.observe(trackRef.current);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", measure);
      }
    };
  }, [interactive]);

  const shouldAutoScroll = interactive && canHover && isHovered && scrollRange > 0;
  const trackAnimation = shouldAutoScroll ? { y: [0, -scrollRange] } : { y: 0 };
  const trackTransition = shouldAutoScroll
    ? { duration: Math.max(scrollRange / 22, 8), ease: "linear", repeat: Infinity, repeatType: "reverse" }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] };

  return (
    <div style={{ width:"230px", background:"#111", borderRadius:"44px", padding:"10px",
      boxShadow:`0 0 0 1px rgba(255,255,255,0.07), 0 60px 120px rgba(0,0,0,0.85), 0 0 60px rgba(200,145,58,0.12)`,
      position:"absolute", transform:`rotate(${rotate}deg) translateY(${offset}px)`,
      zIndex, opacity, pointerEvents: interactive ? "auto" : "none" }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
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
        <div ref={viewportRef} style={{ flex:1, minHeight:0, overflow:"hidden", position:"relative" }}>
          <motion.div ref={trackRef} animate={trackAnimation} transition={trackTransition}
            style={{ display:"flex", flexDirection:"column" }}>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AppSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:"-100px" });
  return (
    <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
      gap:"80px", padding:"140px 60px", alignItems:"center" }} id="app">
      {/* Phones */}
      <motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        style={{ position:"relative", height:"580px", display:"flex",
          alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", width:"480px", height:"480px", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(200,145,58,0.14) 0%, transparent 65%)`,
          top:"50%", left:"50%", transform:"translate(-50%,-50%)", filter:"blur(40px)" }} />
        <PhoneMockup offset={0} rotate={0} zIndex={2} opacity={1} interactive />
        <PhoneMockup offset={20} rotate={-7} zIndex={1} opacity={0.55} interactive={false} />
      </motion.div>

      {/* Content */}
      <motion.div ref={ref} initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}}
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
      </motion.div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorksStepCard({ step, index }) {
  const stepRef = useRef(null);
  const stepInView = useInView(stepRef, { once: true, margin:"-80px" });

  return (
    <motion.div ref={stepRef}
      initial={{ opacity:0, y:30 }} animate={stepInView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay: index * 0.13, ease:[0.16,1,0.3,1] }}
      style={{ padding:"48px 36px",
        borderRight: index < HOW_IT_WORKS_STEPS.length - 1 ? `1px solid ${T.mutedLow}` : "none",
        position:"relative" }}>
      <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
        fontSize:"72px", lineHeight:1, color:"rgba(200,145,58,0.12)",
        display:"block", marginBottom:"20px" }}>{step.n}</span>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"20px",
        color: T.cream, marginBottom:"14px" }}>{step.title}</div>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.75,
        color: T.muted }}>{step.desc}</p>
      {index < HOW_IT_WORKS_STEPS.length - 1 && (
        <div style={{ position:"absolute", top:"50%", right:"-17px",
          width:"34px", height:"34px", borderRadius:"50%",
          background: T.black, border:`1px solid rgba(200,145,58,0.3)`,
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section style={{ padding:"140px 60px", background:"#0C0C0C" }} id="community">
      <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }} style={{ marginBottom:"80px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>How It Works</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(40px, 5.5vw, 76px)", lineHeight:1, letterSpacing:"-0.02em",
          color: T.cream }}>Simple. Powerful.<br /><em style={{ color: T.gold }}>Built for you.</em></h2>
      </motion.div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
        border:`1px solid ${T.mutedLow}`, gap:"0" }}>
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <HowItWorksStepCard key={step.n} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
function CategoryCard({ label, index, isActive, onSelect }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true });

  return (
    <motion.div ref={cardRef}
      initial={{ opacity:0, scale:0.92 }} animate={cardInView ? { opacity:1, scale:1 } : {}}
      transition={{ duration:0.5, delay: index * 0.05, ease:[0.16,1,0.3,1] }}
      onClick={() => onSelect(index)} data-hover
      style={{ border:`1px solid ${isActive ? T.gold : T.mutedLow}`,
        background: isActive ? T.goldDim : "transparent",
        padding:"18px 16px", textAlign:"center", cursor:"pointer",
        fontFamily:"'Outfit',sans-serif", fontSize:"13px",
        color: isActive ? T.gold : T.muted,
        fontWeight: isActive ? 600 : 400,
        transition:"all 0.3s" }}>
      {label}
    </motion.div>
  );
}

function Categories() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section style={{ padding:"120px 60px", background: T.black }}>
      <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }} style={{ marginBottom:"56px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
          <div style={{ width:"24px", height:"1px", background: T.gold }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"10px", letterSpacing:"0.24em",
            textTransform:"uppercase", color: T.gold }}>Business Categories</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:"clamp(38px, 5vw, 68px)", lineHeight:1.02, letterSpacing:"-0.02em",
          color: T.cream }}>Every service,<br /><em style={{ color: T.gold }}>every business</em></h2>
      </motion.div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"8px" }}>
        {CATEGORY_ITEMS.map((label, index) => (
          <CategoryCard
            key={label}
            label={label}
            index={index}
            isActive={active === index}
            onSelect={setActive}
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

function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section style={{ padding:"140px 0 140px", background:"#0C0C0C", overflow:"hidden" }}>
      <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.8 }}
        style={{ padding:"0 60px", marginBottom:"60px", display:"flex",
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
      </motion.div>

      <div style={{ display:"flex", gap:"20px", animation:"slideT 45s linear infinite", width:"max-content" }}>
        <style>{`@keyframes slideT { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
        {doubled.map((t, i) => (
          <div key={i} style={{ width:"340px", flexShrink:0, padding:"36px 32px",
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
function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section style={{ minHeight:"88vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:"140px 60px", position:"relative", overflow:"hidden" }} id="download">
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

      <motion.div ref={ref} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
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
      </motion.div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { h:"Product", links:["Features","For Business Owners","Pricing","App Download"] },
    { h:"Company", links:["About Us","Mission","Press","Careers"] },
    { h:"Support", links:["Help Center","Contact","Privacy Policy","Terms of Service"] },
  ];
  return (
    <footer style={{ background:"#000", padding:"80px 60px 40px",
      borderTop:`1px solid ${T.mutedLow}` }}>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"60px", marginBottom:"60px" }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"24px",
            letterSpacing:"0.06em", color: T.cream, marginBottom:"18px" }}>
            KON<span style={{ color: T.gold }}>EKT</span>
          </div>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px", lineHeight:1.85,
            color: T.muted, maxWidth:"320px", fontWeight:300 }}>
            The premier business discovery platform for the Haitian community — in the United States,
            Canada, and around the world.
          </p>
        </div>
        {cols.map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"11px",
              letterSpacing:"0.18em", textTransform:"uppercase", color: T.cream,
              marginBottom:"20px" }}>{col.h}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {col.links.map(l => (
                <a key={l} href="#" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"14px",
                  color: T.muted, textDecoration:"none", cursor:"pointer", transition:"color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = T.gold}
                  onMouseLeave={e => e.target.style.color = T.muted}>{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        paddingTop:"32px", borderTop:`1px solid ${T.mutedLow}`, flexWrap:"wrap", gap:"16px" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px",
          color:"rgba(242,237,228,0.25)" }}>© 2025 KONEKT. All rights reserved.</p>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px",
            color:"rgba(242,237,228,0.25)" }}>Made with love for Haiti</span>
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
  return (
    <>
      <style>{FONT_STYLE}</style>
      <Noise />
      <ProgressBar />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <ScrollStory />
      <Features />
      <AppSection />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
