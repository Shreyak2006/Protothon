import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section
            ref={sectionRef}
            id="cta"
            className="relative py-32 md:py-48 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--accent-blue)] opacity-[0.04] blur-[200px]" />
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-purple)] opacity-[0.04] blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--accent-cyan)] opacity-[0.03] blur-[120px]" />
            </div>

            <motion.div
                style={{ scale, opacity }}
                className="section-container relative z-10"
            >
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="section-label mx-auto w-fit mb-8">
                            <Sparkles className="w-3.5 h-3.5" />
                            Get Started
                        </div>

                        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-6">
                            Build the Future{" "}
                            <br className="hidden sm:block" />
                            of{" "}
                            <span className="l-gradient-text">Hiring</span>
                        </h2>

                        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--test-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
                            Join 150+ universities already transforming their placement
                            process with AI. Get started in under a week.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <button className="l-btn-primary text-base px-10 py-4">
                            <span className="flex items-center gap-2">
                                Request a Demo
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </button>
                        <button className="l-btn-outline text-base px-10 py-4">
                            <span>Explore Platform</span>
                        </button>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-8 text-sm text-[var(--test-muted)]"
                    >
                        {["SOC2 Compliant", "GDPR Ready", "99.9% Uptime", "24/7 Support"].map(
                            (badge) => (
                                <span key={badge} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
                                    {badge}
                                </span>
                            )
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="accent-line max-w-xl mx-auto" />
            </div>
        </section>
    );
}
