"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { PRODUCT_FEATURES } from "./solutions-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      const boxes = boxesRef.current?.querySelectorAll(".feature-box");
      if (boxes) {
        boxes.forEach((box) => {
          gsap.fromTo(
            box,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: box,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="bg-white py-12 md:py-24"
    >
      <div className="pc-container max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block px-5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-500 uppercase tracking-widest mb-10">
            Product Features
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-blue-950 leading-tight mb-8 tracking-tight">
            Powerful Tools to Run Your Real Estate Business
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Manage projects, agents, bookings and revenue from one centralized platform designed for real estate companies.
          </p>
        </div>

        {/* Feature showcase list */}
        <div ref={boxesRef} className="flex flex-col gap-16 md:gap-24">
          {PRODUCT_FEATURES.map((feature, i) => (
            <div
              key={i}
              className="feature-box relative bg-[#F1F6FF]/60 rounded-[40px] overflow-hidden px-6"
            >
              {/* Subtle background blurs */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -left-10 top-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl opacity-50"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end relative z-10 w-full">
                {/* Left side: Text content */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pb-4">
                  <h3 className="text-3xl font-medium text-[#000F32] leading-[1.1] mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
                    {feature.desc}
                  </p>

                  <div className="flex flex-col gap-6 w-full">
                    {feature.points.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-4 justify-start group">
                        <div className="shrink-0 text-white bg-[#2563EB] rounded-full p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-110">
                          <CheckCircle2 size={18} fill="#2563EB" className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-[#000F32] tracking-tight">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Image Showcase at bottom */}
                <div className="lg:col-span-8 flex items-end">
                  <div className="relative w-full aspect-16/8 translate-y-4 group cursor-default">
                    <Image
                      src={feature.mockup}
                      alt={feature.title}
                      fill
                      className="object-contain object-bottom drop-shadow-2xl"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}