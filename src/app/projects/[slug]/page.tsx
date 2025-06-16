import { notFound } from "next/navigation";
import BackButton from "./BackButton";

/* eslint-disable @next/next/no-img-element */

type ProjectACF = {
  project_image?: { url?: string };
  introduction?: string;
  genesis_of_collaboration?: string;
  conceptualization?: string;
  design_symphony?: string;
  development_overture?: string;
  launch_and_beyond?: string;
  conclusion?: string;
  [key: string]: string | number | boolean | { url?: string } | undefined;
};

type Project = {
  id: number | string;
  slug: string;
  title: { rendered: string };
  acf: ProjectACF;
};

const API_URL =
  "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts?slug=";

export async function generateStaticParams() {
  const res = await fetch(
    "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts"
  );
  const posts: Project[] = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}

// The important fix is here:
export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const data: Project[] = await res.json();
  const project = data[0];
  if (!project) return notFound();

  const imageUrl = project.acf?.project_image?.url || "/default.jpg";
  const acf = project.acf;

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center mt-[80px]">
      {/* Title */}
      <h1
        className="text-2xl sm:text-3xl md:text-5xl font-bold max-w-4xl text-left w-full mb-[50px]"
        style={{ color: "#072d7f" }}
      >
        {project.title.rendered}
      </h1>

      {/* Project Image */}
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl mb-12">
        <img
          src={imageUrl}
          alt={project.title.rendered}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Project Content Sections */}
      <div className="w-full max-w-3xl space-y-12 text-lg sm:text-xl text-black">
        {acf.introduction && (
          <Section title="Introduction" text={acf.introduction} />
        )}
        {acf.genesis_of_collaboration && (
          <Section
            title="Genesis Of Collaboration"
            text={acf.genesis_of_collaboration}
          />
        )}
        {acf.conceptualization && (
          <Section title="Conceptualization" text={acf.conceptualization} />
        )}
        {acf.design_symphony && (
          <Section title="Design Symphony" text={acf.design_symphony} />
        )}
        {acf.development_overture && (
          <Section
            title="Development Overture"
            text={acf.development_overture}
          />
        )}
        {acf.launch_and_beyond && (
          <Section title="Launch And Beyond" text={acf.launch_and_beyond} />
        )}
        {acf.conclusion && <Section title="Conclusion" text={acf.conclusion} />}
      </div>

      {/* Back Button */}
      <div className="mt-16 text-center">
        <BackButton />
      </div>
    </div>
  );
}

type SectionProps = { title: string; text: string };

function Section({ title, text }: SectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold" style={{ color: "#072d7f" }}>
        {title}
      </h2>
      <p className="text-lg leading-relaxed whitespace-pre-line text-black">
        {text}
      </p>
    </div>
  );
}
