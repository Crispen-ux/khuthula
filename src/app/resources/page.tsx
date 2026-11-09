import type { Metadata } from "next";
import Link from "next/link";
import { resourcePosts } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Articles, guides and insights on construction, project management, electrical, solar and maintenance.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const categories = Array.from(new Set(resourcePosts.map((p) => p.category)));

  return (
    <>
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-red">Resources</p>
          <h1 className="mt-3 text-4xl font-bold">Resource hub</h1>
          <p className="mt-4 max-w-2xl text-base text-grey-light">
            Practical guides and insights to help you plan, deliver and maintain
            construction and technical projects.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-grey-light bg-white px-3 py-1 text-xs font-medium text-charcoal"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourcePosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-lg border border-grey-light bg-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-red">
                {post.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-charcoal">
                <Link href={`/resources/${post.slug}`} className="hover:text-red">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-grey">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-grey">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}