import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    GraduationCap,
    Building2,
    Shield,
    BarChart3,
    Users,
    FileText,
    Target,
    Settings,
    Bell,
} from "lucide-react";

const roles = [
    {
        role: "Student",
        icon: GraduationCap,
        color: "var(--accent-blue)",
        description: "Complete self-service portal with AI-driven insights",
        features: [
            { icon: BarChart3, label: "Readiness Dashboard" },
            { icon: FileText, label: "Resume Builder & ATS Score" },
            { icon: Target, label: "AI Job Matching" },
            { icon: Bell, label: "Real-time Notifications" },
        ],
        mockStats: [
            { label: "Match Score", value: "92%" },
            { label: "Applications", value: "12" },
            { label: "Interviews", value: "4" },
        ],
    },
    {
        role: "Recruiter",
        icon: Building2,
        color: "var(--accent-purple)",
        description: "Streamlined hiring with AI-powered candidate ranking",
        features: [
            { icon: Users, label: "Candidate Pool Explorer" },
            { icon: Target, label: "AI Shortlist Engine" },
            { icon: FileText, label: "Job Posting Wizard" },
            { icon: BarChart3, label: "Hiring Analytics" },
        ],
        mockStats: [
            { label: "Candidates", value: "1,240" },
            { label: "Shortlisted", value: "86" },
            { label: "Positions", value: "12" },
        ],
    },
    {
        role: "Admin",
        icon: Shield,
        color: "var(--accent-emerald)",
        description: "Full governance control with policy automation",
        features: [
            { icon: Shield, label: "Policy Engine" },
            { icon: BarChart3, label: "Placement Analytics" },
            { icon: Settings, label: "Company Management" },
            { icon: Users, label: "Student Monitoring" },
        ],
        mockStats: [
            { label: "Placement Rate", value: "87%" },
            { label: "Companies", value: "45" },
            { label: "Active Policies", value: "8" },
        ],
    },
];

export default function RolesSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const x = useTransform(scrollYProgress, [0.2, 0.8], ["5%", "-5%"]);

    return (
        <section
            ref={containerRef}
            id="roles"
            className="relative py-32 md:py-40 overflow-hidden"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--accent-blue)] opacity-[0.02] blur-[200px]" />

            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <div className="section-label mx-auto w-fit">
                        <Users className="w-3.5 h-3.5" />
                        Role-Based Platform
                    </div>
                    <h2 className="section-title">
                        Tailored for{" "}
                        <span className="l-gradient-text">every stakeholder</span>
                    </h2>
                    <p className="section-desc mx-auto">
                        Each role gets a purpose-built experience â€” from students tracking
                        applications to admins configuring policies.
                    </p>
                </motion.div>

                <motion.div style={{ x }} className="will-change-transform">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {roles.map((role, index) => (
                            <motion.div
                                key={role.role}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                            >
                                <div className="l-glass-card p-6 h-full flex flex-col group">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ background: `${role.color}12` }}
                                        >
                                            <role.icon
                                                className="w-6 h-6"
                                                style={{ color: role.color }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{role.role}</h3>
                                            <p className="text-[11px] text-[var(--test-muted)]">
                                                {role.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mini stats */}
                                    <div className="grid grid-cols-3 gap-2 mb-5">
                                        {role.mockStats.map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="p-2.5 rounded-xl text-center"
                                                style={{
                                                    background: `${role.color}06`,
                                                    border: `1px solid ${role.color}10`,
                                                }}
                                            >
                                                <p
                                                    className="text-lg font-bold"
                                                    style={{ color: role.color }}
                                                >
                                                    {stat.value}
                                                </p>
                                                <p className="text-[9px] text-[var(--text-muted)]">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 flex-1">
                                        {role.features.map((feature, i) => (
                                            <motion.div
                                                key={feature.label}
                                                initial={{ opacity: 0, x: -15 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                                                className="flex items-center gap-3 p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors"
                                            >
                                                <feature.icon className="w-4 h-4 text-[var(--test-muted)]" />
                                                <span className="text-sm">{feature.label}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
