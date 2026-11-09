import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Construction, project management, electrical, solar, maintenance and consulting services offered by Kuthula Consulting & Projects.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-red">Services</p>
          <h1 className="mt-3 text-4xl font-bold">Construction and project services</h1>
          <p className="mt-4 max-w-2xl text-base text-grey-light">
            A focused set of construction and technical services for commercial,
            industrial and residential clients.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="flex flex-col">
              <ServiceCard icon={s.icon} title={s.title} description={s.description} />
              <ul className="mt-3 space-y-1 px-1 text-sm text-grey">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-grey-light/40 p-8 text-center">
          <h2 className="text-2xl font-bold text-charcoal">Need a tailored scope?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-grey">
            Tell us about your project and we will propose the right combination of
            services.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-md bg-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}