"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Play, ArrowUpRight } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const floatingCard1Ref = useRef<HTMLDivElement>(null);
    const floatingCard2Ref = useRef<HTMLDivElement>(null);
    const hasInteracted = useRef<boolean>(false);

    // Global listener to unlock sound gracefully
    useEffect(() => {
        const unlockAudio = () => {
            hasInteracted.current = true;
            if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.muted = false;
            }
            window.removeEventListener('mousedown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };
        window.addEventListener('mousedown', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);

        return () => {
            window.removeEventListener('mousedown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };
    }, []);

    // Handle pausing when the video actually leaves the screen, not just when unpinned
    useEffect(() => {
        const currentSection = sectionRef.current;
        if (!currentSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Pause ONLY when the entire section is completely out of the viewport
                if (!entry.isIntersecting && videoRef.current) {
                    if (!videoRef.current.paused) videoRef.current.pause();
                } else if (entry.isIntersecting && videoRef.current) {
                    // Try to resume if it was already opacity: 1 (animation finished)
                    if (videoRef.current.style.opacity === "1") {
                        videoRef.current.muted = false;
                        videoRef.current.play().catch(() => {
                            if (videoRef.current) {
                                videoRef.current.muted = true;
                                videoRef.current.play().catch(() => { });
                            }
                        });
                    }
                }
            });
        }, { threshold: 0 }); // 0 checks when it's fully gone

        observer.observe(currentSection);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Ensure markers and setup are ready
        const ctx = gsap.context(() => {
            // 1. Initial Entrance Animation (Immediate)
            const entranceTl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            entranceTl.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
                .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
                .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
                .fromTo(
                    mockupRef.current,
                    { y: 120, opacity: 0, scale: 0.92 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
                    "-=0.6"
                );

            // 2. Scroll-Linked Animation (Balanced Liquid Journey)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=120%", // Even tighter pin animation
                    scrub: 1.2, // Smoother feel
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            scrollTl
                // Stage 1: Text Ascends and Fades out
                .fromTo([headingRef.current, subRef.current, ctaRef.current],
                    { y: 0, opacity: 1 },
                    {
                        y: -300,
                        opacity: 0,
                        duration: 1,
                        ease: "power1.inOut"
                    }, 0)

                // Stage 2: Mockup Scales Up and Rises
                .fromTo(mockupRef.current,
                    { y: 0, scale: 1 },
                    {
                        y: "-35%",
                        scale: 1.40,
                        duration: 2,
                        ease: "power2.inOut"
                    }, 0)

                .to(floatingCard1Ref.current, { x: -300, opacity: 0, duration: 1 }, 0)
                .to(floatingCard2Ref.current, { x: 300, opacity: 0, duration: 1 }, 0)

                // Stage 3: Image to Video Crossfade
                .to(imageContainerRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "sine.inOut"
                }, 0.7)
                .fromTo(videoRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: "sine.inOut",
                        onStart: () => {
                            const video = videoRef.current;
                            if (video && video.paused) {
                                video.muted = false;
                                const playPromise = video.play();
                                if (playPromise !== undefined) {
                                    playPromise.catch(() => {
                                        // Force muted auto-play if sound is blocked
                                        video.muted = true;
                                        video.play().catch(() => { });
                                    });
                                }
                            }
                        },
                        onReverseComplete: () => {
                            if (videoRef.current) videoRef.current.pause();
                        }
                    }, 0.7)

                // Stage 4: Balanced Hold
                // Keeps video 100% visible for a natural duration before release.
                .to({}, { duration: 0.5 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen md:min-h-[140vh] flex flex-col items-center justify-start overflow-hidden bg-white"
            style={{ paddingTop: '100px' }}
        >
            {/* Soft Ambient Background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.03),transparent_70%)]"></div>

            <div ref={containerRef} className="container mx-auto relative z-10 w-full flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-3xl mx-auto will-change-transform">
                    <h1
                        ref={headingRef}
                        className="text-3xl md:text-4xl mt-16 font-bold text-slate-900 tracking-tight leading-none mb-6"
                    >
                        <span className="hidden md:block">Manage Property Sales & <span className="text-[#2563EB] relative whitespace-nowrap">
                            Agent Commissions
                        </span> <br /> In One Dashboard</span>
                    </h1>

                    <p
                        ref={subRef}
                        className="text-sm md:text-base text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        <span className="md:hidden">Stop using spreadsheets and WhatsApp to manage your real estate sales.</span>
                        <span className="hidden md:inline">Track bookings, monitor agents, automate commissions and see real-time revenue reports — built specifically for real estate developers and marketing teams.</span>
                    </p>

                    <div
                        ref={ctaRef}
                        className="flex flex-col items-center mb-5"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full px-4 md:px-0">
                            <a
                                href="#contact"
                                className="w-full md:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-base flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Book a Live Demo <ChevronRight size={18} />
                            </a>
                            <a
                                href="#contact"
                                className="w-full md:w-auto bg-white hover:bg-slate-50 text-slate-900 px-8 py-3.5 rounded-xl font-bold border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] text-base flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Start Free Trial <ArrowUpRight size={18} className="text-[#2563EB]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mockup Section */}
                <div
                    ref={mockupRef}
                    className="relative w-full max-w-7xl mx-auto px-2 md:px-0 will-change-transform"
                    style={{ perspective: "1500px" }}
                >
                    {/* Floating Card 1: Revenue (Left) */}
                    <div ref={floatingCard1Ref} className="hidden md:block absolute -left-32 top-20 -translate-y-1/2 z-30 origin-left">
                        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 w-[240px] text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8l-4 4-2-2-2 2" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">Live Revenue</p>
                                    <p className="text-slate-900 text-[20px] font-bold tracking-tight">৳ 5,240,000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">+12%</span>
                                <span className="text-[9px] text-slate-400 font-medium">Monthly growth</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 2: Agents (Right) */}
                    <div ref={floatingCard2Ref} className="hidden md:block absolute -right-32 top-[60%] z-30 origin-right">
                        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 w-[240px] text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">Active Teams</p>
                                    <p className="text-slate-900 text-[20px] font-bold tracking-tight">32 Agents</p>
                                </div>
                            </div>
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 ring-2 ring-slate-50 shadow-sm"></div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#2563EB] flex items-center justify-center text-[9px] text-white font-extrabold shadow-lg shadow-blue-200">+8</div>
                            </div>
                        </div>
                    </div>

                    {/* Main Mockup Container */}
                    <div className="relative z-10 rounded-[32px] md:rounded-[56px] overflow-hidden border-8 md:border-16 border-white shadow-[0_60px_150px_-30px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] bg-slate-900 mx-4 md:mx-0 aspect-video group">

                        {/* Static Image Placeholder */}
                        <div
                            ref={imageContainerRef}
                            onClick={() => {
                                if (videoRef.current) {
                                    videoRef.current.muted = false;
                                    videoRef.current.play().catch(() => { });
                                    gsap.to(imageContainerRef.current, { opacity: 0, duration: 0.5 });
                                    gsap.to(videoRef.current, { opacity: 1, duration: 0.5 });
                                }
                            }}
                            className="absolute inset-0 z-10 bg-white shadow-inner cursor-pointer"
                        >
                            <Image
                                src="/Dashboard 1.svg"
                                alt="Property Chain Dashboard"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                <div className="bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-full shadow-2xl transition-all group-hover:scale-110 border border-white">
                                    <Play size={36} className="text-[#2563EB] fill-[#2563EB]" />
                                </div>
                            </div>
                        </div>

                        {/* Video Layer */}
                        <video
                            ref={videoRef}
                            src="/property-chain-promo.mp4"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 cursor-pointer"
                            loop
                            playsInline
                            onClick={() => {
                                if (videoRef.current) {
                                    if (videoRef.current.paused) {
                                        videoRef.current.play();
                                    }
                                    // Turn ON sound whenever the user manually clicks the video
                                    videoRef.current.muted = !videoRef.current.muted;
                                }
                            }}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}
