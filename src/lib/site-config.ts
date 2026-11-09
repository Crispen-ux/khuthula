/**
 * Central site configuration.
 *
 * Replace placeholder values (marked clearly) with verified client details
 * before going live. Do not invent business information.
 */
export const siteConfig = {
  companyName: "Kuthula Consulting & Projects",
  tagline: "Construction and project consulting delivered with clarity and care.",
  // Placeholders below - to be confirmed by the client.
  websiteUrl: "https://www.example.com",
  email: "info@example.com",
  telephone: "+00 00 000 0000",
  whatsappNumber: "0000000000",
  address: "Business address to be confirmed",
  serviceArea: "Service area to be confirmed",
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    x: "",
  },
  forms: {
    // Relative path to the PHP endpoint on the deployed host.
    endpoint: "/api/lead.php",
  },
} as const;

export const whatsappMessage =
  "Hello, I would like to enquire about your construction and project services.";

export function whatsappUrl(number: string, message: string): string {
  const cleaned = number.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}