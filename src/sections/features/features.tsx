"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, HelpCircle } from "lucide-react";
import { PROBLEM_FEATURES } from "./problem-features";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. Grid items reveal
      const items = gridRef.current?.querySelectorAll(".problem-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-white py-12 md:py-24"
    >
      <div className="pc-container max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
            The Problem
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-blue-950 leading-tight mb-8 tracking-tight">
            Still Managing Property Sales Manually?
          </h2>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Most real estate companies rely on spreadsheets, calls and WhatsApp to track bookings and agents — causing mistakes, delays and lost revenue.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {PROBLEM_FEATURES.map((f, i) => (
            <div
              key={i}
              className="problem-item relative group flex flex-col items-center text-center transition-all duration-500 rounded-3xl p-10 hover:bg-white hover:shadow-2xl hover:scale-105 hover:z-10 bg-transparent border border-transparent"
            >
              <div className="relative mb-10 transition-transform duration-500 group-hover:scale-110">
                <div className="text-blue-600">
                  <f.icon size={56} strokeWidth={1.5} />
                </div>
                {f.extraIcon && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <f.extraIcon
                      size={20}
                      className="text-blue-600"
                      fill={f.extraIcon === AlertCircle || f.extraIcon === HelpCircle ? "none" : "#2563EB"}
                    />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-blue-950 mb-4 transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
