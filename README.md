# 🚀 AI-Powered Placement Governance System

A cutting-edge, cinematic platform designed to revolutionize the campus recruitment lifecycle. Built with a "Mission Control" aesthetic, this system integrates AI-driven candidate matching, predictive analytics, and premium 3D scrollytelling to provide a high-stakes, professional experience for Students, Recruiters, and Admins.

---

## ✨ Key Features

### 👨‍🎓 Student Experience
- **AI Job Matching**: Neural matching of profiles to job descriptions with detailed match-score breakdowns.
- **Skill Intelligence**: Automated gap analysis and personalized learning paths to reach "Top 1%" readiness.
- **Assessment Player**: A cinematic test environments for coding and aptitude assessments.
- **Application Tracker**: Real-time status logging with a visual timeline of the recruitment funnel.

### 💼 Recruiter Portal
- **Candidate Intelligence**: AI-summarized candidate profiles focusing on potential, culture fit, and technical debt.
- **Shortlisting Lab**: Rapid filtering and action-oriented tools for high-volume hiring.
- **Analytics Dashboard**: Real-time data on placement trends and talent pool health.

### 🛡️ Admin & Governance
- **Policy Engine**: High-level rule configuration for placement eligibility and drive synchronization.
- **Governance Dashboard**: Monitoring system-wide compliance and placement success metrics.

---

## 🎨 Design & Motion System

The platform utilizes a custom **Cinematic Animation System** built on **Anime.js**, moving beyond static UI into a dynamic narrative experience.

- **3D Scrollytelling**: Scroll-driven depth effects (`translateZ`) that bring components to life as you navigate.
- **Glassmorphism**: A sleek, dark-mode-first aesthetic with premium blurred overlays and neon accents.
- **Interactive Micro-animations**: Magnetic hover effects, spring-based button feedback, and focus-sweep input glows.
- **Ambient Background**: GPU-accelerated floating particles and gradient blobs that provide a "breathing" feel to the interface.

---

## 🛠️ Tech Stack

### Frontend (Core Application)
- **Framework**: React 19 (Vite)
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4 (Vanilla CSS variables)
- **Animations**: Anime.js (Core), Framer Motion (Transitions)
- **Icons**: Lucide React
- **UI Components**: Radix UI / Shaden UI

### Landing Page
- **Framework**: Next.js 16
- **3D Graphics**: Three.js / React Three Fiber
- **Motion**: GSAP / Lenis (Smooth Scroll)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Placement assist"
   ```

2. **Install Frontend dependencies**:
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Landing Page dependencies**:
   ```bash
   cd ../landing
   npm install
   ```

### Running the Project

To view the full experience, you need to run both the landing page (port 4000) and the main portal (port 3000).

1. **Start the Main Application (Frontend)**:
   ```bash
   # From the /Frontend directory
   npm run dev
   # Site will be available at http://localhost:3000
   ```

2. **Start the Landing Page**:
   ```bash
   # From the /landing directory
   npm run dev
   # Site will be available at http://localhost:4000
   ```

---

## 📂 Project Structure

```text
Placement assist/
├── Frontend/               # Main Application (React + Vite)
│   ├── src/
│   │   ├── components/     # UI, Shared & Layout components
│   │   │   ├── motion/     # Anime.js utility components
│   │   │   └── shared/     # Global cinematic elements
│   │   ├── pages/          # Student, Recruiter & Admin pages
│   │   ├── stores/         # Zustand state (Auth, UI, Notifications)
│   │   └── lib/            # Motion configurations & Utils
│   └── public/
├── landing/                # Marketing/Landing Page (Next.js)
│   └── src/
│       ├── app/            # Next.js App Router
│       └── components/     # 3D & Hero components
└── README.md
```

---

## 🚧 Performance Safeguards

The animation system is built with performance as a priority:
- **GPU Acceleration**: All animations use `transform`, `scale`, and `opacity` to avoid layout thrashing.
- **Intersection Observer**: Heavy reveals only trigger when elements enter the viewport.
- **RequestAnimationFrame**: Complex timelines are synced with the browser's refresh rate via Anime.js.

---

Built with ❤️ for the next generation of talent acquisition.
