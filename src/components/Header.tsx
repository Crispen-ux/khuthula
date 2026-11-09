"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Request a Quote" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-grey-light/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={siteConfig.companyName}>
          <Image
            src="/logo.svg"
            alt={siteConfig.companyName}
            width={180}
            height={60}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-red"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
          >
            Get in Touch
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-charcoal md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-grey-light/70 bg-white md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-base font-medium text-charcoal transition-colors hover:text-red"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 inline-flex w-fit rounded-md bg-red px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}