"use client";

import { useState } from "react";
import { Calculator, Sun, Zap, DollarSign } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function ConcreteCalculator() {
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  const [d, setD] = useState("");
  const vol = (parseFloat(l) || 0) * (parseFloat(w) || 0) * (parseFloat(d) || 0);
  return (
    <div className="rounded-lg border border-grey-light bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-charcoal">
        <Calculator className="h-5 w-5 text-red" /> Concrete Volume
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Length (m)" value={l} onChange={(e) => setL(e.target.value)} />
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Width (m)" value={w} onChange={(e) => setW(e.target.value)} />
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Depth (m)" value={d} onChange={(e) => setD(e.target.value)} />
      </div>
      <p className="mt-4 text-sm text-grey">
        Estimated volume: <span className="font-semibold text-charcoal">{vol.toFixed(2)} m³</span>
      </p>
    </div>
  );
}

function SolarCalculator() {
  const [kwh, setKwh] = useState("");
  const [sun, setSun] = useState("5");
  const panels = Math.ceil(((parseFloat(kwh) || 0) * 1000) / ((parseFloat(sun) || 5) * 400));
  return (
    <div className="rounded-lg border border-grey-light bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-charcoal">
        <Sun className="h-5 w-5 text-red" /> Solar Panel Estimate
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Daily usage (kWh)" value={kwh} onChange={(e) => setKwh(e.target.value)} />
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Peak sun hours" value={sun} onChange={(e) => setSun(e.target.value)} />
      </div>
      <p className="mt-4 text-sm text-grey">
        Estimated 400W panels: <span className="font-semibold text-charcoal">{panels > 0 ? panels : 0}</span>
      </p>
    </div>
  );
}

function BudgetCalculator() {
  const [base, setBase] = useState("");
  const [cont, setCont] = useState("10");
  const total = (parseFloat(base) || 0) * (1 + (parseFloat(cont) || 0) / 100);
  return (
    <div className="rounded-lg border border-grey-light bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-charcoal">
        <DollarSign className="h-5 w-5 text-red" /> Project Budget with Contingency
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Base cost" value={base} onChange={(e) => setBase(e.target.value)} />
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Contingency (%)" value={cont} onChange={(e) => setCont(e.target.value)} />
      </div>
      <p className="mt-4 text-sm text-grey">
        Total budget: <span className="font-semibold text-charcoal">{total.toFixed(2)}</span>
      </p>
    </div>
  );
}

function LoadCalculator() {
  const [amps, setAmps] = useState("");
  const [volts, setVolts] = useState("230");
  const power = (parseFloat(amps) || 0) * (parseFloat(volts) || 0);
  return (
    <div className="rounded-lg border border-grey-light bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-charcoal">
        <Zap className="h-5 w-5 text-red" /> Electrical Load (Power)
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Current (A)" value={amps} onChange={(e) => setAmps(e.target.value)} />
        <input className="rounded-md border border-grey-light px-3 py-2 text-sm" placeholder="Voltage (V)" value={volts} onChange={(e) => setVolts(e.target.value)} />
      </div>
      <p className="mt-4 text-sm text-grey">
        Power: <span className="font-semibold text-charcoal">{power.toFixed(0)} W</span>
      </p>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <>
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-red">Tools</p>
          <h1 className="mt-3 text-4xl font-bold">Construction tools</h1>
          <p className="mt-4 max-w-2xl text-base text-grey-light">
            Simple calculators to support planning and estimation. Results are
            indicative and should be verified by a professional.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <ConcreteCalculator />
          <SolarCalculator />
          <BudgetCalculator />
          <LoadCalculator />
        </div>
        <p className="mt-8 text-xs text-grey">
          Contact {siteConfig.companyName} for project-specific advice.
        </p>
      </section>
    </>
  );
}