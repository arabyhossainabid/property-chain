"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { COMPARISON_DATA } from "./how-it-works-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards Animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="how-it-works"
      className="bg-white py-12 md:py-24"
    >
      <div className="pc-container max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={headerRef} className="text-center mx-auto mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
            Our Solution
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-blue-950 leading-tight mb-8 tracking-tight">
            From Manual Tracking to Clear Sales Management
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            See how your workflow changes with Property Chain
          </p>
        </div>

        {/* Comparison Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Problem Card */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-14 border border-slate-100 flex flex-col gap-8 transition-all hover:scale-[1.01] duration-300">
            <h3 className="text-2xl md:text-2xl font-bold text-blue-950">
              {COMPARISON_DATA.problem.title}
            </h3>
            <ul className="flex flex-col gap-5">
              {COMPARISON_DATA.problem.items.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-500 font-medium text-sm md:text-base">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-blue-50/50 rounded-3xl p-8 md:p-14 border border-blue-50 flex flex-col gap-8 transition-all hover:scale-[1.01] duration-300 shadow-xl shadow-blue-950/5">
            <h3 className="text-2xl md:text-2xl font-bold text-blue-950">
              How it works with <span className="text-blue-600">Property Chain</span>
            </h3>
            <ul className="flex flex-col gap-5">
              {COMPARISON_DATA.solution.items.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-blue-950 font-semibold text-sm md:text-base">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" strokeWidth={4} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
