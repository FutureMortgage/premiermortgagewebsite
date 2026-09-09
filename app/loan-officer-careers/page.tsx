import type { Metadata } from "next";
import Link from "next/link";
import { PremierHeader, PremierFooter, Arrow } from "@/components/PremierSite";
import { JoinExtras } from "@/components/JoinExtras";
import shared from "@/components/premier.module.css";
import s from "@/components/services.module.css";

export const metadata: Metadata = { title: "Loan Officer Careers — Premier Mortgage Resources", description: "Build your loan officer career with Premier’s technology, operations, marketing support, and employee-ownership culture." };
const apply = "https://jobs.dayforcehcm.com/en-US/pmrloans/CANDIDATEPORTAL/jobs/715";

export default function Page() {
  return <div className={shared.page}><PremierHeader /><main id="main" className={`${s.main} ${s.recruiting}`}>
    <div className={s.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/careers">Careers</Link><span>/</span><span>Loan officers</span></div>
    <header className={`${s.hero} ${s.recruitHero}`}><span className={shared.eyebrow}>FOR LOAN OFFICERS</span><h1>Your relationships.<br /><span>More room to grow.</span></h1><p>You bring the drive and the human connection. Discover a team, tools, and support built to help you do your best work.</p><div className={s.recruitActions}><a href={apply} className={shared.primary}>Explore the loan officer role <Arrow diagonal /></a><a href="#support">See what’s behind you <Arrow /></a></div></header>
    <nav className={s.recruitNav} aria-label="Loan officer careers sections"><a href="#support">/01 <span>Your support</span></a><a href="#transition">/02 <span>Your next move</span></a><a href="#testimonials">/03 <span>Their experience</span></a><a href="#apply">/04 <span>Let’s connect</span></a></nav>
    <section id="support" className={s.aboutSteps}><span className={shared.eyebrow}>BUILD RELATIONSHIPS. BRING PEOPLE HOME.</span><h2>Independent ambition.<br />A team behind it.</h2><div>{[["Operations","Work with the people supporting your files, so you can focus on your borrowers and referral relationships."],["Marketing","A full-service marketing department supports how you show up and communicate with your market."],["Technology","Explore PMR’s technology tools and Xcelerate system as part of your recruiting conversation."]].map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className={s.aboutFilm}><div><span className={shared.eyebrow}>GET TO KNOW PREMIER</span><h2>A different perspective<br />on your next chapter.</h2><p>See the people and purpose behind PMR in our company recruiting film.</p><a href="https://player.vimeo.com/video/681660681?dnt=1" target="_blank" rel="noreferrer">Open the film ↗</a></div><iframe src="https://player.vimeo.com/video/681660681?dnt=1" title="Premier Mortgage Resources recruiting film" loading="lazy" allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen /></section>
    <section id="transition" className={s.aboutSteps}><span className={shared.eyebrow}>A MOVE WORTH TALKING THROUGH</span><h2>Your next step.<br />With a clearer picture.</h2><div>{[["Tell us what matters","Bring your goals, market experience, and questions about your next role."],["Explore the fit","Discuss products, pricing, compensation, licensing, and the support available to your business."],["Plan your transition","Talk through onboarding, systems, and timing with the Premier team before making your move."]].map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <JoinExtras />
    <section id="apply" className={s.support}><div><span className={shared.eyebrow}>LET’S BUILD WHAT’S NEXT</span><h2>Bring your ambition to Premier.</h2><p>See the current role and submit your application through PMR’s hiring portal.</p></div><div className={s.aboutLinks}><a href={apply} className={shared.primary}>View role & apply <Arrow diagonal /></a><Link href="/careers" className={shared.secondary}>Explore all careers <Arrow /></Link></div></section>
  </main><PremierFooter /></div>;
}
