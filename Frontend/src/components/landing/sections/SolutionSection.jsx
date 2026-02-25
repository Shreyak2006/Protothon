import React from "react";
import { Brain, Target, Shield, BarChart3, Sparkles } from "lucide-react";
import Reveal from "../Reveal";
import ParallaxLayer from "../ParallaxLayer";
import TiltCard from "../TiltCard";

const modules = [
    {
        icon: Brain,
        title: "AI Skill Intelligence",
        description: "Deep analysis of student skills with proficiency scoring, gap detection, and personalized learning paths powered by NLP.",
        color: "var(--accent-purple)",
        features: ["Skill Proficiency Scoring", "Gap Analysis", "Learning Paths"],
    },
    {
        icon: Target,
        title: "Smart Job Matching",
        description:
            "Explainable AI matches students to companies with 0-100% compatibility scores. Every recommendation is backed by transparent reasoning.",
        color: "var(--accent-blue)",
        features: ["Match Scoring", "Explainable AI", "Real-time Updates"],
    },
    {
        icon: Shield,
        title: "Policy Governance Engine",
        description:
            "Define placement rules once. The engine enforces them automaticallyâ€”eligibility, limits, conflicts. Zero manual oversight needed.",
        color: "var(--accent-emerald)",
        features: ["Rule Builder", "Auto Enforcement", "Violation Alerts"],
    },
    {
        icon: BarChart3,
        title: "Predictive Analytics",
        description:
            "From placement rates to salary trends, gain real-time insights that help you make data-driven decisions at every level.",
        color: "var(--accent-cyan)",
        features: ["Trend Analysis", "Hiring Forecasts", "Exportable Reports"],
    },
];

export default function SolutionSection() {
    return (
        <section
            id="solution"
            className="relative py-32 md:py-40 overflow-hidden"
        >
            {/* Background effects with native Parallax */}
            <ParallaxLayer
                speed={-0.1}
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--accent-blue)] opacity-[0.03] blur-[150px]"
            />
            <ParallaxLayer
                speed={0.15}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[var(--accent-purple)] opacity-[0.04] blur-[120px]"
            />

            <div className="section-container">
                <div className="text-center mb-20">
                    <Reveal variant="fade-up" delay={0}>
                        <div className="section-label mx-auto w-fit">
                            <Sparkles className="w-3.5 h-3.5" />
                            The Solution
                        </div>
                    </Reveal>
                    <Reveal variant="fade-up" delay={1}>
                        <h2 className="section-title">
                            One platform.{" "}
                            <span className="l-gradient-text">Every workflow.</span>
                        </h2>
                    </Reveal>
                    <Reveal variant="fade-up" delay={2}>
                        <p className="section-desc mx-auto">
                            PlaceAI unifies the entire placement lifecycle â€” from skill
                            profiling to final offers â€” in a single, intelligent system.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {modules.map((mod, index) => (
                        <Reveal
                            key={mod.title}
                            variant="fade-up"
                            delay={(index % 4)}
                        >
                            <TiltCard intensity={8} className="h-full">
                                <div className="l-glass-card p-8 h-full relative overflow-hidden group preserve-3d">
                                    <div
                                        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] blur-[60px] transition-opacity duration-700 group-hover:opacity-[0.12]"
                                        style={{ background: mod.color }}
                                    />

                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:translateZ(20px)"
                                        style={{ background: `${mod.color}12` }}
                                    >
                                        <mod.icon
                                            className="w-7 h-7"
                                            style={{ color: mod.color }}
                                        />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:translateZ(30px)">{mod.title}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 group-hover:translateZ(10px)">
                                        {mod.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 group-hover:translateZ(25px)">
                                        {mod.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                                                style={{
                                                    background: `${mod.color}10`,
                                                    color: mod.color,
                                                    border: `1px solid ${mod.color}20`,
                                                }}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>

                <Reveal variant="fade-up" delay={0} className="mt-16 relative">
                    <div className="l-glass-card-static p-1 overflow-hidden">
                        <div className="relative rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                    </div>
                                    <div className="flex-1 h-7 rounded-lg bg-[var(--bg-subtle)] flex items-center px-3">
                                        <span className="text-[11px] text-[var(--text-muted)]">
                                            app.placeai.io/dashboard
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-2 space-y-2 hidden md:block">
                                        {["Dashboard", "Profile", "Skills", "Jobs", "Track"].map(
                                            (item, i) => (
                                                <div
                                                    key={item}
                                                    className={`h-8 rounded-lg flex items-center px-3 text-[11px] ${i === 0
                                                        ? "bg-[var(--accent-blue)] bg-opacity-15 text-[var(--accent-blue)]"
                                                        : "text-[var(--text-muted)]"
                                                        }`}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="col-span-12 md:col-span-10 space-y-4">
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { label: "Readiness", value: "87%", color: "var(--accent-emerald)" },
                                                { label: "Applications", value: "12", color: "var(--accent-blue)" },
                                                { label: "Match Score", value: "92%", color: "var(--accent-purple)" },
                                            ].map((stat) => (
                                                <div
                                                    key={stat.label}
                                                    className="rounded-xl p-4"
                                                    style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}15` }}
                                                >
                                                    <p className="text-[10px] text-[var(--text-muted)] mb-1">
                                                        {stat.label}
                                                    </p>
                                                    <p
                                                        className="text-xl font-bold"
                                                        style={{ color: stat.color }}
                                                    >
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="rounded-xl bg-[var(--bg-subtle)] p-4 border border-[var(--border-subtle)]">
                                            <p className="text-[11px] text-[var(--text-muted)] mb-3">
                                                Skill Growth Trajectory
                                            </p>
                                            <div className="flex items-end gap-1 h-20">
                                                {[30, 45, 38, 55, 65, 58, 72, 68, 80, 75, 88, 92].map(
                                                    (h, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex-1 rounded-t-sm transition-all duration-1000 delay-300"
                                                            style={{
                                                                height: `${h}%`,
                                                                background: `linear-gradient(to top, var(--accent-blue), var(--accent-purple))`,
                                                                opacity: 0.6 + (h / 100) * 0.4,
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[var(--accent-blue)] opacity-[0.06] blur-[60px] rounded-full" />
                </Reveal>
            </div>
        </section>
    );
}
