/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MortgageCalculator } from "./MortgageCalculator";
import { HomepageVideo } from "./HomepageVideo";
import styles from "./premier.module.css";

const PMR = "";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Mark() {
  return <img src="/premier-logo.png" alt="Premier Mortgage Resources" width="184" height="40" className={styles.logo} />;
}

export function PremierHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return <>
    <a className={styles.skip} href="#main">Skip to content</a>
    <header className={styles.header}>
      <Link href="/#main" aria-label="Premier Mortgage Resources home"><Mark /></Link>
      <nav aria-label="Main navigation" className={`${styles.navigation} ${menuOpen ? styles.menuOpen : ""}`} id="main-navigation">
        <Link href="/#financing" onClick={() => setMenuOpen(false)}>Home loans</Link>
        <Link href="/#journey" onClick={() => setMenuOpen(false)}>The Premier difference</Link>
        <Link href="/team" onClick={() => setMenuOpen(false)}>Our team</Link>
        <Link href="/careers" onClick={() => setMenuOpen(false)}>Careers</Link>
        <Link href="/#resources" onClick={() => setMenuOpen(false)}>Resources</Link>
        <a href={`${PMR}/make-a-payment/`} className={styles.payment}>Make a payment <Arrow diagonal /></a>
        <a href={`${PMR}/find-a-loan-officer/`} className={styles.primary}>Find a loan officer <Arrow diagonal /></a>
      </nav>
      <button ref={menuButton} className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)} onKeyDown={e => { if (e.key === "Escape") setMenuOpen(false); }}>
        <span className={styles.menuIcon} aria-hidden="true"><span /><span /><span /></span>
      </button>
    </header>
  </>;
}

export function PremierFooter() {
  return <footer className={styles.footer}><div className={styles.footerTop}><div><Mark /><p>Home financing.<br />Human connection.</p><a href="tel:+12086290606">(208) 629-0606</a></div><div><h3>Your home</h3><Link href="/#financing">Buy a home</Link><Link href="/#financing">Refinance</Link><Link href="/#estimate">Payment calculator</Link><a href={`${PMR}/find-a-loan-officer/`}>Find a loan officer</a></div><div><h3>Our company</h3><Link href="/team">Our team</Link><a href={`${PMR}/our-mission/`}>About Premier</a><a href={`${PMR}/join-pmr/`}>Join PMR</a><a href={`${PMR}/contact-us/`}>Contact us</a></div><div><h3>Here to help</h3><a href={`${PMR}/make-a-payment/`}>Make a payment</a><a href={`${PMR}/state-licensing/`}>State licensing</a><a href={`${PMR}/privacy-policy/`}>Privacy policy</a><a href={`${PMR}/legal/`}>Legal</a></div></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Premier Mortgage Resources, LLC dba Premier</span><span>NMLS #1169 · Equal Housing Opportunity</span></div><p className={styles.disclaimer}>3363 E. Presidential Dr #200, Meridian, ID 83642. All loans are subject to credit and underwriting approval. Programs, rates, and terms may change without notice. Not a commitment to lend. Some products may not be available in all states and restrictions apply. Premier Mortgage Resources is not affiliated with a government agency. <a href="https://www.nmlsconsumeraccess.org/">NMLS Consumer Access ↗</a></p></footer>;
}

export function PremierSite() {
  return <div className={styles.page}>
    <PremierHeader />
    <main id="main">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <a href="#journey" className={styles.announcement}><span className={styles.dot} /><strong>Home financing, made more personal</strong><span className={styles.announcementArrow}>↗</span></a>
        <h1 id="hero-heading">Your home starts here.<br />We’ll help you <span>get there.</span></h1>
        <p>Buying, refinancing, or just exploring?<br />Get clear answers and a real loan officer to guide you from start to finish.</p>
        <div className={styles.actions}><a href={`${PMR}/find-a-loan-officer/`} className={styles.primary}>Talk with a loan officer <Arrow /></a><a href="#financing" className={styles.secondary}>See your options <Arrow /></a></div>
        <span className={styles.heroNote}>Clear answers. Personal guidance. A team in your corner.</span>
      </section>
      <section className={styles.previewGrid} aria-label="Your next move">
        <article className={`${styles.previewCard} ${styles.homeCard}`}>
          <HomepageVideo />
          <a href="#financing" className={styles.previewLabel}><div><h2>Start your home journey.</h2><p>Guidance for buying, refinancing, and what comes next.</p></div><Arrow diagonal /></a>
        </article>
        <a href="#journey" className={`${styles.previewCard} ${styles.darkCard}`}>
          <div className={styles.processVisual}><div className={styles.visualEyebrow}><span>THE PATH TO YOUR KEYS</span><span>01 — 04</span></div>{["Meet your loan officer", "Explore your options", "Move your loan forward", "Welcome home"].map((s, i) => <div className={styles.miniStep} key={s}><span className={styles.stepCheck}>{i === 3 ? "↗" : "✓"}</span><span>{s}</span><span className={styles.stepNumber}>0{i + 1}</span></div>)}</div>
          <div className={styles.previewLabel}><div><h2>A simpler path to home.</h2><p>Know what’s next, with a real person to help.</p></div><Arrow diagonal /></div>
        </a>
        <a href="#estimate" className={styles.previewCard}>
          <div className={styles.numberVisual}><span className={styles.visualEyebrow}>START WITH WHAT FITS YOUR BUDGET.</span><div className={styles.figure}>Your price.<br /><span>Your payment.</span></div><div className={styles.numberBars} aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} />)}</div><span className={styles.visualCaption}>See an estimate in seconds.</span></div>
          <div className={styles.previewLabel}><div><h2>Estimate your monthly payment.</h2><p>Adjust the numbers to fit your plans.</p></div><Arrow diagonal /></div>
        </a>
      </section>
      <div className={styles.trustLine}><span>PREMIER MORTGAGE RESOURCES</span><span>Guidance at every step</span><span>Local loan officers</span><span>Equal Housing Opportunity</span><span>NMLS #1169</span></div>
      <section className={styles.section} id="financing"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>HOME LOANS FOR REAL LIFE</span><h2>One goal.<br /><span>A loan that fits your life.</span></h2></div><p>Tell us what you’re working toward. We’ll explain your choices, answer your questions, and help you find a path forward.</p></div><div className={styles.options}>
        {[["01", "Buy a home", "Move forward with a clear plan.", "Understand your financing options and get guidance from your first question through closing day."], ["02", "Refinance your home", "See if a new loan makes sense.", "Explore ways to change your term or payment, or use available equity for what matters next."], ["03", "Buy your first home", "You don’t have to figure it out alone.", "Learn what to expect, understand your budget, and talk through down payment options with a real person."]].map(([n, title, subtitle, body]) => <a href={`${PMR}/find-a-loan-officer/`} className={styles.option} key={n}><div className={styles.optionTop}><span>{n}</span><Arrow diagonal /></div><h3>{title}</h3><strong>{subtitle}</strong><p>{body}</p><span className={styles.optionLink}>Talk with a loan officer <Arrow /></span></a>)}
      </div></section>
      <section className={styles.journey} id="journey"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>THE PREMIER DIFFERENCE</span><h2>Real guidance.<br /><span>From hello to home.</span></h2></div><p>Your loan officer will listen first, explain the details clearly, and help keep your home financing moving.</p></div><div className={styles.values}>{[["Vision", "Start with your goals.", "We take time to understand the home, budget, and future you have in mind."], ["Hustle", "Keep things moving.", "We stay responsive and help you understand what’s needed at every step."], ["Grit", "Work through the details.", "When questions or challenges come up, your loan officer helps you find a way forward."], ["Execute", "Get to closing with confidence.", "We keep an eye on the details and guide you through the final steps."]].map(([value, heading, body], i) => <div key={value}><span className={styles.valueNumber}>0{i + 1} <span> / {value}</span></span><h3>{heading}</h3><p>{body}</p></div>)}</div></section>
      <section className={styles.section} id="estimate"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>PLAN YOUR PAYMENT</span><h2>See what home may<br /><span>fit your budget.</span></h2></div><p>Adjust the numbers to estimate principal and interest. When you’re ready, a Premier loan officer can help you understand the full monthly picture.</p></div><MortgageCalculator /></section>
      <section className={styles.section} id="resources"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>HELPFUL NEXT STEPS</span><h2>Everything you need<br /><span>to keep moving.</span></h2></div></div><div className={styles.resourceGrid}>{[["Talk with an expert", "Get answers from a local loan officer.", "Connect with someone who can explain your options and help you choose a next step.", "/find-a-loan-officer/"], ["Meet Premier", "Know who’s on your side.", "Learn about the people and purpose behind Premier Mortgage Resources.", "/our-mission/"], ["Careers at Premier", "Help more people find home.", "Explore a career where your work can make an important moment feel simpler.", "/join-pmr/"]].map(([label, title, body, href]) => <a href={`${PMR}${href}`} key={title} className={styles.resource}><span className={styles.eyebrow}>{label}</span><h3>{title}</h3><p>{body}</p><Arrow diagonal /></a>)}</div></section>
      <section className={styles.closing}><span className={styles.eyebrow}>YOUR NEXT STEP CAN BE SIMPLE</span><h2>Ready to talk about<br /><span>your home plans?</span></h2><p>Connect with a real person who’s ready to listen and help.</p><div className={styles.actions}><a href={`${PMR}/find-a-loan-officer/`} className={styles.primary}>Find a loan officer <Arrow diagonal /></a><a href="tel:+12086290606" className={styles.secondary}>Call Premier <Arrow /></a></div></section>
    </main>
    <PremierFooter />
  </div>;
}
