import React from "react";
import { AlertTriangle, Eye, Scale, Zap } from "lucide-react";
import Reveal from "../Reveal";
import ParallaxLayer from "../ParallaxLayer";

const problems = [
    {
        icon: Zap,
        title: "Manual Chaos",
        description:
            "Spreadsheets, emails, and paper forms dominate the placement process. Errors multiply. Time is wasted.",
        color: "var(--accent-amber)",
        stat: "72%",
        statLabel: "of placement officers report burnout",
    },
    {
        icon: Scale,
        title: "Unfair Shortlisting",
        description:
            "Implicit bias and inconsistent criteria cause deserving students to be overlooked. Merit takes a backseat.",
        color: "var(--accent-rose)",
        stat: "40%",
        statLabel: "of eligible students are never shortlisted",
    },
    {
        icon: Eye,
        title: "Poor Visibility",
        description:
            "Students have no dashboard. No real-time tracking. No feedback loops. They apply blindly and hope.",
        color: "var(--accent-purple)",
        stat: "85%",
        statLabel: "of students feel uninformed about status",
    },
    {
        icon: AlertTriangle,
        title: "Policy Violations",
        description:
            "Governance rules are documented but rarely enforced. Violations go undetected until too late.",
        color: "var(--accent-cyan)",
        stat: "3x",
        statLabel: "more violations caught with AI monitoring",
    },
];

export default function ProblemSection() {
    return (
        <section
            id="problem"
            className="relative py-32 md:py-40 overflow-hidden"
        >
            {/* Background glow with native parallax */}
            <ParallaxLayer speed={0.06} className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-rose)] opacity-[0.03] blur-[150px]" />

            <div className="section-container">
                <div className="text-center mb-20">
                    <Reveal variant="fade-up" delay={0}>
                        <div className="section-label mx-auto w-fit">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            The Problem
                        </div>
                    </Reveal>
                    <Reveal variant="fade-up" delay={1}>
                        <h2 className="section-title">
                            Campus placements are{" "}
                            <span className="l-gradient-text-warm">broken</span>
                        </h2>
                    </Reveal>
                    <Reveal variant="fade-up" delay={2}>
                        <p className="section-desc mx-auto">
                            The traditional placement process is riddled with inefficiencies,
                            bias, and opacity. Everyone suffersâ€”students, recruiters, and
                            administrators alike.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {problems.map((problem, index) => (
                        <Reveal
                            key={problem.title}
                            variant="fade-up"
                            delay={(index % 4)}
                        >
                            <div className="l-glass-card p-8 h-full group hover-lift">
                                <div className="flex items-start gap-5">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                                        style={{ background: `${problem.color}12` }}
                                    >
                                        <problem.icon
                                            className="w-6 h-6"
                                            style={{ color: problem.color }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                                            {problem.description}
                                        </p>
                                        <div className="flex items-baseline gap-2">
                                            <span
                                                className="text-3xl font-extrabold"
                                                style={{ color: problem.color }}
                                            >
                                                {problem.stat}
                                            </span>
                                            <span className="text-xs text-[var(--test-muted)]">
                                                {problem.statLabel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
