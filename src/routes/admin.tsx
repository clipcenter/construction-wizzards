import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHead } from "@/components/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Super Admin Dashboard — Construction Wizzards" },
      { name: "description", content: "Control users, mentors, courses, commissions, refunds, payouts and verification." },
      { property: "og:title", content: "Super Admin Dashboard" },
      { property: "og:description", content: "Platform control centre preview." },
    ],
  }),
  component: Admin,
});

const queue = [
  ["Verification", "Omar Haddad — MRICS certificate", "Pending"],
  ["Refund", "Order #4821 — BIM Workshop ($199)", "Day 3 of 7"],
  ["Payout", "Dr. Sarah Klein — $2,140", "Ready to release"],
  ["Dispute", "Marketplace: Leica TS07", "Open"],
  ["Moderation", "Forum post flagged ×3", "Review"],
];

function Admin() {
  const [commission, setCommission] = useState(50);
  return (
    <main>
      <PageHead kicker="Super Admin" title="Platform control centre" sub="Preview of the admin dashboard with sample figures." />
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-5 md:grid-cols-4">
          {[["Revenue (30d)", "$184,320"], ["Active subscribers", "3,412"], ["Pending payouts", "$41,870"], ["Open disputes", "7"]].map(([l, v]) => (
            <div key={l} className="card p-6"><p className="text-sm text-muted-foreground">{l}</p><p className="mt-2 font-display text-2xl">{v}</p></div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_340px]">
          <div className="card">
            <h3 className="border-b p-5">Action queue</h3>
            {queue.map(([k, d, s]) => (
              <div key={d} className="flex items-center gap-4 border-b p-5 last:border-0 text-sm">
                <span className="chip w-24 justify-center">{k}</span>
                <span className="flex-1">{d}</span>
                <span className="text-muted-foreground">{s}</span>
                <button className="font-semibold text-accent">Review</button>
              </div>
            ))}
          </div>
          <div className="card h-fit p-6">
            <h3>Commission split</h3>
            <input type="range" min={0} max={90} value={commission} onChange={(e) => setCommission(+e.target.value)} className="mt-5 w-full accent-primary" />
            <div className="mt-3 flex justify-between text-sm"><span>Admin {commission}%</span><span>Mentor {100 - commission}%</span></div>
            <p className="mt-4 text-xs text-muted-foreground">Refund window: 7 days · Payout hold: 14 days</p>
          </div>
        </div>
      </div>
    </main>
  );
}
