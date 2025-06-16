// src/app/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";

const API_URL =
  "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts?slug=";

export async function generateStaticParams() {
  const res = await fetch(
    "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts"
  );
  const posts = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ProjectPage({ params }) {
  const res = await fetch(`${API_URL}${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const project = data[0];
  if (!project) return notFound();

  return <ProjectPageClient project={project} />;
}
