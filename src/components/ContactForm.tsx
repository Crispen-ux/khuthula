"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

const services = [
  "General construction",
  "Construction project management",
  "Electrical installations",
  "Solar / renewable energy",
  "Project planning & consulting",
  "Maintenance & infrastructure improvements",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(siteConfig.forms.endpoint, {
        method: "POST",
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success !== true) {
        throw new Error(json?.message || "Submission failed. Please try again.");
      }
      setStatus("success");
      setMessage(
        json?.message ||
          "Thank you. Your enquiry has been received and we will respond shortly.",
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again or contact us directly.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-charcoal">
            Full name <span className="text-red">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-charcoal">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
            Email address <span className="text-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
          />
        </div>
        <div>
          <label htmlFor="telephone" className="mb-1.5 block text-sm font-medium text-charcoal">
            Telephone number <span className="text-red">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-charcoal">
            Service required <span className="text-red">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-charcoal">
            Project location <span className="text-red">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-charcoal">
          Project description <span className="text-red">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className="w-full rounded-md border border-grey-light px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-red focus:ring-1 focus:ring-red"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Enquiry
      </button>

      {status === "success" && (
        <div className="flex items-start gap-2 rounded-md border border-green/30 bg-green/5 p-3 text-sm text-green-dark">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-2 rounded-md border border-red/30 bg-red/5 p-3 text-sm text-red-dark">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}