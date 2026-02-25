import React from "react";
import { Heart, Sparkles, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = [
    {
        title: "Product",
        links: ["Features", "Pricing", "Security", "Roadmap", "API"],
    },
    {
        title: "Company",
        links: ["About", "Blog", "Careers", "Contact", "Partners"],
    },
    {
        title: "Resources",
        links: ["Documentation", "Help Center", "Community", "Changelog", "Status"],
    },
    {
        title: "Legal",
        links: ["Privacy", "Terms", "Compliance", "GDPR", "Cookies"],
    },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <div className="section-container py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-base font-bold">
                                Place<span className="l-l-gradient-text">AI</span>
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                            AI-Powered Placement Governance for the future of campus hiring.
                        </p>
                        <div className="flex gap-3">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.08)] transition-all"
                                    aria-label="Social link"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="text-sm font-semibold mb-4">{group.title}</h4>
                            <ul className="space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--text-muted)]">
                        Â© 2026 PlaceAI. All rights reserved.
                    </p>
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-[var(--accent-rose)]" /> for the future of education
                    </p>
                </div>
            </div>
        </footer>
    );
}
