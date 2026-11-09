import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl, whatsappMessage } from "@/lib/site-config";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(siteConfig.whatsappNumber, whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}