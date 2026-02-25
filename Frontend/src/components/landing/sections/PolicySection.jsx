import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, CheckCircle, XCircle, Code } from "lucide-react";

const rules = [
    {
        id: 1,
        name: "Minimum CGPA Requirement",
        logic: "IF student.cgpa < 7.0 THEN BLOCK application",
        status: "active",
        eligible: 842,
        blocked: 158,
    },
    {
        id: 2,
        name: "Maximum Offer Limit",
        logic: "IF student.offers >= 2 THEN RESTRICT new_applications",
        status: "active",
        eligible: 975,
        blocked: 25,
    },
    {
        id: 3,
        name: "Backlog Check",
        logic: "IF student.activeBacklogs > 0 THEN FLAG for_review",
        status: "active",
        eligible: 920,
        blocked: 80,
    },
    {
        id: 4,
        name: "Dream Company Policy",
        logic: "IF student.placed AND company.tier > current.tier THEN ALLOW",
        status: "draft",
        eligible: null,
        blocked: null,
    },
];

function RuleBlock({ rule, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="l-glass-card p-5 relative overflow-hidden group"
        >
            {/* Status indicator */}
            <div className="absolute top-0 left-0 w-1 h-full" style={{
                background: rule.status === "active" ? "var(--accent-emerald)" : "var(--accent-amber)"
            }} />

            <div className="flex items-start justify-between gap-4 pl-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm">{rule.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${rule.status === "active"
                            ? "bg-[rgba(16,185,129,0.1)] text-[var(--accent-emerald)] border border-[rgba(16,185,129,0.2)]"
                            : "bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)] border border-[rgba(245,158,11,0.2)]"
                            }`}>
                            {rule.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)]">
                        <Code className="w-3.5 h-3.5 text-[var(--test-muted)] shrink-0" />
                        <code className="text-xs text-[var(--accent-cyan)] font-mono">
                            {rule.logic}
                        </code>
                    </div>

                    {rule.eligible !== null && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={inView ? { opacity: 1, width: "100%" } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center gap-1.5 text-xs">
                                <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                                <span className="text-[var(--text-secondary)]">{rule.eligible} eligible</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                                <XCircle className="w-3.5 h-3.5 text-[var(--accent-rose)]" />
                                <span className="text-[var(--text-secondary)]">{rule.blocked} blocked</span>
                            </div>
                            <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-[var(--accent-emerald)]"
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: `${(rule.eligible / (rule.eligible + rule.blocked)) * 100}%` } : {}}
                                    transition={{ duration: 0.8, delay: 0.5 + index * 0.15, ease: "easeOut" }}
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function PolicySection() {
    return (
        <section id="policy" className="relative py-32 md:py-40 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent-emerald)] opacity-[0.03] blur-[150px]" />

            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="section-label w-fit">
                            <Shield className="w-3.5 h-3.5" />
                            Policy Engine
                        </div>
                        <h2 className="section-title">
                            Governance on{" "}
                            <span className="l-gradient-text">autopilot</span>
                        </h2>
                        <p className="section-desc mb-8">
                            Define placement policies with simple rule blocks. The engine
                            enforces them in real-time â€” checking eligibility, detecting
                            violations, and maintaining fairness automatically.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: "99.7%", label: "Policy Compliance" },
                                { value: "0.3s", label: "Avg Check Time" },
                                { value: "24/7", label: "Monitoring" },
                                { value: "Zero", label: "Manual Overrides" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                    className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)]"
                                >
                                    <p className="text-2xl font-extrabold l-gradient-text">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-[var(--test-muted)] mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        {rules.map((rule, i) => (
                            <RuleBlock key={rule.id} rule={rule} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
