/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useRef, useState } from "react";
import { PremierHeader, PremierFooter, Arrow } from "./PremierSite";
import data from "@/data/team.json";
import shared from "./premier.module.css";
import styles from "./team.module.css";

type Person = typeof data.people[number];
const PAGE_SIZE = 24;
const categories = ["All people", "Loan officers", "Branch managers", "Division leaders", "Staff", "Leadership"];
const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const leadershipRank = (title: string) => title === "Chief Executive Officer" ? 0 : title === "Co-Founder" ? 1 : title === "President" ? 2 : title === "Chief Operating Officer" ? 3 : title === "Chief Innovation Officer" ? 4 : /^Chief\b/.test(title) ? 5 : 6;
const orderedLeadership = [
  ...data.leaders.map(person => ({ ...person, open: false })),
  { id: "open-coo", name: "Chief Operating Officer", title: "Chief Operating Officer", photo: "", category: "Leadership", nmls: "", phone: "", source: "", open: true },
  { id: "open-vp-wholesale", name: "VP, Wholesale", title: "VP, Wholesale", photo: "", category: "Leadership", nmls: "", phone: "", source: "", open: true },
  { id: "open-vp-frontline", name: "VP, Frontline", title: "VP, Frontline", photo: "", category: "Leadership", nmls: "", phone: "", source: "", open: true },
].sort((a, b) => leadershipRank(a.title) - leadershipRank(b.title));

function Portrait({ person, large = false }: { person: Person; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <div className={large ? styles.leaderPortrait : styles.avatar}>
    {person.photo && !failed ? <img src={person.photo} alt={person.name} loading="lazy" onError={() => setFailed(true)} /> : <span aria-hidden="true">{person.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>}
  </div>;
}

export function TeamPage({ directoryOnly = false }: { directoryOnly?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(directoryOnly ? "Loan officers" : "All people");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("az");
  const resultsHeading = useRef<HTMLParagraphElement>(null);
  const people = useMemo(() => {
    const existing = new Set(data.people.map(p => normalize(p.name)));
    return [...data.people, ...data.leaders.filter(p => !existing.has(normalize(p.name)))];
  }, []);
  const filtered = useMemo(() => people.filter(p => (category === "All people" || p.category === category) && normalize(`${p.name} ${p.title} ${p.nmls}`).includes(normalize(query.trim()))).sort((a, b) => sort === "za" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)), [people, category, query, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  function reset() { setQuery(""); setCategory("All people"); setPage(1); setSort("az"); }
  function changePage(next: number) { setPage(next); resultsHeading.current?.focus({ preventScroll: true }); resultsHeading.current?.scrollIntoView({ behavior: "instant", block: "start" }); }
  return <div className={shared.page}>
    <PremierHeader />
    <main id="main">
      {!directoryOnly && <><section className={styles.hero}>
        <div><span className={shared.eyebrow}>THE PEOPLE OF PREMIER</span><h1>Good people.<br /><span>Great things happen.</span></h1><p>Behind every home is a team that cares. Meet the people who bring the expertise, the follow-through, and the human connection.</p></div>
        <div className={styles.heroAside}><span className={styles.copperLine} /><p>One team.<br />A shared commitment<br />to getting you home.</p><a href="#directory">Find your person <Arrow /></a></div>
      </section>
      <nav className={styles.sectionNav} aria-label="Team page sections"><a href="#leadership">01 <span>Our leadership</span></a><a href="#directory">02 <span>Our people</span></a><a href="/join-pmr/">Build your future with us <Arrow diagonal /></a></nav>
      <section className={styles.leadership} id="leadership">
        <div className={styles.sectionTitle}><div><span className={shared.eyebrow}>LEADING WITH PURPOSE</span><h2>Experience at the top.<br /><span>People at the heart.</span></h2></div><p>Meet the leaders supporting our people, our customers, and the communities we call home.</p></div>
        <div className={styles.leaders}>{orderedLeadership.map(person => <article className={styles.leader} key={person.id}>{person.open ? <div className={`${styles.leaderPortrait} ${styles.openRole}`}><span>{person.id === "open-coo" ? "COO" : "VP"}</span><small>OPEN ROLE</small></div> : <Portrait person={person} large />}<h3>{person.name}</h3><p>{person.open ? "Open role" : person.title}</p></article>)}</div>
        <div className={styles.leadershipBottom}><span>{data.leaders.length} leaders. One shared vision.</span></div>
      </section>
      </>}
      {directoryOnly && <section className={styles.hero}><div><span className={shared.eyebrow}>FIND A LOAN OFFICER</span><h1>A real person.<br /><span>Your next step.</span></h1><p>Find someone to help you explore your home financing options. Search by name or NMLS number.</p></div></section>}
      <section className={styles.directory} id="directory">
        <div className={styles.sectionTitle}><div><span className={shared.eyebrow}>FIND YOUR CONNECTION</span><h2>Many talents.<br /><span>One Premier.</span></h2></div><p>Loan officers, branch managers, division leaders, and the people who keep it all moving. Find someone by name, role, or NMLS number.</p></div>
        <div className={styles.filters}>
          <label className={styles.search}><span>Search our team</span><div><svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6"/></svg><input type="search" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Name, role, or NMLS number" /></div></label>
          <label className={styles.roleFilter}><span>Team</span><select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
          <label className={styles.sortFilter}><span>Sort by</span><select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option></select></label>
        </div>
        <div className={styles.categoryButtons} aria-label="Filter people by team">{categories.slice(0, 5).map(c => <button key={c} type="button" aria-pressed={category === c} onClick={() => { setCategory(c); setPage(1); }}>{c}<span>{c === "All people" ? people.length : people.filter(p => p.category === c).length}</span></button>)}</div>
        <div className={styles.resultsBar}><p ref={resultsHeading} tabIndex={-1} aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? "profile" : "profiles"}{query ? ` matching “${query}”` : category !== "All people" ? ` · ${category}` : " in our directory"}</p><button type="button" onClick={reset}>Reset filters</button></div>
        {visible.length ? <div className={styles.peopleGrid}>{visible.map(person => <article className={styles.person} key={person.id}><div className={styles.personTop}><Portrait person={person}/><span className={styles.roleBadge}>{person.category}</span></div><h3>{person.name}</h3><p className={styles.personTitle}>{person.title}</p><p className={styles.nmls}>{person.nmls ? `NMLS #${person.nmls}` : "Premier Mortgage Resources"}</p><div className={styles.personLinks}>{person.phone && <a href={`tel:${person.phone.split(/ext/i)[0].replace(/\D/g, "")}`}>{person.phone}</a>}<a href={person.source} target="_blank" rel="noreferrer">{person.phone ? "PMR directory" : "About leadership"}<Arrow diagonal /></a></div></article>)}</div> : <div className={styles.empty}><h3>No matches just yet.</h3><p>Try a different name, NMLS number, or team.</p><button type="button" onClick={reset}>Show everyone <Arrow /></button></div>}
        {filtered.length > PAGE_SIZE && <nav className={styles.pagination} aria-label="Directory pagination"><span>Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}</span><div><button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} aria-label="Previous page">←</button>{Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1).map((n, i, numbers) => <span key={n}>{i > 0 && n - numbers[i - 1] > 1 && <span className={styles.ellipsis}>…</span>}<button onClick={() => changePage(n)} aria-current={n === currentPage ? "page" : undefined} aria-label={`Page ${n}`}>{n}</button></span>)}<button disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)} aria-label="Next page">→</button></div></nav>}
        <p className={styles.sourceNote}>Profiles from Premier’s public directory and leadership page, reviewed September 9, 2026. Some staff may not be listed. <a href="/find-a-loan-officer/">Need help finding someone? ↗</a></p>
      </section>
      <section className={styles.join}><div><span className={shared.eyebrow}>THERE’S ROOM FOR YOU HERE</span><h2>Your next chapter.<br />Our next teammate.</h2></div><a href="/join-pmr/" className={shared.primary}>Explore a future at Premier <Arrow diagonal /></a></section>
    </main>
    <PremierFooter />
  </div>;
}
