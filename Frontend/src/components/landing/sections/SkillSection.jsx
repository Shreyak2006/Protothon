import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const skills = [
    { name: "React", level: 92, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Language" },
    { name: "Node.js", level: 78, category: "Backend" },
    { name: "Python", level: 88, category: "Language" },
    { name: "DSA", level: 82, category: "Core" },
    { name: "System Design", level: 70, category: "Architecture" },
    { name: "Machine Learning", level: 65, category: "AI/ML" },
    { name: "SQL", level: 90, category: "Database" },
];

const radarPoints = [
    { label: "Frontend", value: 90 },
    { label: "Backend", value: 75 },
    { label: "DSA", value: 82 },
    { label: "ML/AI", value: 65 },
    { label: "System Design", value: 70 },
    { label: "Databases", value: 88 },
];

function AnimatedCounter({ target, duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!inView) return;
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
    }, [inView, target, duration]);

    return <span ref={ref}>{count}</span>;
}

function RadarChart() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const cx = 150, cy = 150, r = 110;
    const n = radarPoints.length;

    const getPoint = (index, value) => {
        const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
        const radius = (value / 100) * r;
        return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    };

    const dataPath = radarPoints.map((p, i) => {
        const pt = getPoint(i, p.value);
        return `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`;
    }).join(" ") + " Z";

    return (
        <svg ref={ref} viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto">
            {/* Grid rings */}
            {[25, 50, 75, 100].map((level) => {
                const pts = radarPoints.map((_, i) => {
                    const pt = getPoint(i, level);
                    return `${pt.x},${pt.y}`;
                }).join(" ");
                return (
                    <polygon
                        key={level}
                        points={pts}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Axis lines */}
            {radarPoints.map((_, i) => {
                const pt = getPoint(i, 100);
                return (
                    <line
                        key={`axis-${i}`}
                        x1={cx}
                        y1={cy}
                        x2={pt.x}
                        y2={pt.y}
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Data polygon */}
            <motion.path
                d={dataPath}
                fill="rgba(59, 130, 246, 0.12)"
                stroke="var(--accent-blue)"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Data points */}
            {radarPoints.map((p, i) => {
                const pt = getPoint(i, p.value);
                return (
                    <motion.circle
                        key={`dot-${i}`}
                        cx={pt.x}
                        cy={pt.y}
                        r="4"
                        fill="var(--accent-blue)"
                        stroke="rgba(6,8,15,0.8)"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    />
                );
            })}

            {/* Labels */}
            {radarPoints.map((p, i) => {
                const pt = getPoint(i, 120);
                return (
                    <text
                        key={`label-${i}`}
                        x={pt.x}
                        y={pt.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--text-secondary)"
                        fontSize="10"
                        fontWeight="500"
                    >
                        {p.label}
                    </text>
                );
            })}
        </svg>
    );
}

export default function SkillSection() {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-32 md:py-40 overflow-hidden"
        >
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[var(--accent-purple)] opacity-[0.03] blur-[150px]" />

            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <div className="section-label mx-auto w-fit">
                        <Brain className="w-3.5 h-3.5" />
                        AI Skill Intelligence
                    </div>
                    <h2 className="section-title">
                        Deep skill analysis,{" "}
                        <span className="l-gradient-text">crystal-clear insights</span>
                    </h2>
                    <p className="section-desc mx-auto">
                        Our AI engine parses resumes, analyzes skill proficiency, identifies
                        gaps, and creates personalized growth trajectories.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Radar Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <div className="l-glass-card-static p-8 w-full max-w-sm">
                            <RadarChart />
                            <div className="mt-4 text-center">
                                <p className="text-sm text-[var(--test-muted)]">Skill Radar</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills + Counter */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="l-glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <Sparkles className="w-5 h-5 text-[var(--accent-blue)]" />
                                <span className="text-sm font-semibold">AI Match Score</span>
                            </div>
                            <div className="text-5xl font-extrabold l-gradient-text">
                                <AnimatedCounter target={92} />%
                            </div>
                            <p className="text-xs text-[var(--test-muted)] mt-1">
                                Based on 23 skill parameters
                            </p>
                        </motion.div>

                        <div className="space-y-3">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{skill.name}</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)] text-[var(--test-muted)]">
                                                {skill.category}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-[var(--accent-blue)]">
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, var(--accent-blue), var(--accent-purple))`,
                                            }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating skill tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-wrap gap-2 pt-2"
                        >
                            {["React", "Node.js", "Python", "TensorFlow", "Docker", "AWS", "GraphQL", "Redis"].map(
                                (tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.9 + i * 0.06 }}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[rgba(59,130,246,0.08)] text-[var(--accent-blue)] border border-[rgba(59,130,246,0.12)]"
                                    >
                                        {tag}
                                    </motion.span>
                                )
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
