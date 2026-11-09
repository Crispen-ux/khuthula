import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resourcePosts } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export function generateStaticParams() {
  return resourcePosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = resourcePosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/resources/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.websiteUrl}/resources/${post.slug}`,
      type: "article",
    },
  };
}

export default async function ResourcePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = resourcePosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-red">
            {post.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{post.title}</h1>
          <p className="mt-4 text-sm text-grey-light">
            {post.date} · {post.readTime}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {post.content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="mt-8 text-2xl font-bold text-charcoal">
                {block.text}
              </h2>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="mt-4 list-disc space-y-2 pl-6 text-base text-grey">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="mt-4 text-base leading-relaxed text-grey">
              {block.text}
            </p>
          );
        })}

        <div className="mt-10 border-t border-grey-light pt-6">
          <Link href="/resources" className="text-sm font-semibold text-red hover:underline">
            ← Back to resources
          </Link>
        </div>
      </article>
    </>
  );
}