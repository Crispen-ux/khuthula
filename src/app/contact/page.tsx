import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl, whatsappMessage } from "@/lib/site-config";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Contact Kuthula Consulting & Projects to request a quote for construction, project management, electrical, solar and maintenance services.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Request a Quote",
    description:
      "Request a quote for construction, project management, electrical, solar and maintenance services.",
    url: `${siteConfig.websiteUrl}/contact`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.companyName,
    description:
      "Construction and project consulting services including project management, electrical installations, solar installations and maintenance.",
    url: `${siteConfig.websiteUrl}/contact`,
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
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-red">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-bold">Request a quote</h1>
          <p className="mt-4 max-w-2xl text-base text-grey-light">
            Share your project details and we will respond with the next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-charcoal">Contact details</h2>
            <p className="mt-3 text-sm text-grey">
              Placeholders below will be updated once verified client details are
              supplied.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-red" />
                <div>
                  <p className="font-medium text-charcoal">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-grey hover:text-red">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-red" />
                <div>
                  <p className="font-medium text-charcoal">Telephone</p>
                  <a
                    href={`tel:${siteConfig.telephone.replace(/\s/g, "")}`}
                    className="text-grey hover:text-red"
                  >
                    {siteConfig.telephone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 text-red" />
                <div>
                  <p className="font-medium text-charcoal">WhatsApp</p>
                  <a
                    href={whatsappUrl(siteConfig.whatsappNumber, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grey hover:text-red"
                  >
                    Start a WhatsApp enquiry
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-red" />
                <div>
                  <p className="font-medium text-charcoal">Address</p>
                  <p className="text-grey">{siteConfig.address}</p>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-sm text-grey">
              Service area: {siteConfig.serviceArea}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-charcoal">Send an enquiry</h2>
            <p className="mt-3 text-sm text-grey">
              Fields marked <span className="text-red">*</span> are required.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}