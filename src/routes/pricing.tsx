import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Mentor Earnings — Construction Wizzards" },
      { name: "description", content: "Buy single courses or subscribe for access across mentors. Mentors earn 50% with protected payouts." },
      { property: "og:title", content: "Pricing & Mentor Earnings" },
      { property: "og:description", content: "Single courses, subscriptions and mentor revenue share." },
    ],
  }),
  component: Pricing,
});

const plans = [
  { n: "Single course", p: "Pay per course", d: ["Lifetime access to that course", "Certificate on completion", "7-day refund window"] },
  { n: "Monthly", p: "$29 / mo", d: ["All eligible courses", "Live class replays", "Forum & marketplace perks"], hot: true },
  { n: "Annual", p: "$249 / yr", d: ["Everything in Monthly", "Event & travel discounts", "Priority support"] },
];

function Pricing() {
  return (
    <main>
      <PageHead kicker="Pricing" title="Simple for learners. Fair for mentors." sub="Buy one course, or subscribe for access across many mentors." />
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.n} className={`card p-8 ${p.hot ? "border-2 border-primary" : ""}`}>
            {p.hot && <span className="chip bg-primary text-primary-foreground">Most popular</span>}
            <h3 className="mt-3 text-xl">{p.n}</h3>
            <p className="mt-2 font-display text-3xl">{p.p}</p>
            <ul className="mt-6 space-y-2 text-sm">{p.d.map((x) => <li key={x}>✔ {x}</li>)}</ul>
          </div>
        ))}
      </div>
      <section className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl">How mentor payouts work</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[["Sale", "Learner pays; funds held securely in escrow."], ["Day 0–7", "Refund window for the learner."], ["Day 14", "Hold ends; your 50% moves to your wallet."], ["Withdraw", "Request a payout; admin approves the release."]].map(([t, d], i) => (
            <div key={t} className="card p-6"><p className="font-display text-primary">STEP {i + 1}</p><h3 className="mt-2">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}
