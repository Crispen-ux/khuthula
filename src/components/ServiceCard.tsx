import { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <article className="group rounded-lg border border-grey-light bg-white p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-red/10 text-red">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-charcoal">{title}</h3>
      <p className="text-sm leading-relaxed text-grey">{description}</p>
    </article>
  );
}