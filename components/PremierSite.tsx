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
      <button ref={menuButton} className={styles.menuButton} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)} onKeyDown={e => { if (e.key === "Escape") setMenuOpen(false); }}>{menuOpen ? "Close" : "Menu"}</button>
    </header>
  </>;
}

export function PremierFooter() {
  return <footer className={styles.footer}><div className={styles.footerTop}><div><Mark /><p>Home financing.<br />Human connection.</p><a href="tel:+12086290606">(208) 629-0606</a></div><div><h3>Your home</h3><Link href="/#financing">Buy a home</Link><Link href="/#financing">Refinance</Link><Link href="/#estimate">Payment calculator</Link><a href={`${PMR}/find-a-loan-officer/`}>Find a loan officer</a></div><div><h3>Our company</h3><Link href="/team">Our team</Link><a href={`${PMR}/our-mission/`}>About Premier</a><a href={`${PMR}/join-pmr/`}>Join PMR</a><a href={`${PMR}/contact-us/`}>Contact us</a></div><div><h3>Here to help</h3><a href={`${PMR}/make-a-payment/`}>Make a payment</a><a href={`${PMR}/state-licensing/`}>State licensing</a><a href={`${PMR}/privacy-policy/`}>Privacy policy</a><a href={`${PMR}/legal/`}>Legal</a></div></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Premier Mortgage Resources, LLC</span><span>NMLS #1169 · Equal Housing Opportunity</span></div><p className={styles.disclaimer}>3363 E. Presidential Dr #200, Meridian, ID 83642. All loans are subject to credit and underwriting approval. Programs, rates, and terms may change without notice. Not a commitment to lend. Some products may not be available in all states and restrictions apply. Premier Mortgage Resources is not affiliated with a government agency. <a href="https://www.nmlsconsumeraccess.org/">NMLS Consumer Access ↗</a></p></footer>;
}

export function PremierSite() {
  return <div className={styles.page}>
    <PremierHeader />
    <main id="main">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <a href="#journey" className={styles.announcement}><span className={styles.dot} /><strong>Your next chapter starts here</strong><span className={styles.announcementArrow}>↗</span></a>
        <h1 id="hero-heading">A place to call home.<br />A team to <span>get you there.</span></h1>
        <p>Big plans. First keys. A fresh start.<br />Home financing built around your life, with people by your side.</p>
        <div className={styles.actions}><a href={`${PMR}/find-a-loan-officer/`} className={styles.primary}>Let’s get you home <Arrow /></a><a href="#financing" className={styles.secondary}>Explore your options <Arrow /></a></div>
        <span className={styles.heroNote}>Your goals. Your pace. Your Premier team.</span>
      </section>
      <section className={styles.previewGrid} aria-label="Your next move">
        <article className={`${styles.previewCard} ${styles.homeCard}`}>
          <HomepageVideo />
          <a href="#financing" className={styles.previewLabel}><div><h2>Make yourself at home.</h2><p>First home. Next home. Your home.</p></div><Arrow diagonal /></a>
        </article>
        <a href="#journey" className={`${styles.previewCard} ${styles.darkCard}`}>
          <div className={styles.processVisual}><div className={styles.visualEyebrow}><span>THE PATH TO YOUR KEYS</span><span>01 — 04</span></div>{["Meet your loan officer", "Explore your options", "Move your loan forward", "Welcome home"].map((s, i) => <div className={styles.miniStep} key={s}><span className={styles.stepCheck}>{i === 3 ? "↗" : "✓"}</span><span>{s}</span><span className={styles.stepNumber}>0{i + 1}</span></div>)}</div>
          <div className={styles.previewLabel}><div><h2>More clarity. Less complexity.</h2><p>A real person, every step of the way.</p></div><Arrow diagonal /></div>
        </a>
        <a href="#estimate" className={styles.previewCard}>
          <div className={styles.numberVisual}><span className={styles.visualEyebrow}>A LITTLE PLANNING. A BIG POSSIBILITY.</span><div className={styles.figure}>Your home.<br /><span>Your numbers.</span></div><div className={styles.numberBars} aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} />)}</div><span className={styles.visualCaption}>Make room for the life you want.</span></div>
          <div className={styles.previewLabel}><div><h2>Find your starting point.</h2><p>Explore an estimated monthly payment.</p></div><Arrow diagonal /></div>
        </a>
      </section>
      <div className={styles.trustLine}><span>PREMIER MORTGAGE RESOURCES</span><span>People-first lending</span><span>Local loan officers</span><span>Equal Housing Opportunity</span><span>NMLS #1169</span></div>
      <section className={styles.section} id="financing"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>BUILT AROUND YOU</span><h2>Different dreams.<br /><span>The same commitment.</span></h2></div><p>A mortgage is personal. Your financing should be, too. Let’s find a path that fits where you are—and where you want to go.</p></div><div className={styles.options}>
        {[["01", "Buy a home", "A first step. A new beginning.", "From your first questions to your final signatures, get guidance for your next move."], ["02", "Refinance your home", "New possibilities. Familiar address.", "Explore changing your loan term, your monthly payment, or how you use your home’s equity."], ["03", "Your first home", "You don’t have to know it all.", "Start with the basics. Talk through your budget, down payment, and the homebuying process."]].map(([n, title, subtitle, body]) => <a href={`${PMR}/find-a-loan-officer/`} className={styles.option} key={n}><div className={styles.optionTop}><span>{n}</span><Arrow diagonal /></div><h3>{title}</h3><strong>{subtitle}</strong><p>{body}</p><span className={styles.optionLink}>Let’s talk about your options <Arrow /></span></a>)}
      </div></section>
      <section className={styles.journey} id="journey"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>THE PREMIER DIFFERENCE</span><h2>It’s more than a loan.<br /><span>It’s your life.</span></h2></div><p>You bring the vision. We bring people who care about helping you get there. A real conversation is where it all begins.</p></div><div className={styles.values}>{[["Vision", "See what’s possible.", "Make a plan for the home and the future you have in mind."], ["Hustle", "Keep moving forward.", "Work with a team that helps you understand what comes next."], ["Grit", "Find a way through.", "Talk through the questions and challenges with your loan officer."], ["Execute", "Bring it home.", "Move toward closing with guidance on the details that matter."]].map(([value, heading, body], i) => <div key={value}><span className={styles.valueNumber}>0{i + 1} <span> / {value}</span></span><h3>{heading}</h3><p>{body}</p></div>)}</div></section>
      <section className={styles.section} id="estimate"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>LET’S TALK NUMBERS</span><h2>A clearer picture.<br /><span>A confident next step.</span></h2></div><p>Start with an estimate. Your Premier loan officer can help you understand the full picture and explore your options.</p></div><MortgageCalculator /></section>
      <section className={styles.section} id="resources"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>A LITTLE KNOWLEDGE GOES A LONG WAY</span><h2>Make your next move<br /><span>an informed one.</span></h2></div></div><div className={styles.resourceGrid}>{[["Getting started", "Your homebuying questions, answered.", "Find a local loan officer who can help you make sense of the process.", "/find-a-loan-officer/"], ["The people behind Premier", "Get to know your home team.", "Learn about the people and purpose behind Premier Mortgage Resources.", "/our-mission/"], ["Grow with us", "Build something that matters.", "Explore a career helping people take their next step toward home.", "/join-pmr/"]].map(([label, title, body, href]) => <a href={`${PMR}${href}`} key={title} className={styles.resource}><span className={styles.eyebrow}>{label}</span><h3>{title}</h3><p>{body}</p><Arrow diagonal /></a>)}</div></section>
      <section className={styles.closing}><span className={styles.eyebrow}>HOME STARTS WITH A CONVERSATION</span><h2>Let’s bring your<br /><span>next chapter home.</span></h2><p>A place for your plans. A team in your corner.</p><div className={styles.actions}><a href={`${PMR}/find-a-loan-officer/`} className={styles.primary}>Find your loan officer <Arrow diagonal /></a><a href="tel:+12086290606" className={styles.secondary}>Talk to our team <Arrow /></a></div></section>
    </main>
    <PremierFooter />
  </div>;
}
