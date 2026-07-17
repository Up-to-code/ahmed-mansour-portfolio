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

const copy = {
  en: {
    nav: ["About", "Journey", "Projects", "Capabilities", "Contact"],
    available: "Available for select projects",
    eyebrow: "Full-stack founder partner",
    hero: <><span className="hero-line">Hey, I’m Ahmed.</span><br /><span className="hero-line">I build the <span className="hero-highlight">business</span> <em>inside</em> the product.</span></>,
    heroSub: "From the first messy idea to the metrics that prove it works — I turn ambitious products into focused, useful businesses.",
    pick: "PICK YOUR AHMED",
    roles: [
      { title: "Builder", note: "Next.js · Node.js · Native", className: "orange" },
      { title: "Strategist", note: "Business logic · Systems", className: "yellow" },
      { title: "Designer", note: "UI/UX · Product clarity", className: "pink" },
      { title: "Growth", note: "Analytics · Experiments", className: "blue" },
    ],
    founderKicker: "FOUNDER, ENGINEER, OPERATOR",
    founderTitle: "I work where business, technology, and people meet.",
    founderBody: "I’m Ahmed Mansour—a full-stack developer with a founder’s mindset. I don’t treat code as the finish line. I step into the business, challenge the assumptions, understand the user, shape the experience, help the team, and build the system that moves all of it forward.",
    founderNote: "Based in Cairo · Building for anywhere",
    founderFacts: ["Full-stack delivery", "Founder-level ownership", "Bilingual by design", "Human-first systems"],
    thesisKicker: "THE DIFFERENCE",
    thesis: "Most developers ship features. I stay for the outcome.",
    thesisBody: "I connect engineering decisions to customer behavior, team capacity, and business value. The result is software that feels right, grows with evidence, and doesn’t become tomorrow’s expensive problem.",
    statement: "You don’t hand me a ticket. You invite me into the problem.",
    journeyTitle: "How we go from “what if?” to “what’s next?”",
    journey: [
      { n: "01", title: "Listen before building", body: "We unpack the real request, the people behind it, and the business result worth chasing." },
      { n: "02", title: "Make the logic visible", body: "I translate complexity into a clear product path, priorities, trade-offs, and a plan your team can believe in." },
      { n: "03", title: "Build fast. Build native.", body: "I create the product across web, backend, and native experiences—with clean systems that are easy to change." },
      { n: "04", title: "Measure what matters", body: "We watch engagement, friction, retention, and growth—then turn the findings into the next smart move." },
    ],
    projectsKicker: "SELECTED BUILDS",
    projectsTitle: "Products designed to create movement.",
    projectsSub: "A selection of product directions that show how I combine software, operations, experience, and growth.",
    projects: [
      { n: "01", name: "Nexfiy", type: "Founder operating system", body: "A focused workspace that turns goals, decisions, team signals, and business metrics into one operating rhythm.", tags: ["SaaS", "Next.js", "Business logic"], color: "project-blue" },
      { n: "02", name: "Growth Console", type: "Analytics & intelligence", body: "A decision cockpit that makes acquisition, engagement, retention, and product friction understandable at a glance.", tags: ["Analytics", "Experiments", "Reporting"], color: "project-acid" },
      { n: "03", name: "PeopleOS", type: "Teams & operations", body: "A human-centered system for hiring, onboarding, capacity, and performance—built around clarity rather than paperwork.", tags: ["HR systems", "UX", "Automation"], color: "project-coral" },
    ],
    capabilitiesTitle: "One partner. A wider field of view.",
    capabilitiesSub: "The best product decisions rarely live inside one department.",
    capabilities: ["Full-stack engineering", "Product & business logic", "UI/UX direction", "Analytics & reporting", "Growth experiments", "Hiring & team systems", "Rapid problem solving", "AI-native workflows"],
    stackLabel: "BUILT WITH",
    stack: "Next.js / React / Node.js / TypeScript / JavaScript / React Native / Zustand / Firebase / Supabase / Convex / Tailwind CSS / HTML / CSS / ChatGPT",
    brandsKicker: "TOOLS & PLATFORMS",
    brandsTitle: "A modern stack, chosen for the business—not the trend.",
    brands: ["NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT", "JAVASCRIPT", "REACT NATIVE", "ZUSTAND", "FIREBASE", "SUPABASE", "CONVEX", "TAILWIND CSS", "HTML", "CSS", "CHATGPT", "POSTGRES", "OPENAI", "VERCEL", "ANALYTICS"],
    contactKicker: "THE NEXT MOVE",
    contactTitle: <>Let’s build something<br /><em>that takes us further.</em></>,
    contactBody: "Bring the ambitious idea, the stubborn problem, or the product that deserves a better second chapter.",
    contactCta: "Start a conversation",
    footer: "Ahmed Mansour — Builder of useful things",
    lang: "العربية",
  },
  ar: {
    nav: ["عني", "الرحلة", "المشاريع", "الخبرات", "تواصل"],
    available: "متاح لمشاريع مختارة",
    eyebrow: "شريك مؤسس ومطور Full‑Stack",
    hero: <><span className="hero-line">أهلاً، أنا أحمد.</span><br /><span className="hero-line">أبني <span className="hero-highlight">البزنس</span> داخل المنتج.</span></>,
    heroSub: "من الفكرة الأولى غير المرتبة إلى الأرقام التي تثبت نجاحها — أحوّل المنتجات الطموحة إلى أعمال واضحة، مفيدة، وقابلة للنمو.",
    pick: "اختر أحمد الذي تحتاجه",
    roles: [
      { title: "المطوّر", note: "Next.js · Node.js · Native", className: "orange" },
      { title: "الاستراتيجي", note: "منطق الأعمال · الأنظمة", className: "yellow" },
      { title: "المصمّم", note: "UI/UX · وضوح المنتج", className: "pink" },
      { title: "خبير النمو", note: "تحليلات · تجارب", className: "blue" },
    ],
    founderKicker: "مؤسس، مطوّر، وصانع أنظمة",
    founderTitle: "أعمل في المساحة التي تجمع البزنس والتقنية والناس.",
    founderBody: "أنا أحمد منصور—مطوّر Full‑Stack بعقلية مؤسس. لا أتعامل مع الكود كخط النهاية. أدخل إلى قلب البزنس، أراجع الافتراضات، أفهم المستخدم، أصنع التجربة، أساند الفريق، وأبني النظام الذي يدفع الجميع إلى الأمام.",
    founderNote: "من القاهرة · أبني لأي مكان",
    founderFacts: ["تنفيذ Full‑Stack", "ملكية بعقلية مؤسس", "تجربة ثنائية اللغة", "أنظمة تبدأ بالإنسان"],
    thesisKicker: "الفرق الحقيقي",
    thesis: "معظم المطورين يسلّمون خصائص. أنا أبقى حتى نصل للنتيجة.",
    thesisBody: "أربط قرارات البرمجة بسلوك العملاء، وقدرة الفريق، وقيمة المشروع. النتيجة منتج مريح، ينمو بالدليل، ولا يتحول إلى مشكلة مكلفة غداً.",
    statement: "أنت لا ترسل لي مهمة. أنت تدعوني لفهم المشكلة.",
    journeyTitle: "كيف ننتقل من «ماذا لو؟» إلى «ما الخطوة التالية؟»",
    journey: [
      { n: "٠١", title: "أستمع قبل أن أبني", body: "نفكك الطلب الحقيقي، ومن سيستخدم المنتج، والنتيجة التجارية التي تستحق المطاردة." },
      { n: "٠٢", title: "نوضح منطق الفكرة", body: "أحوّل التعقيد إلى مسار منتج واضح: أولويات، مفاضلات، وخطة يؤمن بها الفريق." },
      { n: "٠٣", title: "نبني بسرعة وبأصلية", body: "أبني الويب والباك إند والتجارب الأصلية بأنظمة نظيفة يسهل تطويرها وتغييرها." },
      { n: "٠٤", title: "نقيس ما يهم", body: "نراقب التفاعل، نقاط التعثر، الاحتفاظ والنمو، ثم نحوّل النتائج إلى القرار الذكي التالي." },
    ],
    projectsKicker: "مشاريع مختارة",
    projectsTitle: "منتجات صُممت لتصنع حركة حقيقية.",
    projectsSub: "نماذج لاتجاهات منتجات توضح كيف أجمع بين البرمجة، والعمليات، والتجربة، والنمو.",
    projects: [
      { n: "٠١", name: "Nexfiy", type: "نظام تشغيل للمؤسسين", body: "مساحة مركزة تجمع الأهداف والقرارات وإشارات الفريق ومؤشرات البزنس في إيقاع تشغيل واحد.", tags: ["SaaS", "Next.js", "منطق الأعمال"], color: "project-blue" },
      { n: "٠٢", name: "Growth Console", type: "تحليلات وذكاء", body: "لوحة قرار تجعل الاستحواذ والتفاعل والاحتفاظ ونقاط تعثر المنتج واضحة من النظرة الأولى.", tags: ["تحليلات", "تجارب", "تقارير"], color: "project-acid" },
      { n: "٠٣", name: "PeopleOS", type: "الفرق والعمليات", body: "نظام يبدأ بالإنسان للتوظيف والتهيئة وقياس القدرة والأداء—مبني على الوضوح لا الأوراق.", tags: ["أنظمة HR", "UX", "أتمتة"], color: "project-coral" },
    ],
    capabilitiesTitle: "شريك واحد. رؤية أوسع.",
    capabilitiesSub: "أفضل قرارات المنتج نادراً ما تعيش داخل قسم واحد.",
    capabilities: ["تطوير Full‑Stack", "المنتج ومنطق الأعمال", "توجيه UI/UX", "التحليلات والتقارير", "تجارب النمو", "التوظيف وبناء الفريق", "حل المشكلات بسرعة", "أساليب عمل مدعومة بالذكاء الاصطناعي"],
    stackLabel: "أدوات البناء",
    stack: "Next.js / React / Node.js / TypeScript / JavaScript / React Native / Zustand / Firebase / Supabase / Convex / Tailwind CSS / HTML / CSS / ChatGPT",
    brandsKicker: "الأدوات والمنصات",
    brandsTitle: "تقنيات حديثة نختارها لخدمة البزنس، لا لمجرد الترند.",
    brands: ["NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT", "JAVASCRIPT", "REACT NATIVE", "ZUSTAND", "FIREBASE", "SUPABASE", "CONVEX", "TAILWIND CSS", "HTML", "CSS", "CHATGPT", "POSTGRES", "OPENAI", "VERCEL", "ANALYTICS"],
    contactKicker: "الخطوة التالية",
    contactTitle: <>لنبنِ شيئاً<br /><em>يأخذنا أبعد.</em></>,
    contactBody: "هات الفكرة الطموحة، المشكلة العنيدة، أو المنتج الذي يستحق بداية ثانية أفضل.",
    contactCta: "لنبدأ الحديث",
    footer: "أحمد منصور — أبني أشياء مفيدة",
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
          {[...roleImages, "/ahmed-founder-chair.png?v=4"].map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={(hoveredMenuPortrait ?? menuPortrait) === index ? "is-visible" : ""}
            />
          ))}
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
        <div className="role-grid" aria-label="Ahmed's roles">
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
          <p className="founder-stage-caption">BUILDER × STRATEGIST × OPERATOR</p>
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
        <a className="contact-button" data-magnetic href="mailto:hello@ahmedmansour.dev?subject=Let%27s%20build%20something%20together">{t.contactCta}<span>↗</span></a>
      </section>

      <footer><span>{t.footer}</span><span>© {new Date().getFullYear()}</span><a href="#top">↑ TOP</a></footer>
    </main>
  );
}
