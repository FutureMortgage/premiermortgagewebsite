import Link from "next/link";
import shared from "./premier.module.css";
import s from "./services.module.css";

const testimonials = [
  ["Jacy Pool", "740544138"],
  ["Chris Bruce", "740544226"],
  ["Oliver AhMu", "740543951"],
  ["Eddie Johnson", "740544174"],
  ["Shannon Huyg", "740543841"],
  ["Kristin Flora", "740543653"],
  ["Jess Davies", "740544061"],
];

export function JoinExtras() {
  return <>
    <section className={s.coverage} id="coverage" aria-labelledby="coverage-heading">
      <div className={s.coverageNumber}>50<span>STATES</span></div>
      <div><span className={shared.eyebrow}>ROOM TO GROW</span><h2 id="coverage-heading">Your ambition.<br />A nationwide possibility.</h2><p>Licensed or pending in all 50 states.</p><p className={s.note}>Licensing status and product availability vary. PMR’s published list includes 49 states and Washington, DC; New York is not listed. Confirm current availability before originating a loan.</p><Link href="/state-licensing" className={shared.secondary}>Explore state licenses ↗</Link></div>
    </section>
    <section className={s.testimonials} id="testimonials" aria-labelledby="testimonials-heading">
      <span className={shared.eyebrow}>HEAR IT FROM OUR PEOPLE</span><h2 id="testimonials-heading">Real experiences.<br /><span>A Premier welcome.</span></h2><p>Hear mortgage professionals talk about their experience joining Premier.</p>
      <div className={s.videoGrid}>{testimonials.map(([name,id])=><article className={s.videoCard} key={id}><iframe src={`https://player.vimeo.com/video/${id}?dnt=1`} title={`${name} discusses joining Premier Mortgage Resources`} loading="lazy" allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen /><div><h3>{name}</h3><p>The Premier onboarding experience</p><a href={`https://player.vimeo.com/video/${id}?dnt=1`} target="_blank" rel="noreferrer">Open video ↗</a></div></article>)}</div>
    </section>
  </>;
}
