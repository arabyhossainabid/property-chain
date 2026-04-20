"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Circle, CheckCircle2 } from "lucide-react";
import { PRICING_STEPS } from "./pricing-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PricingSection() {
  const [activeStepId, setActiveStepId] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
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

      // Steps Stagger Animation
      const steps = stepsRef.current?.querySelectorAll(".step-item");
      if (steps) {
        gsap.fromTo(
          steps,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Image Entrance Animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-white py-12 md:py-24"
    >
      <div className="pc-container max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-blue-950 leading-tight mb-8 tracking-tight">
            Start Managing Your Sales in 5 Simple Steps
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            You don't need technical knowledge. Your team can start using the system within minutes.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Steps List */}
          <div ref={stepsRef} className="lg:col-span-5 flex flex-col gap-8 md:gap-12 order-2 lg:order-1">
            {PRICING_STEPS.map((step, i) => {
              const isActive = activeStepId === step.id;

              return (
                <div
                  key={i}
                  onClick={() => setActiveStepId(step.id)}
                  className={`step-item flex gap-6 group cursor-pointer transition-all duration-500 ${isActive ? "opacity-100" : "opacity-40 hover:opacity-60"
                    }`}
                >
                  {/* Icon Column - Aligned with Title */}
                  <div className="shrink-0 pt-1.5">
                    <div className="transition-all duration-300">
                      {isActive ? (
                        <CheckCircle2 size={22} fill="#2563EB" className="text-white" />
                      ) : (
                        <Circle size={20} strokeWidth={1.5} className="text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="flex flex-col gap-2">
                    <h3 className={`text-lg md:2xl font-medium tracking-tight transition-colors duration-300 ${isActive ? "text-[#000F32]" : "text-slate-400"
                      }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed max-w-sm transition-colors duration-300 ${isActive ? "text-slate-500" : "text-slate-400"
                      }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={imageRef} className="lg:col-span-7 flex justify-center lg:justify-end items-end h-full order-1 lg:order-2">
            <div className="relative w-full max-w-[440px] bg-blue-50/50 rounded-t-3xl rounded-b-3xl h-[400px] md:h-[520px] flex flex-col items-center justify-end">
              <div className="relative w-[105%] -mt-16 aspect-3/4 transition-transform duration-700 hover:scale-[1.03]">
                <Image
                  src="/milwaukee.svg"
                  alt="Milwaukee Building"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
