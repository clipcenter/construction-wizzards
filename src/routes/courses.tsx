import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { courses } from "@/lib/data";
import { PageHead } from "@/components/site";
import { CourseCard } from "./index";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Construction Wizzards" },
      { name: "description", content: "Recorded courses, live classes, webinars, workshops and seminars from verified construction mentors." },
      { property: "og:title", content: "Construction Courses" },
      { property: "og:description", content: "Learn from verified construction mentors." },
    ],
  }),
  component: Courses,
});

const types = ["All", "Recorded", "Live class", "Webinar", "Workshop", "Offline seminar"];

function Courses() {
  const [t, setT] = useState("All");
  const [q, setQ] = useState("");
  const list = courses.filter((c) => (t === "All" || c.type === t) && c.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <main>
      <PageHead kicker="Learning marketplace" title="Courses from people who've built it" sub="Enroll, track progress and earn downloadable certificates." />
      <div className="mx-auto max-w-7xl px-5 py-10">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" className="w-full rounded-md border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <div className="mt-4 flex flex-wrap gap-2">
          {types.map((x) => (
            <button key={x} onClick={() => setT(x)} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${t === x ? "bg-ink text-ink-foreground" : "bg-card"}`}>{x}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {list.map((c) => <CourseCard key={c.id} c={c} />)}
          {!list.length && <p className="text-muted-foreground">No courses match.</p>}
        </div>
      </div>
    </main>
  );
}
