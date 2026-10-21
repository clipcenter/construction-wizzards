import { createFileRoute } from "@tanstack/react-router";
import { listings } from "@/lib/data";
import { PageHead } from "@/components/site";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Construction Wizzards" },
      { name: "description", content: "Buy and sell new or used construction tools, equipment and materials." },
      { property: "og:title", content: "Construction Tools Marketplace" },
      { property: "og:description", content: "Trade tools and equipment with verified members." },
    ],
  }),
  component: Market,
});

function Market() {
  return (
    <main>
      <PageHead kicker="Community marketplace" title="Tools, gear & materials" sub="List, buy and sell new or used equipment with verified members." />
      <div className="mx-auto max-w-7xl px-5 py-10">
        <button className="btn-primary">+ List an item</button>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <div key={l.title} className="card p-6">
              <div className="hazard h-2 w-12 rounded" />
              <h3 className="mt-4 text-lg">{l.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{l.cond} · {l.loc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-xl">${l.price.toLocaleString()}</span>
                <button className="text-sm font-semibold text-accent">Message seller →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
