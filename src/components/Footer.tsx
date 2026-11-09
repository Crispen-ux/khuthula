import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl, whatsappMessage } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo-reversed.svg" alt={siteConfig.companyName} className="h-10 w-auto" />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-grey-light">
              {siteConfig.tagline} We support clients across planning, delivery and
              maintenance of construction and technical projects.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-grey-light transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-grey-light transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-grey-light transition-colors hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-grey-light transition-colors hover:text-white">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-grey-light transition-colors hover:text-white">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-grey-light">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`tel:${siteConfig.telephone.replace(/\s/g, "")}`} className="hover:text-white">
                  {siteConfig.telephone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={whatsappUrl(siteConfig.whatsappNumber, whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp enquiry
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-grey-light">
          <p>
            © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
            Service area: {siteConfig.serviceArea}.
          </p>
        </div>
      </div>
    </footer>
  );
}
