"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "./use-portfolio-motion";

type Language = "en" | "ar";
type AccentName = "acid" | "orange" | "pink" | "blue";

const accents: Array<{ name: AccentName; value: string }> = [
  { name: "acid", value: "#d7ff43" },
  { name: "orange", value: "#ff743d" },
  { name: "pink", value: "#ff5a98" },
  { name: "blue", value: "#3d63ff" },
];

const roleImages = [
  "/role-builder-cutout.png?v=3",
  "/role-strategist-cutout.png?v=3",
  "/role-designer-cutout.png?v=3",
  "/role-growth-cutout.png?v=3",
];

const mobileMenuImages = [...roleImages, "/role-growth-cutout.png?v=3"];

const copy = {
  en: {
    nav: ["About", "Journey", "Projects", "Capabilities", "Contact"],
    available: "Building from Cairo for the world",
    eyebrow: "Solo founder · Full-stack builder",
    hero: <><span className="hero-line">Hey, I’m Ahmed.</span><br /><span className="hero-line">I turn ideas into <span className="hero-highlight">products</span>—and products into businesses.</span></>,
    heroSub: "I work solo across strategy, design, engineering, and growth to take a product from zero to real users.",
    pick: "SEE HOW I BUILD",
    roles: [
      { title: "Founder", note: "Vision · Decisions · Ownership", className: "orange" },
      { title: "Product", note: "Research · Logic · Direction", className: "yellow" },
      { title: "Builder", note: "Full-stack · Web · Native", className: "pink" },
      { title: "Growth", note: "Launch · Analytics · Learning", className: "blue" },
    ],
    founderKicker: "SOLO FOUNDER, FULL-STACK BUILDER",
    founderTitle: "One person, from first idea to working business.",
    founderBody: "I’m Ahmed Mansour. I find a real problem, shape the product, design the experience, build the system, launch it, and learn from what users do next. Working solo keeps the vision close to the details and every decision close to the outcome.",
    founderNote: "Based in Cairo · Building for the world",
    founderFacts: ["Zero-to-one products", "End-to-end ownership", "Fast, focused execution", "Built close to users"],
    thesisKicker: "WHY I BUILD SOLO",
    thesis: "Fewer handoffs. Clearer decisions. Faster learning.",
    thesisBody: "I keep product thinking, design, engineering, and growth in one loop. That means less translation, less waiting, and more time turning real user signals into a better product.",
    statement: "I don’t wait for perfect conditions. I build the next useful version.",
    journeyTitle: "How I take a product from idea to momentum.",
    journey: [
      { n: "01", title: "Find the sharp problem", body: "I talk to users, challenge assumptions, and define the smallest problem worth solving well." },
      { n: "02", title: "Shape the product", body: "I turn the insight into a focused experience, clear business logic, and a practical path to launch." },
      { n: "03", title: "Build the real thing", body: "I design and engineer the product end to end—frontend, backend, data, and the details users feel." },
      { n: "04", title: "Launch, learn, improve", body: "I watch behavior, measure the right signals, and use evidence to decide what the product becomes next." },
    ],
    projectsKicker: "FOUNDER-BUILT PRODUCTS",
    projectsTitle: "Products built as businesses, not bundles of features.",
    projectsSub: "Each build starts with a real operating problem and connects product thinking, software, data, and growth in one system.",
    projects: [
      { n: "01", name: "Nexfiy", type: "Founder operating system", body: "A focused workspace that turns goals, decisions, customer signals, and business metrics into one operating rhythm.", tags: ["SaaS", "Next.js", "Business logic"], color: "project-blue" },
      { n: "02", name: "Growth Console", type: "Product intelligence", body: "A decision cockpit that makes acquisition, activation, retention, and product friction clear enough to act on.", tags: ["Analytics", "Experiments", "Reporting"], color: "project-acid" },
      { n: "03", name: "PeopleOS", type: "People operations", body: "A human-centered system for hiring, onboarding, capacity, and performance—designed for clarity instead of paperwork.", tags: ["HR systems", "UX", "Automation"], color: "project-coral" },
    ],
    capabilitiesTitle: "One founder-builder. The whole product loop.",
    capabilitiesSub: "I connect the decisions that usually get split across strategy, design, engineering, operations, and growth.",
    capabilities: ["Venture & product strategy", "Full-stack engineering", "UI/UX & prototyping", "AI-native product systems", "Analytics & instrumentation", "Growth & experimentation", "Operations & automation", "Launch & iteration"],
    stackLabel: "BUILT WITH",
    stack: "Next.js / React / Node.js / TypeScript / JavaScript / React Native / Zustand / Firebase / Supabase / Convex / Tailwind CSS / HTML / CSS / ChatGPT",
    brandsKicker: "MY BUILDING STACK",
    brandsTitle: "A lean stack for moving fast and owning the product.",
    brands: ["NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT", "JAVASCRIPT", "REACT NATIVE", "ZUSTAND", "FIREBASE", "SUPABASE", "CONVEX", "TAILWIND CSS", "HTML", "CSS", "CHATGPT", "POSTGRES", "OPENAI", "VERCEL", "ANALYTICS"],
    contactKicker: "BUILD THE NEXT THING",
    contactTitle: <>Have an idea worth building?<br /><em>Let’s make it real.</em></>,
    contactBody: "Bring the early idea, the stubborn problem, or the product that needs a founder-builder to move it forward.",
    contactCta: "Tell me what you’re building",
    footer: "Ahmed Mansour — Solo founder & builder",
    lang: "العربية",
  },
  ar: {
    nav: ["عني", "الرحلة", "المشاريع", "الخبرات", "تواصل"],
    available: "أبني من القاهرة للعالم",
    eyebrow: "مؤسس مستقل · مطوّر Full‑Stack",
    hero: <><span className="hero-line">أهلاً، أنا أحمد.</span><br /><span className="hero-line">أحوّل الأفكار إلى <span className="hero-highlight">منتجات</span>—والمنتجات إلى بزنس.</span></>,
    heroSub: "أعمل بشكل مستقل على الاستراتيجية والتصميم والبرمجة والنمو لأحوّل المنتج من صفر إلى مستخدمين حقيقيين.",
    pick: "شاهد كيف أبني",
    roles: [
      { title: "المؤسس", note: "رؤية · قرار · مسؤولية", className: "orange" },
      { title: "المنتج", note: "بحث · منطق · اتجاه", className: "yellow" },
      { title: "المطوّر", note: "Full‑Stack · Web · Native", className: "pink" },
      { title: "النمو", note: "إطلاق · تحليلات · تعلّم", className: "blue" },
    ],
    founderKicker: "مؤسس مستقل، ومطوّر Full‑Stack",
    founderTitle: "شخص واحد، من أول فكرة إلى بزنس يعمل.",
    founderBody: "أنا أحمد منصور. أجد مشكلة حقيقية، أحدد المنتج، أصمم التجربة، أبني النظام، أطلقه، ثم أتعلم من سلوك المستخدمين. العمل بشكل مستقل يبقي الرؤية قريبة من التفاصيل، وكل قرار قريباً من النتيجة.",
    founderNote: "من القاهرة · أبني للعالم",
    founderFacts: ["منتجات من الصفر", "مسؤولية من البداية للنهاية", "تنفيذ سريع ومركّز", "قريب دائماً من المستخدم"],
    thesisKicker: "لماذا أبني وحدي",
    thesis: "تسليم أقل. قرار أوضح. تعلّم أسرع.",
    thesisBody: "أضع التفكير في المنتج والتصميم والبرمجة والنمو داخل دورة واحدة. النتيجة: ترجمة أقل، انتظار أقل، ووقت أكبر لتحويل إشارات المستخدمين إلى منتج أفضل.",
    statement: "لا أنتظر الظروف المثالية. أبني النسخة المفيدة التالية.",
    journeyTitle: "كيف أنقل المنتج من الفكرة إلى الزخم.",
    journey: [
      { n: "٠١", title: "أحدد المشكلة الحقيقية", body: "أتحدث مع المستخدمين، أراجع الافتراضات، وأحدد أصغر مشكلة تستحق أن تُحل بإتقان." },
      { n: "٠٢", title: "أشكّل المنتج", body: "أحوّل الفكرة إلى تجربة مركّزة، ومنطق بزنس واضح، وطريق عملي نحو الإطلاق." },
      { n: "٠٣", title: "أبني المنتج الحقيقي", body: "أصمم وأبرمج المنتج كاملاً: الواجهة، الباك إند، البيانات، وكل تفصيلة يشعر بها المستخدم." },
      { n: "٠٤", title: "أطلق، أتعلم، وأطوّر", body: "أراقب السلوك، أقيس الإشارات المهمة، وأستخدم الدليل لتحديد الخطوة التالية للمنتج." },
    ],
    projectsKicker: "منتجات بناها مؤسس",
    projectsTitle: "منتجات بُنيت كبزنس، لا كحزمة خصائص.",
    projectsSub: "كل مشروع يبدأ بمشكلة تشغيل حقيقية ويجمع التفكير في المنتج والبرمجة والبيانات والنمو داخل نظام واحد.",
    projects: [
      { n: "٠١", name: "Nexfiy", type: "نظام تشغيل للمؤسسين", body: "مساحة مركزة تجمع الأهداف والقرارات وإشارات العملاء ومؤشرات البزنس في إيقاع تشغيل واحد.", tags: ["SaaS", "Next.js", "منطق الأعمال"], color: "project-blue" },
      { n: "٠٢", name: "Growth Console", type: "ذكاء المنتج", body: "لوحة قرار تجعل الاستحواذ والتفعيل والاحتفاظ ونقاط التعثر واضحة بما يكفي للتحرك.", tags: ["تحليلات", "تجارب", "تقارير"], color: "project-acid" },
      { n: "٠٣", name: "PeopleOS", type: "عمليات الأفراد", body: "نظام يبدأ بالإنسان للتوظيف والتهيئة وقياس القدرة والأداء—مصمم للوضوح بدلاً من الورق.", tags: ["أنظمة HR", "UX", "أتمتة"], color: "project-coral" },
    ],
    capabilitiesTitle: "مؤسس ومطوّر واحد. دورة المنتج كاملة.",
    capabilitiesSub: "أربط القرارات التي تتوزع عادة بين الاستراتيجية والتصميم والبرمجة والعمليات والنمو.",
    capabilities: ["استراتيجية المشروع والمنتج", "تطوير Full‑Stack", "UI/UX والنماذج الأولية", "منتجات مبنية بالذكاء الاصطناعي", "التحليلات وقياس السلوك", "النمو والتجارب", "العمليات والأتمتة", "الإطلاق والتطوير"],
    stackLabel: "أدوات البناء",
    stack: "Next.js / React / Node.js / TypeScript / JavaScript / React Native / Zustand / Firebase / Supabase / Convex / Tailwind CSS / HTML / CSS / ChatGPT",
    brandsKicker: "أدواتي في البناء",
    brandsTitle: "تقنيات خفيفة للحركة بسرعة وامتلاك المنتج بالكامل.",
    brands: ["NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT", "JAVASCRIPT", "REACT NATIVE", "ZUSTAND", "FIREBASE", "SUPABASE", "CONVEX", "TAILWIND CSS", "HTML", "CSS", "CHATGPT", "POSTGRES", "OPENAI", "VERCEL", "ANALYTICS"],
    contactKicker: "ابنِ الشيء التالي",
    contactTitle: <>لديك فكرة تستحق البناء؟<br /><em>لنحوّلها إلى واقع.</em></>,
    contactBody: "هات الفكرة الأولى، المشكلة العنيدة، أو المنتج الذي يحتاج مؤسساً ومطوّراً يدفعه إلى الأمام.",
    contactCta: "احكِ لي ماذا تبني",
    footer: "أحمد منصور — مؤسس ومطوّر مستقل",
    lang: "English",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [accent, setAccent] = useState<AccentName>("acid");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPortrait, setMenuPortrait] = useState(0);
  const [hoveredMenuPortrait, setHoveredMenuPortrait] = useState<number | null>(null);
  const pageRef = useRef<HTMLElement>(null);
  const t = copy[language];
  const isArabic = language === "ar";

  usePortfolioMotion(pageRef, language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [language, isArabic]);

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;

      if (!target) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });
    };

    const restoreHashAfterLayout = async () => {
      await document.fonts?.ready;
      requestAnimationFrame(() => requestAnimationFrame(scrollToCurrentHash));
    };

    if (document.readyState === "complete") {
      void restoreHashAfterLayout();
    } else {
      window.addEventListener("load", restoreHashAfterLayout, { once: true });
    }

    return () => window.removeEventListener("load", restoreHashAfterLayout);
  }, []);

  useEffect(() => {
    const savedAccent = window.localStorage.getItem("portfolio-accent") as AccentName | null;
    if (savedAccent && accents.some((option) => option.name === savedAccent)) setAccent(savedAccent);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.classList.remove("menu-is-open");
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  const chooseAccent = (nextAccent: AccentName) => {
    setAccent(nextAccent);
    setPaletteOpen(false);
    window.localStorage.setItem("portfolio-accent", nextAccent);
  };

  return (
    <main
      ref={pageRef}
      className={isArabic ? "arabic" : "english"}
      style={{ "--chosen-accent": accents.find((option) => option.name === accent)?.value } as React.CSSProperties}
    >
      <span className="cursor-orb" aria-hidden="true" />
      <header className="topbar">
        <span className="scroll-progress" aria-hidden="true" />
        <a href="#top" className="brand" aria-label="Ahmed Mansour, home" onClick={() => setMenuOpen(false)}>
          <span>AHMED</span> MANSOUR
        </a>
        <div className={`color-control${paletteOpen ? " is-open" : ""}`}>
          <button
            className="color-trigger"
            type="button"
            aria-label={isArabic ? "غيّر لون الحركة" : "Change motion color"}
            aria-expanded={paletteOpen}
            onClick={() => setPaletteOpen((open) => !open)}
          ><span /></button>
          <div className="color-menu" aria-hidden={!paletteOpen}>
            {accents.map((option) => (
              <button
                key={option.name}
                type="button"
                className={accent === option.name ? "is-selected" : ""}
                style={{ "--swatch": option.value } as React.CSSProperties}
                aria-label={`${option.name} accent`}
                aria-pressed={accent === option.name}
                tabIndex={paletteOpen ? 0 : -1}
                onClick={() => chooseAccent(option.name)}
              />
            ))}
          </div>
        </div>
        <nav aria-label="Main navigation">
          {t.nav.map((item, index) => <a key={item} href={["#about", "#journey", "#projects", "#capabilities", "#contact"][index]}>{item}</a>)}
          <button className="language" data-magnetic onClick={() => setLanguage(isArabic ? "en" : "ar")} aria-label="Switch language">{t.lang}</button>
        </nav>
        <a className="mobile-nav-identity" href="#top" aria-label="Ahmed Mansour — Solo founder and builder" onClick={() => setMenuOpen(false)}>
          <span className="identity-wheel" />
          <b>SOLO / FOUNDER BUILDER</b>
        </a>
        <button
          className={`menu-trigger${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? (isArabic ? "إغلاق القائمة" : "Close menu") : (isArabic ? "فتح القائمة" : "Open menu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setPaletteOpen(false);
            setMenuOpen((open) => !open);
          }}
        >
          <span className="menu-trigger-icon" aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <span className="mobile-menu-orbit orbit-one" aria-hidden="true" />
        <span className="mobile-menu-orbit orbit-two" aria-hidden="true" />
        <div className="mobile-menu-face" aria-hidden="true">
          {mobileMenuImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt=""
              className={`mobile-menu-primary${(hoveredMenuPortrait ?? menuPortrait) === index ? " is-visible" : ""}`}
            />
          ))}
          <img className="mobile-menu-sidekick" src="/role-designer-cutout.png?v=3" alt="" />
        </div>
        <p className="mobile-menu-kicker">{isArabic ? "اختر وجهتك" : "Pick a direction"}</p>
        <nav aria-label={isArabic ? "التنقل على الهاتف" : "Mobile navigation"}>
          {t.nav.map((item, index) => (
            <a
              key={item}
              href={["#about", "#journey", "#projects", "#capabilities", "#contact"][index]}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              onPointerEnter={() => setHoveredMenuPortrait(index)}
              onPointerLeave={() => setHoveredMenuPortrait(null)}
              onFocus={() => setHoveredMenuPortrait(index)}
              onBlur={() => setHoveredMenuPortrait(null)}
            >
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <div className="portrait-picker">
            <p>{isArabic ? "اختر شكلاً مختلفاً" : "Choose different"}</p>
            <div>
              {roleImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={menuPortrait === index ? "is-selected" : ""}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label={isArabic ? `اختر الخلفية ${index + 1}` : `Choose background ${index + 1}`}
                  aria-pressed={menuPortrait === index}
                  onClick={() => setMenuPortrait(index)}
                ><img src={image} alt="" /></button>
              ))}
            </div>
          </div>
          <button className="mobile-language" type="button" tabIndex={menuOpen ? 0 : -1} onClick={() => setLanguage(isArabic ? "en" : "ar")}>
            <span>{isArabic ? "Language" : "اللغة"}</span><strong>{t.lang}</strong>
          </button>
        </div>
      </div>

      <section className="hero" id="top">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.hero}</h1>
        <p className="hero-sub">{t.heroSub}</p>
        <a href="#about" className="oval-link" data-magnetic>{t.pick}</a>
        <div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" /><div className="orbit-dot dot-c" />

        <div className="role-ticker" aria-hidden="true">
          <div className="role-ticker-track">
            {[0, 1].map((setIndex) => (
              <div className="role-ticker-set" key={setIndex}>
                {[...t.roles, ...t.roles].map((role, roleIndex) => (
                  <span key={`${role.title}-${roleIndex}`}>{role.title}<i>✦</i></span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="role-grid" aria-label="The roles Ahmed owns as a solo founder">
          {t.roles.map((role, index) => (
            <article className={`role-card ${role.className}`} key={role.title}>
              <span className="role-count">0{index + 1}</span>
              <img className="role-image" src={roleImages[index]} alt={`${role.title} — Ahmed Mansour`} />
              <h2>{role.title}</h2>
              <p>{role.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="founder-profile" id="about">
        <div className="founder-stage" data-reveal>
          <span className="founder-stage-label">AHMED / 05</span>
          <span className="founder-stage-word" aria-hidden="true">FOUNDER</span>
          <img
            id="founder-chair-shot"
            src="/ahmed-founder-chair.png?v=4"
            alt="Ahmed Mansour seated in a cobalt chair"
            className="founder-chair"
          />
          <span className="founder-signal">FOUNDER MODE</span>
          <p className="founder-stage-caption">SOLO FOUNDER × PRODUCT × ENGINEERING</p>
        </div>
        <div className="founder-copy" data-reveal>
          <div className="section-number">01 — FOUNDER</div>
          <p className="kicker">{t.founderKicker}</p>
          <h2>{t.founderTitle}</h2>
          <p className="founder-body">{t.founderBody}</p>
          <p className="founder-note">↳ {t.founderNote}</p>
          <div className="founder-facts">{t.founderFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>
        </div>
      </section>

      <section className="thesis">
        <div className="section-number">01.1 — POINT OF VIEW</div>
        <div className="thesis-copy" data-reveal>
          <p className="kicker">{t.thesisKicker}</p>
          <h2>{t.thesis}</h2>
          <p>{t.thesisBody}</p>
        </div>
        <aside className="quote-card" data-reveal><span>“</span>{t.statement}</aside>
      </section>

      <section className="journey" id="journey">
        <svg className="section-orbit" viewBox="0 0 700 700" aria-hidden="true">
          <circle cx="350" cy="350" r="270" /><circle cx="350" cy="350" r="170" />
          <path d="M80 358c135-104 390-111 540 5" />
        </svg>
        <div className="journey-heading" data-reveal>
          <div className="section-number">02 — JOURNEY</div>
          <h2>{t.journeyTitle}</h2>
        </div>
        <div className="steps">
          {t.journey.map((step) => (
            <article className="step" key={step.n}>
              <span>{step.n}</span><h3>{step.title}</h3><p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="projects-heading" data-reveal>
          <div className="section-number">03 — PROJECTS</div>
          <div><p className="kicker">{t.projectsKicker}</p><h2>{t.projectsTitle}</h2><p>{t.projectsSub}</p></div>
        </div>
        <div className="project-grid">
          {t.projects.map((project) => (
            <article className={`project-card ${project.color}`} key={project.name} data-reveal>
              <div className="project-top"><span>{project.n}</span><span>{project.type}</span></div>
              <div className="project-mark"><i /><i /><i /></div>
              <h3>{project.name}</h3>
              <p>{project.body}</p>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="capability-intro" data-reveal>
          <div className="section-number">04 — CAPABILITIES</div>
          <h2>{t.capabilitiesTitle}</h2>
          <p>{t.capabilitiesSub}</p>
        </div>
        <div className="capability-list" data-reveal>
          {t.capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<i>↗</i></div>)}
        </div>
        <div className="stack" data-reveal><span>{t.stackLabel}</span><p>{t.stack}</p></div>
      </section>

      <section className="brands">
        <svg className="mosaic-scribble" viewBox="0 0 320 120" aria-hidden="true">
          <path d="M8 89c53-81 87 15 137-43 39-45 90 70 166-28" />
        </svg>
        <div className="brands-copy" data-reveal><p className="kicker">{t.brandsKicker}</p><h2>{t.brandsTitle}</h2></div>
        <div className="brand-wall">{t.brands.map((brand, index) => <span key={brand} className={`brand-tile brand-tile-${index + 1}`}>{brand}</span>)}</div>
      </section>

      <section className="contact" id="contact">
        <p className="kicker">{t.contactKicker}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
        <a className="contact-button" data-magnetic href="mailto:hello@ahmedmansour.dev?subject=I%20have%20something%20worth%20building">{t.contactCta}<span>↗</span></a>
      </section>

      <footer><span>{t.footer}</span><span>© {new Date().getFullYear()}</span><a href="#top">↑ TOP</a></footer>
    </main>
  );
}
