import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ARTICLES, getArticle } from "@/data/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: `${article.title} — Premier Mortgage`, description: article.dek };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <article>
        <header className="mx-auto max-w-5xl px-5 pb-12 pt-40 sm:px-8 sm:pt-48">
          <Link href="/news" className="text-sm font-medium text-muted transition-colors hover:text-ink">← Back to the blog</Link>
          <p className="eyebrow mt-10 text-gold">{article.category}</p>
          <h1 className="display mt-4 max-w-4xl text-4xl leading-tight sm:text-5xl md:text-6xl">{article.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{article.dek}</p>
          <div className="mt-8 flex items-center gap-3 border-t border-line pt-5 text-sm text-muted">
            <span>{article.date}</span><span aria-hidden>·</span><span>{article.readTime}</span>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
          <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[220px_1fr]">
            <aside className="h-fit lg:sticky lg:top-32">
              <p className="eyebrow text-gold">In this article</p>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                {article.sections.map((section, index) => <li key={section.heading}><a className="transition-colors hover:text-ink" href={`#section-${index + 1}`}>{String(index + 1).padStart(2, "0")} — {section.heading}</a></li>)}
              </ol>
            </aside>
            <div className="max-w-2xl">
              <div className="rounded-3xl bg-forest-deep p-7 text-paper sm:p-9">
                <p className="eyebrow text-gold-soft">The takeaway</p>
                <p className="display mt-4 text-2xl leading-snug sm:text-3xl">{article.takeaway}</p>
              </div>
              <div className="mt-12 space-y-14">
                {article.sections.map((section, index) => (
                  <section id={`section-${index + 1}`} key={section.heading} className="scroll-mt-32">
                    <span className="eyebrow text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="display mt-3 text-3xl">{section.heading}</h2>
                    <div className="mt-5 space-y-5 text-lg leading-8 text-ink-soft">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {section.points && <ul className="mt-6 space-y-3 rounded-2xl border border-line bg-card p-6 text-base text-ink-soft">{section.points.map((point) => <li key={point} className="flex gap-3"><span className="text-gold" aria-hidden>→</span><span>{point}</span></li>)}</ul>}
                  </section>
                ))}
              </div>
              <div className="mt-14 rounded-3xl border border-line bg-paper-2 p-7 sm:p-9">
                <p className="eyebrow text-gold">Talk through your options</p>
                <h2 className="display mt-3 text-2xl">Questions about your next step?</h2>
                <p className="mt-3 leading-relaxed text-muted">A Premier loan officer can help you understand how these ideas may apply to your goals.</p>
                <Link href="/find-a-loan-officer" className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-2">Find a loan officer →</Link>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-muted">This article is for general educational purposes and is not financial or legal advice. Loan programs, rates, terms, and eligibility requirements can change and vary by borrower.</p>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <div className="flex items-end justify-between gap-4"><div><p className="eyebrow text-gold">Keep reading</p><h2 className="display mt-3 text-3xl">More from Premier</h2></div><Link href="/news" className="text-sm font-medium text-ink">View all →</Link></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{related.map((item) => <Link href={`/news/${item.slug}`} key={item.slug} className="group rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md"><span className="eyebrow text-gold">{item.category}</span><h3 className="display mt-3 text-lg leading-snug">{item.title}</h3><span className="mt-6 inline-block text-sm text-muted group-hover:text-ink">Read article →</span></Link>)}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
