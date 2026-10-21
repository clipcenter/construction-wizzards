import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { courses } from "@/lib/data";
import { useRole } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Construction Wizzards — Learn, Mentor & Trade in Construction" },
      { name: "description", content: "Courses, live classes, mentorship, a professional forum and a tools marketplace for the construction industry." },
      { property: "og:title", content: "Construction Wizzards" },
      { property: "og:description", content: "The professional learning and community platform for construction." },
    ],
  }),
  component: Index,
});

const features = [
  ["One account, two roles", "Switch between Learner and Mentor with a single tap."],
  ["Sell your expertise", "Recorded courses, live classes, webinars, workshops and seminars."],
  ["Protected payments", "Escrow, 7-day refunds and a transparent mentor wallet."],
  ["Verified professionals", "ID and qualification checks with visible badges."],
  ["Professional forum", "Share images, PDFs, voice notes and documents."],
  ["Tools marketplace", "Buy and sell new or used equipment and materials."],
];

function Index() {
  const { role } = useRole();
  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="Mentor teaching engineers on a construction site" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 md:py-36">
          <p className="chip bg-primary text-primary-foreground">Built by builders, for builders</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] md:text-7xl">
            Master the trade.<br /><span className="text-primary">Teach the next crew.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-80">
            Learn from verified engineers, earn by mentoring, and trade with construction pros worldwide — all in one account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {role === "learner" ? (
              <Link to="/courses" className="btn-primary">Browse courses</Link>
            ) : (
              <Link to="/admin" className="btn-primary">Open mentor studio</Link>
            )}
            <Link to="/forum" className="btn-ghost">Join the community</Link>
          </div>
          <div className="mt-14 flex gap-10 text-sm">
            {[["12k+", "Learners"], ["850", "Verified mentors"], ["40", "Countries"]].map(([n, l]) => (
              <div key={l}><p className="font-display text-3xl text-primary">{n}</p><p className="opacity-70">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl md:text-4xl">Everything on one site</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
          {features.map(([t, d], i) => (
            <div key={t} className="bg-card p-7">
              <p className="font-display text-primary">0{i + 1}</p>
              <h3 className="mt-3 text-lg">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl">Popular right now</h2>
          <Link to="/courses" className="font-semibold text-accent">All courses →</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {courses.slice(0, 3).map((c) => <CourseCard key={c.id} c={c} />)}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5">
        <div className="card overflow-hidden md:flex">
          <div className="hazard md:w-4 h-4 md:h-auto" />
          <div className="flex-1 p-10">
            <h2 className="text-3xl">Know something the site needs to know?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Switch to Mentor, get verified and publish your first course. You keep 50% of every sale, paid out after a 14-day hold.</p>
          </div>
          <div className="flex items-center p-10"><Link to="/pricing" className="btn-primary">See how it works</Link></div>
        </div>
      </section>
    </main>
  );
}

export function CourseCard({ c }: { c: (typeof courses)[number] }) {
  return (
    <article className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between"><span className="chip">{c.type}</span><span className="text-xs text-muted-foreground">{c.cat}</span></div>
      <h3 className="mt-4 text-lg leading-snug">{c.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{c.mentor} <span className="text-success">✔ verified</span></p>
      <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
        <span>★ {c.rating} · {c.students.toLocaleString()} learners</span>
        <span className="font-display text-lg">{c.price ? `$${c.price}` : "Free"}</span>
      </div>
    </article>
  );
}
