"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Phone } from "lucide-react";
import { PRICING_PLANS } from "./plan-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PlanSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isAnnual = billing === "annual";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".plan-card") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="plan" className="py-20" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Pricing Plan
          </p>
          <h2 className="text-4xl font-bold text-[#0A1628] mb-3">
            Simple Pricing for Every Real Estate Business
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Choose the plan that fits your company size. Upgrade anytime as your business grows.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center gap-2 mb-14">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${!isAnnual
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
          >
            Monthly Pricing
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${isAnnual
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
          >
            Annual Pricing
          </button>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="flex flex-col md:flex-row justify-center items-center gap-4">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            if (plan.popular) {
              return <BusinessCard key={plan.id} plan={plan} price={price} isAnnual={isAnnual} />;
            }
            return <SideCard key={plan.id} plan={plan} price={price} />;
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          No setup fee • Free onboarding support • Cancel anytime
        </p>

        {/* CTA Banner */}
        <div className="mt-10 bg-[#EEF3FF] rounded-xl px-10 py-8 flex flex-col items-center gap-4">
          <p className="text-base font-semibold text-[#0A1628]">
            Not sure which plan fits you?{" "}
            <span className="text-blue-600">Talk with our team.</span>
          </p>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap">
            <Phone size={14} />
            Schedule a Call
          </button>
        </div>

      </div>
    </section>
  );
}

// ── Business Card (Popular) ──────────────────────────────────────
function BusinessCard({
  plan,
  price,
  isAnnual,
}: {
  plan: (typeof PRICING_PLANS)[0];
  price: number;
  isAnnual: boolean;
}) {
  return (
    <div className="plan-card relative flex flex-col w-full md:w-[34%] bg-white rounded-lg border border-slate-200 shadow-md z-10">
      {/* Most Popular badge */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-lg shadow-md">
          Most Popular
        </span>
      </div>

      {/* Gradient area: name + price + button */}
      <div
        className="mx-4 mt-5 mb-4 rounded-xl px-5 py-5"
        style={{ background: "linear-gradient(135deg, #dde9ff 0%, #c7d9ff 100%)" }}
      >
        {/* Plan name row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-slate-700 bg-white/70 px-3 py-1 rounded-lg">
            {plan.name}
          </span>
          {isAnnual && (
            <span className="text-xs font-bold text-blue-600 bg-white/80 border border-blue-100 px-2.5 py-1 rounded-lg">
              Save 20%
            </span>
          )}
        </div>

        {/* Price */}
        {isAnnual && (
          <p className="text-base text-slate-400 line-through font-medium mb-1">
            ${plan.monthlyPrice}
          </p>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-[2.2rem] font-bold text-[#0A1628] leading-none">${price}</span>
          <span className="text-xs text-slate-500 font-semibold">/monthly</span>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 mb-4">{plan.description}</p>

        {/* CTA button */}
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
          {plan.cta}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
        </button>
      </div>

      {/* Features */}
      <div className="px-5 pt-2 pb-12 flex flex-col gap-3">
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="shrink-0 text-blue-600 fill-blue-600 stroke-white" />
            <span className="text-sm font-medium text-slate-700">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Starter / Enterprise Card ────────────────────────────────────
function SideCard({
  plan,
  price,
}: {
  plan: (typeof PRICING_PLANS)[0];
  price: number;
}) {
  return (
    <div className="plan-card flex flex-col w-full md:w-[33%] bg-white rounded-lg border border-slate-200 shadow-sm">
      {/* Plan name */}
      <div className="px-5 pt-6 pb-1">
        <span className="inline-block text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
          {plan.name}
        </span>
      </div>

      {/* Price */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-[2.2rem] font-bold text-[#0A1628] leading-none">${price}</span>
          <span className="text-xs text-slate-400 font-semibold">/monthly</span>
        </div>
        <p className="text-xs text-slate-500 mt-1.5">{plan.description}</p>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* CTA */}
      <div className="py-3.5 text-center">
        <span className="text-sm font-semibold text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
          {plan.cta}
        </span>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* Features */}
      <div className="px-5 pt-5 pb-7 flex flex-col gap-3">
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="shrink-0 text-blue-600 fill-blue-600 stroke-white" />
            <span className="text-sm font-medium text-slate-600">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
