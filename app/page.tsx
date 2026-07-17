"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ar";

const copy = {
  en: {
    nav: ["About", "Journey", "Capabilities", "Contact"],
    available: "Available for select projects",
    eyebrow: "Full-stack founder partner",
    hero: <>Hey, I’m Ahmed.<br />I build the business <em>inside</em> the product.</>,
    heroSub: "From the first messy idea to the metrics that prove it works — I turn ambitious products into focused, useful businesses.",
    pick: "PICK YOUR AHMED",
    roles: [
      { title: "Builder", note: "Next.js · Node.js · Native", className: "orange", icon: "⌘" },
      { title: "Strategist", note: "Business logic · Systems", className: "yellow", icon: "↗" },
      { title: "Designer", note: "UI/UX · Product clarity", className: "pink", icon: "✦" },
      { title: "Growth", note: "Analytics · Experiments", className: "blue", icon: "◎" },
    ],
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
    capabilitiesTitle: "One partner. A wider field of view.",
    capabilitiesSub: "The best product decisions rarely live inside one department.",
    capabilities: ["Full-stack engineering", "Product & business logic", "UI/UX direction", "Analytics & reporting", "Growth experiments", "Hiring & team systems", "Rapid problem solving", "AI-native workflows"],
    stackLabel: "BUILT WITH",
    stack: "Next.js / Node.js / TypeScript / React Native / AI",
    contactKicker: "THE NEXT MOVE",
    contactTitle: <>Let’s build something<br /><em>that takes us further.</em></>,
    contactBody: "Bring the ambitious idea, the stubborn problem, or the product that deserves a better second chapter.",
    contactCta: "Start a conversation",
    footer: "Ahmed Mansour — Builder of useful things",
    lang: "العربية",
  },
  ar: {
    nav: ["عني", "الرحلة", "الخبرات", "تواصل"],
    available: "متاح لمشاريع مختارة",
    eyebrow: "شريك مؤسس ومطور Full‑Stack",
    hero: <>أهلاً، أنا أحمد.<br />أبني <em>البزنس</em> داخل المنتج.</>,
    heroSub: "من الفكرة الأولى غير المرتبة إلى الأرقام التي تثبت نجاحها — أحوّل المنتجات الطموحة إلى أعمال واضحة، مفيدة، وقابلة للنمو.",
    pick: "اختر أحمد الذي تحتاجه",
    roles: [
      { title: "المطوّر", note: "Next.js · Node.js · Native", className: "orange", icon: "⌘" },
      { title: "الاستراتيجي", note: "منطق الأعمال · الأنظمة", className: "yellow", icon: "↗" },
      { title: "المصمّم", note: "UI/UX · وضوح المنتج", className: "pink", icon: "✦" },
      { title: "خبير النمو", note: "تحليلات · تجارب", className: "blue", icon: "◎" },
    ],
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
    capabilitiesTitle: "شريك واحد. رؤية أوسع.",
    capabilitiesSub: "أفضل قرارات المنتج نادراً ما تعيش داخل قسم واحد.",
    capabilities: ["تطوير Full‑Stack", "المنتج ومنطق الأعمال", "توجيه UI/UX", "التحليلات والتقارير", "تجارب النمو", "التوظيف وبناء الفريق", "حل المشكلات بسرعة", "أساليب عمل مدعومة بالذكاء الاصطناعي"],
    stackLabel: "أدوات البناء",
    stack: "Next.js / Node.js / TypeScript / React Native / AI",
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
  const t = copy[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [language, isArabic]);

  return (
    <main className={isArabic ? "arabic" : "english"}>
      <header className="topbar">
        <a href="#top" className="brand" aria-label="Ahmed Mansour, home">AHMED MANSOUR <span className="status-dot" /></a>
        <span className="available">{t.available}</span>
        <nav aria-label="Main navigation">
          {t.nav.map((item, index) => <a key={item} href={["#about", "#journey", "#capabilities", "#contact"][index]}>{item}</a>)}
          <button className="language" onClick={() => setLanguage(isArabic ? "en" : "ar")} aria-label="Switch language">{t.lang}</button>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.hero}</h1>
        <p className="hero-sub">{t.heroSub}</p>
        <a href="#about" className="oval-link">{t.pick}</a>
        <div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" /><div className="orbit-dot dot-c" />

        <div className="role-grid" aria-label="Ahmed's roles">
          {t.roles.map((role, index) => (
            <article className={`role-card ${role.className}`} key={role.title}>
              <span className="role-count">0{index + 1}</span>
              <div className="portrait" aria-hidden="true">
                <span className="portrait-icon">{role.icon}</span>
                <span className="head" /><span className="body" /><span className="arm left" /><span className="arm right" />
              </div>
              <h2>{role.title}</h2>
              <p>{role.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="thesis" id="about">
        <div className="section-number">01 — ABOUT</div>
        <div className="thesis-copy">
          <p className="kicker">{t.thesisKicker}</p>
          <h2>{t.thesis}</h2>
          <p>{t.thesisBody}</p>
        </div>
        <aside className="quote-card"><span>“</span>{t.statement}</aside>
      </section>

      <section className="journey" id="journey">
        <div className="journey-heading">
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

      <section className="capabilities" id="capabilities">
        <div className="capability-intro">
          <div className="section-number">03 — CAPABILITIES</div>
          <h2>{t.capabilitiesTitle}</h2>
          <p>{t.capabilitiesSub}</p>
        </div>
        <div className="capability-list">
          {t.capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<i>↗</i></div>)}
        </div>
        <div className="stack"><span>{t.stackLabel}</span><p>{t.stack}</p></div>
      </section>

      <section className="contact" id="contact">
        <p className="kicker">{t.contactKicker}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
        <a className="contact-button" href="mailto:hello@ahmedmansour.dev?subject=Let%27s%20build%20something%20together">{t.contactCta}<span>↗</span></a>
      </section>

      <footer><span>{t.footer}</span><span>© {new Date().getFullYear()}</span><a href="#top">↑ TOP</a></footer>
    </main>
  );
}
