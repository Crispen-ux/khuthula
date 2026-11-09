import {
  Building2,
  ClipboardCheck,
  Zap,
  Sun,
  Compass,
  Wrench,
  Hammer,
  ShieldCheck,
  Lightbulb,
  BatteryCharging,
  HardHat,
  Ruler,
} from "lucide-react";

export type Service = {
  icon: typeof Building2;
  title: string;
  slug: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    icon: Building2,
    title: "General Construction",
    slug: "general-construction",
    description:
      "Building and construction services delivered to specification, with attention to quality, safety and programme.",
    bullets: ["New builds and extensions", "Renovations and refurbishments", "Civil and structural works"],
  },
  {
    icon: ClipboardCheck,
    title: "Construction Project Management",
    slug: "project-management",
    description:
      "End-to-end construction project management covering coordination, reporting and delivery control.",
    bullets: ["Programme and cost control", "Contractor coordination", "Quality and safety oversight"],
  },
  {
    icon: Zap,
    title: "Electrical Installations",
    slug: "electrical-installations",
    description:
      "Electrical installation and related technical services for new builds, upgrades and maintenance.",
    bullets: ["New installations", "Distribution boards and wiring", "Fault finding and upgrades"],
  },
  {
    icon: Sun,
    title: "Solar & Renewable Energy",
    slug: "solar-renewable-energy",
    description:
      "Solar panel and renewable energy installations that support efficient, sustainable operations.",
    bullets: ["Rooftop solar PV", "Hybrid and off-grid systems", "Energy efficiency advice"],
  },
  {
    icon: Compass,
    title: "Planning & Consulting",
    slug: "planning-consulting",
    description:
      "Project planning, coordination and consulting to structure scope, timelines and delivery.",
    bullets: ["Feasibility and scoping", "Programme development", "Risk and cost planning"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Improvements",
    slug: "maintenance-improvements",
    description:
      "General maintenance and infrastructure improvements that extend asset life and performance.",
    bullets: ["Preventative maintenance", "Infrastructure upgrades", "Facility improvements"],
  },
  {
    icon: Hammer,
    title: "Fit-Out & Refurbishment",
    slug: "fit-out-refurbishment",
    description:
      "Interior fit-out and refurbishment services for commercial and residential spaces.",
    bullets: ["Office and retail fit-outs", "Space reconfiguration", "Finishes and installations"],
  },
  {
    icon: ShieldCheck,
    title: "Health & Safety Coordination",
    slug: "health-safety",
    description:
      "Site safety planning and coordination to support compliant, incident-free delivery.",
    bullets: ["Safety plans and inductions", "Site inspections", "Compliance documentation"],
  },
  {
    icon: Lightbulb,
    title: "Lighting & Power Solutions",
    slug: "lighting-power",
    description:
      "Design and installation of efficient lighting and power distribution systems.",
    bullets: ["LED lighting upgrades", "Power distribution", "Energy-saving retrofits"],
  },
  {
    icon: BatteryCharging,
    title: "Backup Power & Storage",
    slug: "backup-power",
    description:
      "Backup power and battery storage solutions for continuity and resilience.",
    bullets: ["Inverter and battery systems", "Generator integration", "Load management"],
  },
  {
    icon: HardHat,
    title: "Site Supervision",
    slug: "site-supervision",
    description:
      "On-site supervision to ensure work is delivered to specification and programme.",
    bullets: ["Daily site coordination", "Progress reporting", "Quality control"],
  },
  {
    icon: Ruler,
    title: "Measurement & Estimating",
    slug: "measurement-estimating",
    description:
      "Quantity measurement and cost estimating support for planning and tendering.",
    bullets: ["Bill of quantities", "Cost estimates", "Tender support"],
  },
];