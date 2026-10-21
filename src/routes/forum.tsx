import { createFileRoute } from "@tanstack/react-router";
import { topics } from "@/lib/data";
import { PageHead } from "@/components/site";

export const Route = createFileRoute("/forum")({
  head: () => ({
    meta: [
      { title: "Forum — Construction Wizzards" },
      { name: "description", content: "Ask questions and share drawings, PDFs and voice notes with construction professionals." },
      { property: "og:title", content: "Construction Professional Forum" },
      { property: "og:description", content: "Discuss, share and learn with the community." },
    ],
  }),
  component: Forum,
});

function Forum() {
  return (
    <main>
      <PageHead kicker="Community" title="The site office, online" sub="Ask, answer and share images, PDFs, voice messages and documents." />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          <button className="btn-primary">+ New topic</button>
          {topics.map((t) => (
            <div key={t.title} className="card flex items-center gap-4 p-5">
              <div className="flex-1">
                <h3 className="text-base">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.author} · <span className="chip">{t.tag}</span> · 📎 {t.attach}</p>
              </div>
              <p className="text-center"><span className="font-display text-xl">{t.replies}</span><br /><span className="text-xs text-muted-foreground">replies</span></p>
            </div>
          ))}
        </div>
        <aside className="card h-fit p-6">
          <h3>Groups & events</h3>
          {["Women in Construction", "Gulf Site Engineers", "BIM Users Circle", "Annual Wizzards Meetup — Lisbon"].map((g) => (
            <p key={g} className="mt-3 border-t pt-3 text-sm">{g}</p>
          ))}
        </aside>
      </div>
    </main>
  );
}
