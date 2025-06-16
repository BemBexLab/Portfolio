import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";

// Define the type for the posts you fetch (just the fields you use)
type WPPost = { slug: string };

// API base URL for fetching posts by slug
const API_URL =
  "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts?slug=";

// Next.js App Router expects this for SSG/dynamic routes
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const res = await fetch(
    "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts"
  );
  const posts: WPPost[] = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}

// Correct prop typing for an App Router dynamic route page
export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const project = data[0];
  if (!project) return notFound();

  return <ProjectPageClient project={project} />;
}
