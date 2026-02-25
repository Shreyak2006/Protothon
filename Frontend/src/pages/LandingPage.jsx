import React, { lazy, Suspense } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SmoothScroll from '../components/landing/SmoothScroll';
import ScrollProgress from '../components/landing/ScrollProgress';
import ThemeSwitcher from '../components/landing/ThemeSwitcher';

const HeroSection = lazy(() => import('../components/landing/sections/HeroSection'));
const ProblemSection = lazy(() => import('../components/landing/sections/ProblemSection'));
const SolutionSection = lazy(() => import('../components/landing/sections/SolutionSection'));
const SkillSection = lazy(() => import('../components/landing/sections/SkillSection'));
const PolicySection = lazy(() => import('../components/landing/sections/PolicySection'));
const RolesSection = lazy(() => import('../components/landing/sections/RolesSection'));
const AnalyticsSection = lazy(() => import('../components/landing/sections/AnalyticsSection'));
const CTASection = lazy(() => import('../components/landing/sections/CTASection'));

const SectionLoader = () => (
    <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-blue)] border-t-transparent animate-spin" />
    </div>
);

export default function LandingPage() {
    return (
        <div className="landing-root">
            <SmoothScroll>
                <ScrollProgress />
                <ThemeSwitcher />
                <Navbar />
                <main>
                    <Suspense fallback={<SectionLoader />}>
                        <HeroSection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <ProblemSection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <SolutionSection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <SkillSection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <PolicySection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <RolesSection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <AnalyticsSection />
                        <div className="accent-line max-w-lg mx-auto" />
                        <CTASection />
                    </Suspense>
                </main>
                <Footer />
            </SmoothScroll>
        </div>
    );
}
