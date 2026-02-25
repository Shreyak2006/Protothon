import React, { lazy, Suspense } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "../Reveal";
import ParallaxLayer from "../ParallaxLayer";
import { useParallax } from "../../../hooks/landing/useParallax";

const ParticleBackground = lazy(() => import("../ParticleBackground"));

export default function HeroSection() {
    // For content fading out as we scroll
    const scrollY = useParallax(1);
    const contentOpacity = Math.max(0, 1 - scrollY / 800);
    const contentY = scrollY * 0.35;

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <Suspense fallback={null}>
                    <ParticleBackground />
                </Suspense>
            </div>

            {/* Parallax Radial orbs */}
            <ParallaxLayer speed={0.08} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent-blue)] opacity-[0.04] blur-[120px] will-change-transform" />
            <ParallaxLayer speed={0.12} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-purple)] opacity-[0.05] blur-[100px] will-change-transform" />

            <div
                style={{
                    opacity: contentOpacity,
                    transform: `translate3d(0, ${contentY}px, 0)`,
                    willChange: 'transform, opacity'
                }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                <Reveal variant="fade-up" delay={1}>
                    <div className="section-label mx-auto w-fit mb-8">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
                        AI-Powered Placement Governance
                    </div>
                </Reveal>

                <Reveal variant="fade-up" delay={2}>
                    <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-6 text-[var(--text-primary)]">
                        Reinventing Campus{" "}
                        <br className="hidden sm:block" />
                        Placements with{" "}
                        <span className="l-gradient-text">AI</span>
                    </h1>
                </Reveal>

                <Reveal variant="fade-up" delay={3}>
                    <p className="text-[clamp(1rem,2.2vw,1.35rem)] text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
                        Intelligent matching. Automated governance. Predictive success.
                        <br />
                        The platform that transforms how universities and recruiters connect talent.
                    </p>
                </Reveal>

                <Reveal variant="fade-up" delay={4} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="l-btn-primary">
                        <span>Request a Demo</span>
                    </button>
                    <button className="l-btn-outline">
                        <span>Explore Platform</span>
                    </button>
                </Reveal>

                <Reveal variant="fade-up" delay={5} className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-[var(--text-muted)]">
                    {["150+ Universities", "10,000+ Placements", "500+ Companies", "98% Accuracy"].map(
                        (stat) => (
                            <span key={stat} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
                                {stat}
                            </span>
                        )
                    )}
                </Reveal>
            </div>

            {/* Scroll indicator with native CSS animation */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60">
                <span className="text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">
                    Scroll
                </span>
                <div className="animate-bounce">
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                </div>
            </div>
        </section>
    );
}
