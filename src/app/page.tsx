import Link from "next/link";
import {
  Building2,
  ClipboardCheck,
  Zap,
  Sun,
  Compass,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { services as allServices } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const services = allServices.slice(0, 6);

const approach = [
  { step: "01", title: "Consultation", text: "Understand requirements, constraints and objectives." },
  { step: "02", title: "Planning", text: "Define scope, programme, resources and delivery strategy." },
  { step: "03", title: "Execution", text: "Deliver safely, on programme and to specification." },
  { step: "04", title: "Handover", text: "Final checks, documentation and client handover." },
];

const reasons = [
  "Clear communication throughout delivery",
  "Structured planning and coordination",
  "Quality-focused workmanship",
  "Safety-conscious site practices",
  "Responsive project support",
  "Commercially minded delivery",
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.companyName,
    description:
      "Construction and project consulting services including project management, electrical installations, solar installations and maintenance.",
    url: siteConfig.websiteUrl,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
    },
    areaServed: siteConfig.serviceArea,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#hero-grid)" />
            <circle cx="900" cy="200" r="260" fill="#BF2F33" opacity="0.15" />
            <circle cx="1000" cy="400" r="180" fill="#41A549" opacity="0.12" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red">
              Construction &amp; Project Consulting
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Delivering construction and technical projects with clarity.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-grey-light">
              {siteConfig.companyName} provides construction services, project
              management, electrical and solar installations, and consulting
              support for clients who need reliable delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
              >
                Request a Quote
              </Link>
              <a
                href="#services"
                className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-charcoal">Who we are</h2>
            <p className="mt-4 text-base leading-relaxed text-grey">
              We are a construction and projects consulting business focused on
              practical delivery. From initial consultation through to handover,
              we help clients plan, coordinate and execute building, electrical,
              solar and maintenance work with confidence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-grey">
              Contact details, registrations and project history will be shared
              once verified by the client.
            </p>
          </div>
          <ImagePlaceholder
            label="Project planning and site coordination"
            icon={ClipboardCheck}
            aspect="aspect-[4/3]"
          />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-grey-light/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-charcoal">Our services</h2>
            <p className="mt-3 text-base text-grey">
              A focused set of construction and technical services for commercial,
              industrial and residential clients.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ImagePlaceholder
            label="Electrical and solar installations"
            icon={Sun}
            aspect="aspect-[4/3]"
          />
          <div>
            <h2 className="text-3xl font-bold text-charcoal">Why choose us</h2>
            <ul className="mt-6 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-base text-grey">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold">Project delivery approach</h2>
            <p className="mt-3 text-base text-grey-light">
              A simple, structured process that keeps projects on track.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <div key={a.step} className="rounded-lg border border-white/10 p-6">
                <p className="text-sm font-semibold text-red">{a.step}</p>
                <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-grey-light">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured imagery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-charcoal">Recent work</h2>
          <p className="mt-3 text-base text-grey">
            Representative imagery of the type of work we deliver. Specific
            projects and client references are shared on request.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ImagePlaceholder label="Infrastructure improvements" icon={Wrench} />
          <ImagePlaceholder label="Project coordination" icon={ClipboardCheck} />
          <ImagePlaceholder label="Technical installations" icon={Zap} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to start your project?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/90">
            Tell us about your construction, electrical, solar or maintenance
            requirements and we will respond with the next steps.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold text-red transition-colors hover:bg-grey-light"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}