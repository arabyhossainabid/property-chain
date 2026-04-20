"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Home, LayoutDashboard, TrendingUp, DollarSign, HelpCircle, Phone, Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Solutions", href: "#solutions" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP entrance animation
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
        );

        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Animate mobile menu
    useEffect(() => {
        if (!mobileRef.current) return;
        if (mobileOpen) {
            gsap.fromTo(
                mobileRef.current,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
            );
        } else {
            gsap.to(mobileRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
            });
        }
    }, [mobileOpen]);

    const handleLinkClick = () => setMobileOpen(false);

    return (
        <header
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-0 md:pt-6 flex flex-col items-center w-full px-0 md:px-4"
        >
            <div className="w-full max-w-7xl">
                <div
                    className={[
                        "flex items-center justify-between h-[60px] md:h-[68px] px-4 md:px-8 rounded-none md:rounded-full transition-all duration-500 border-b md:border border-white/20 md:border-white/40 shadow-sm md:shadow-[0_8px_32px_rgba(0,0,0,0.06)]",
                        scrolled
                            ? "bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-[0_12px_40px_rgba(37,99,235,0.08)]"
                            : "bg-white/70 backdrop-blur-md",
                    ].join(" ")}
                >
                    {/* Hamburger (Mobile Left) */}
                    <button
                        className="lg:hidden p-2 rounded-lg transition-colors hover:bg-slate-100"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X size={22} className="text-[#0F172A]" />
                        ) : (
                            <Menu size={22} className="text-[#0F172A]" />
                        )}
                    </button>

                    {/* Logo (Mobile Right) */}
                    <a href="#home" className="flex items-center gap-2 shrink-0 md:grow-0 lg:order-0">
                        <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center p-1.5">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                                <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <span
                            className="text-lg md:text-xl font-bold tracking-tight text-[#0F172A]"
                        >
                            Property Chain
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <nav className="flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-2 py-2 text-sm font-semibold transition-all duration-150 hover:text-[#2563EB]"
                                    style={{ color: "#475569" }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* CTA (Desktop) */}
                    <div className="hidden lg:flex items-center shrink-0">
                        <a
                            href="#contact"
                            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 group shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start Free Trial
                            <ChevronRight size={17} className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileRef}
                className="lg:hidden overflow-hidden w-full max-w-7xl mt-0 md:mt-2"
                style={{ height: 0, opacity: 0 }}
            >
                <nav className="bg-white/95 backdrop-blur-xl rounded-none md:rounded-2xl border-b md:border border-slate-200/50 p-4 flex flex-col gap-1 shadow-xl">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all hover:text-[#2563EB] hover:bg-slate-50"
                            style={{ color: "#475569" }}
                            onClick={handleLinkClick}
                        >
                            {link.label}
                            <ChevronRight size={14} />
                        </a>
                    ))}
                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 mt-2">
                        <a href="#contact" className="bg-[#2563EB] text-white text-center py-3 rounded-xl font-semibold text-sm" onClick={handleLinkClick}>
                            Start Free Trial
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
