import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, DollarSign, Building2, Award } from "lucide-react";
import Reveal from "../Reveal";
import { useIntersectionReveal } from "../../../hooks/landing/useIntersectionReveal";

function CountUp({ target, suffix = "", prefix = "", duration = 2 }) {
    const [count, setCount] = useState(0);
    const { ref, isVisible } = useIntersectionReveal({ threshold: 0.5 });

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const step = target / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.round(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [isVisible, target, duration]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const stats = [
    { icon: Users, value: 10000, suffix: "+", label: "Students Placed", color: "var(--accent-blue)" },
    { icon: Building2, value: 500, suffix: "+", label: "Partner Companies", color: "var(--accent-purple)" },
    { icon: Award, value: 87, suffix: "%", label: "Placement Rate", color: "var(--accent-emerald)" },
    { icon: DollarSign, value: 12, suffix: "L", prefix: "â‚¹", label: "Average Package", color: "var(--accent-cyan)" },
    { icon: TrendingUp, value: 92, suffix: "%", label: "Match Accuracy", color: "var(--accent-amber)" },
    { icon: BarChart3, value: 150, suffix: "+", label: "Universities", color: "var(--accent-rose)" },
];

const chartData = [
    { year: "2020", placed: 650, target: 800 },
    { year: "2021", placed: 780, target: 850 },
    { year: "2022", placed: 920, target: 900 },
    { year: "2023", placed: 1100, target: 1000 },
    { year: "2024", placed: 1350, target: 1200 },
    { year: "2025", placed: 1580, target: 1400 },
];

const maxVal = 1600;

export default function AnalyticsSection() {
    const { ref: chartRef, isVisible: chartInView } = useIntersectionReveal({ threshold: 0.2 });

    return (
        <section id="analytics" className="relative py-32 md:py-40 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent-cyan)] opacity-[0.03] blur-[150px]" />

            <div className="section-container">
                <div className="text-center mb-20">
                    <Reveal variant="fade-up" delay={0}>
                        <div className="section-label mx-auto w-fit">
                            <BarChart3 className="w-3.5 h-3.5" />
                            Analytics & Prediction
                        </div>
                    </Reveal>
                    <Reveal variant="fade-up" delay={1}>
                        <h2 className="section-title">
                            Numbers that{" "}
                            <span className="l-gradient-text">tell the story</span>
                        </h2>
                    </Reveal>
                    <Reveal variant="fade-up" delay={2}>
                        <p className="section-desc mx-auto">
                            Real-time dashboards, predictive insights, and exportable reports
                            that transform data into actionable strategy.
                        </p>
                    </Reveal>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {stats.map((stat, i) => (
                        <Reveal
                            key={stat.label}
                            variant="fade-up"
                            delay={(i % 6)}
                        >
                            <div className="l-glass-card p-5 text-center group hover-lift">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-500 group-hover:scale-110"
                                    style={{ background: `${stat.color}12` }}
                                >
                                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                                </div>
                                <p className="text-2xl font-extrabold" style={{ color: stat.color }}>
                                    <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
                                </p>
                                <p className="text-[10px] text-[var(--test-muted)] mt-1">{stat.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Chart with Native transitions */}
                <Reveal
                    variant="fade-up"
                    delay={0}
                    className="l-glass-card-static p-8 relative"
                >
                    <div ref={chartRef} className="absolute inset-0 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold">Placement Trajectory</h3>
                                <p className="text-sm text-[var(--test-muted)]">Placed vs Target (6 years)</p>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm" style={{ background: "var(--accent-blue)" }} />
                                    Placed
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm border border-[rgba(255,255,255,0.2)]" />
                                    Target
                                </span>
                            </div>
                        </div>

                        <div className="flex items-end gap-3 h-56 md:h-72">
                            {chartData.map((d, i) => (
                                <div key={d.year} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="relative w-full flex items-end justify-center gap-1 flex-1">
                                        {/* Target bar */}
                                        <div
                                            className="w-[40%] rounded-t-md border border-[rgba(255,255,255,0.08)] bg-transparent relative transition-all duration-1000 ease-out"
                                            style={{
                                                height: chartInView ? `${(d.target / maxVal) * 100}%` : '0%',
                                                transitionDelay: `${i * 100}ms`
                                            }}
                                        />
                                        {/* Placed bar */}
                                        <div
                                            className="w-[40%] rounded-t-md relative overflow-hidden transition-all duration-1000 ease-out"
                                            style={{
                                                background: `linear-gradient(to top, var(--accent-blue), var(--accent-purple))`,
                                                height: chartInView ? `${(d.placed / maxVal) * 100}%` : '0%',
                                                transitionDelay: `${100 + i * 100}ms`
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-[0.08]" />
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-[var(--test-muted)]">{d.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
