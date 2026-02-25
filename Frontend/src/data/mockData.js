/* ====================================================
   MOCK DATA — AI Placement Governance System
   Realistic placeholders for all pages
   ==================================================== */

// ───────── STUDENT DASHBOARD ─────────
export const studentProfile = {
    id: 'stu-001',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science',
    year: 4,
    semester: 8,
    cgpa: 8.7,
    registerNumber: 'CS2022001',
    batch: '2022-2026',
    placementReady: 78,
    bio: 'Full-stack developer with a passion for distributed systems and machine learning.',
    github: 'https://github.com/arjunmehta',
    linkedin: 'https://linkedin.com/in/arjunmehta',
    portfolio: 'https://arjunmehta.dev',
    resumeUrl: '/resume.pdf',
    atsScore: 82,
    avatarUrl: null,
};

export const skills = [
    { name: 'React', level: 88, category: 'Frontend', trend: 'up' },
    { name: 'Node.js', level: 75, category: 'Backend', trend: 'up' },
    { name: 'Python', level: 82, category: 'Language', trend: 'stable' },
    { name: 'Data Structures', level: 90, category: 'CS Fundamentals', trend: 'up' },
    { name: 'System Design', level: 55, category: 'CS Fundamentals', trend: 'up' },
    { name: 'Machine Learning', level: 60, category: 'AI/ML', trend: 'up' },
    { name: 'SQL', level: 78, category: 'Database', trend: 'stable' },
    { name: 'Docker', level: 45, category: 'DevOps', trend: 'up' },
    { name: 'AWS', level: 40, category: 'Cloud', trend: 'up' },
    { name: 'TypeScript', level: 70, category: 'Language', trend: 'up' },
    { name: 'Git', level: 85, category: 'Tools', trend: 'stable' },
    { name: 'MongoDB', level: 72, category: 'Database', trend: 'stable' },
];

export const radarSkills = [
    { subject: 'Problem Solving', A: 90, fullMark: 100 },
    { subject: 'System Design', A: 55, fullMark: 100 },
    { subject: 'Communication', A: 75, fullMark: 100 },
    { subject: 'DSA', A: 88, fullMark: 100 },
    { subject: 'Web Dev', A: 85, fullMark: 100 },
    { subject: 'AI/ML', A: 60, fullMark: 100 },
];

export const skillGrowthData = [
    { month: 'Sep', score: 52 },
    { month: 'Oct', score: 58 },
    { month: 'Nov', score: 63 },
    { month: 'Dec', score: 65 },
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 78 },
];

export const suggestedSkills = [
    { name: 'System Design', reason: 'Required by 80% of target companies', priority: 'high', estimatedHours: 40 },
    { name: 'AWS Cloud', reason: 'Growing demand in cloud-native roles', priority: 'medium', estimatedHours: 30 },
    { name: 'Docker & Kubernetes', reason: 'Essential for DevOps and SRE roles', priority: 'medium', estimatedHours: 25 },
    { name: 'GraphQL', reason: 'Increasingly adopted in modern stacks', priority: 'low', estimatedHours: 15 },
];

export const learningPaths = [
    {
        id: 'lp-1',
        title: 'System Design Mastery',
        description: 'From fundamentals to advanced distributed systems',
        progress: 25,
        modules: 12,
        completedModules: 3,
        estimatedHours: 40,
        difficulty: 'Advanced',
    },
    {
        id: 'lp-2',
        title: 'Cloud Architecture (AWS)',
        description: 'Hands-on AWS services and architecture patterns',
        progress: 10,
        modules: 8,
        completedModules: 1,
        estimatedHours: 30,
        difficulty: 'Intermediate',
    },
    {
        id: 'lp-3',
        title: 'DSA Problem Solving',
        description: 'Advanced algorithms and competitive programming',
        progress: 65,
        modules: 15,
        completedModules: 10,
        estimatedHours: 50,
        difficulty: 'Advanced',
    },
];

// ───────── PROJECTS & CERTIFICATIONS ─────────
export const projects = [
    {
        id: 'proj-1',
        title: 'E-Commerce Microservices Platform',
        description: 'Scalable microservices architecture with Node.js, Docker, and Kubernetes. Handles 10K+ concurrent users.',
        techStack: ['Node.js', 'React', 'Docker', 'MongoDB', 'Redis'],
        github: 'https://github.com/arjunmehta/ecommerce-ms',
        demo: 'https://ecommerce-demo.dev',
        image: null,
    },
    {
        id: 'proj-2',
        title: 'AI Resume Parser',
        description: 'NLP-based resume parsing system using spaCy and transformers. Extracts skills, experience, and education.',
        techStack: ['Python', 'spaCy', 'FastAPI', 'React'],
        github: 'https://github.com/arjunmehta/resume-parser',
        demo: null,
        image: null,
    },
    {
        id: 'proj-3',
        title: 'Real-time Chat Application',
        description: 'WebSocket-based chat with end-to-end encryption, file sharing, and group channels.',
        techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        github: 'https://github.com/arjunmehta/realtime-chat',
        demo: 'https://chat-demo.dev',
        image: null,
    },
];

export const certifications = [
    { id: 'cert-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2025-08-15', credentialId: 'AWS-SAA-2025-001' },
    { id: 'cert-2', name: 'Meta React Developer', issuer: 'Meta (Coursera)', date: '2025-06-20', credentialId: 'META-REACT-2025' },
    { id: 'cert-3', name: 'Google Data Analytics', issuer: 'Google (Coursera)', date: '2025-03-10', credentialId: 'GOOGLE-DA-2025' },
];

// ───────── UPCOMING DRIVES ─────────
export const upcomingDrives = [
    { id: 'd-1', company: 'Google', role: 'SDE-2', date: '2026-03-15', package: '₹45 LPA', type: 'On-Campus', status: 'open', eligibility: true },
    { id: 'd-2', company: 'Microsoft', role: 'SDE-1', date: '2026-03-08', package: '₹35 LPA', type: 'On-Campus', status: 'open', eligibility: true },
    { id: 'd-3', company: 'Amazon', role: 'SDE-1', date: '2026-03-20', package: '₹32 LPA', type: 'On-Campus', status: 'upcoming', eligibility: true },
    { id: 'd-4', company: 'Flipkart', role: 'Backend Dev', date: '2026-03-25', package: '₹28 LPA', type: 'On-Campus', status: 'upcoming', eligibility: false },
    { id: 'd-5', company: 'Adobe', role: 'MTS-1', date: '2026-04-02', package: '₹30 LPA', type: 'On-Campus', status: 'upcoming', eligibility: true },
];

// ───────── COMPANY RECOMMENDATIONS ─────────
export const recommendedCompanies = [
    {
        id: 'comp-1',
        name: 'Google',
        logo: null,
        matchScore: 92,
        package: '₹45 LPA',
        location: 'Bangalore',
        domain: 'Technology',
        role: 'Software Engineer L4',
        requirements: ['DSA', 'System Design', 'Problem Solving'],
        reasons: ['Strong DSA skills match', 'React expertise aligned with frontend team needs', 'CGPA above cutoff'],
        openPositions: 5,
        deadline: '2026-03-10',
        bookmarked: false,
    },
    {
        id: 'comp-2',
        name: 'Microsoft',
        logo: null,
        matchScore: 88,
        package: '₹35 LPA',
        location: 'Hyderabad',
        domain: 'Technology',
        role: 'SDE-1',
        requirements: ['C++/Java', 'System Design', 'Cloud'],
        reasons: ['Good problem-solving track record', 'Cloud knowledge is a plus', 'Cultural fit indicators strong'],
        openPositions: 12,
        deadline: '2026-03-05',
        bookmarked: true,
    },
    {
        id: 'comp-3',
        name: 'Razorpay',
        logo: null,
        matchScore: 85,
        package: '₹28 LPA',
        location: 'Bangalore',
        domain: 'Fintech',
        role: 'Full Stack Engineer',
        requirements: ['React', 'Node.js', 'SQL'],
        reasons: ['Full-stack profile is ideal', 'Payment systems knowledge', 'Startup culture preference match'],
        openPositions: 3,
        deadline: '2026-03-15',
        bookmarked: false,
    },
    {
        id: 'comp-4',
        name: 'Adobe',
        logo: null,
        matchScore: 80,
        package: '₹30 LPA',
        location: 'Noida',
        domain: 'Software',
        role: 'Member of Technical Staff',
        requirements: ['JavaScript', 'React', 'CS Fundamentals'],
        reasons: ['Frontend expertise matches team needs', 'Creative portfolio is a differentiator'],
        openPositions: 8,
        deadline: '2026-03-28',
        bookmarked: false,
    },
    {
        id: 'comp-5',
        name: 'Uber',
        logo: null,
        matchScore: 76,
        package: '₹38 LPA',
        location: 'Bangalore',
        domain: 'Transportation',
        role: 'Software Engineer II',
        requirements: ['Distributed Systems', 'Java/Go', 'System Design'],
        reasons: ['System design skills need improvement', 'Strong coding fundamentals'],
        openPositions: 4,
        deadline: '2026-04-05',
        bookmarked: false,
    },
];

// ───────── APPLICATIONS ─────────
export const applications = [
    { id: 'app-1', company: 'Microsoft', role: 'SDE-1', status: 'interview', appliedDate: '2026-02-15', interviewDate: '2026-03-08', package: '₹35 LPA', round: 'Technical Round 2' },
    { id: 'app-2', company: 'Google', role: 'SDE-2', status: 'applied', appliedDate: '2026-02-20', interviewDate: null, package: '₹45 LPA', round: null },
    { id: 'app-3', company: 'Razorpay', role: 'Full Stack', status: 'shortlisted', appliedDate: '2026-02-10', interviewDate: '2026-03-01', package: '₹28 LPA', round: 'Online Assessment' },
    { id: 'app-4', company: 'Infosys', role: 'Systems Engineer', status: 'offer', appliedDate: '2026-01-20', interviewDate: '2026-02-10', package: '₹8 LPA', round: null, offerDeadline: '2026-03-01' },
    { id: 'app-5', company: 'TCS', role: 'Developer', status: 'rejected', appliedDate: '2026-01-15', interviewDate: '2026-02-01', package: '₹7 LPA', round: null, rejectedReason: 'Technical round' },
    { id: 'app-6', company: 'Adobe', role: 'MTS-1', status: 'applied', appliedDate: '2026-02-22', interviewDate: null, package: '₹30 LPA', round: null },
    { id: 'app-7', company: 'Flipkart', role: 'SDE-1', status: 'shortlisted', appliedDate: '2026-02-18', interviewDate: '2026-03-05', package: '₹28 LPA', round: 'Coding Assessment' },
];

// ───────── ASSESSMENTS ─────────
export const assessments = [
    {
        id: 'test-1',
        title: 'Data Structures & Algorithms',
        type: 'Coding',
        difficulty: 'Hard',
        duration: 90,
        questions: 4,
        deadline: '2026-03-05',
        status: 'available',
        score: null,
        topics: ['Arrays', 'Trees', 'Dynamic Programming', 'Graphs'],
    },
    {
        id: 'test-2',
        title: 'System Design Fundamentals',
        type: 'Theory',
        difficulty: 'Medium',
        duration: 60,
        questions: 20,
        deadline: '2026-03-10',
        status: 'available',
        score: null,
        topics: ['Scalability', 'Load Balancing', 'Caching', 'Database Design'],
    },
    {
        id: 'test-3',
        title: 'Web Development Proficiency',
        type: 'Coding',
        difficulty: 'Medium',
        duration: 75,
        questions: 3,
        deadline: '2026-02-28',
        status: 'completed',
        score: 85,
        topics: ['React', 'APIs', 'CSS', 'JavaScript'],
    },
    {
        id: 'test-4',
        title: 'Aptitude & Logical Reasoning',
        type: 'MCQ',
        difficulty: 'Easy',
        duration: 45,
        questions: 30,
        deadline: '2026-03-15',
        status: 'available',
        score: null,
        topics: ['Quantitative', 'Verbal', 'Logical'],
    },
    {
        id: 'test-5',
        title: 'Database Management',
        type: 'Mixed',
        difficulty: 'Medium',
        duration: 60,
        questions: 15,
        deadline: '2026-02-20',
        status: 'completed',
        score: 72,
        topics: ['SQL', 'Normalization', 'Transactions', 'Indexing'],
    },
];

// ───────── RECRUITER DATA ─────────
export const candidatePool = [
    { id: 'c-1', name: 'Arjun Mehta', department: 'CSE', cgpa: 8.7, matchScore: 92, skills: ['React', 'Node.js', 'Python'], status: 'shortlisted', appliedRole: 'SDE-1' },
    { id: 'c-2', name: 'Sneha Patel', department: 'CSE', cgpa: 9.1, matchScore: 95, skills: ['Java', 'Spring Boot', 'AWS'], status: 'interview', appliedRole: 'SDE-1' },
    { id: 'c-3', name: 'Rahul Verma', department: 'IT', cgpa: 8.2, matchScore: 78, skills: ['Python', 'Django', 'ML'], status: 'applied', appliedRole: 'Data Engineer' },
    { id: 'c-4', name: 'Pritha Das', department: 'CSE', cgpa: 8.9, matchScore: 88, skills: ['C++', 'Algorithms', 'System Design'], status: 'shortlisted', appliedRole: 'SDE-1' },
    { id: 'c-5', name: 'Vikram Singh', department: 'ECE', cgpa: 7.8, matchScore: 65, skills: ['Embedded', 'C', 'RTOS'], status: 'applied', appliedRole: 'Embedded Engineer' },
    { id: 'c-6', name: 'Aisha Khan', department: 'CSE', cgpa: 9.3, matchScore: 96, skills: ['ML', 'Python', 'TensorFlow'], status: 'offer', appliedRole: 'ML Engineer' },
    { id: 'c-7', name: 'Karthik Rao', department: 'IT', cgpa: 8.5, matchScore: 82, skills: ['React', 'TypeScript', 'GraphQL'], status: 'interview', appliedRole: 'Frontend Dev' },
    { id: 'c-8', name: 'Meera Nair', department: 'CSE', cgpa: 8.1, matchScore: 74, skills: ['Java', 'Microservices', 'SQL'], status: 'rejected', appliedRole: 'Backend Dev' },
];

export const jobPostings = [
    { id: 'jp-1', role: 'SDE-1', company: 'TechCorp Solutions', package: '₹18 LPA', location: 'Bangalore', type: 'Full-time', applicants: 145, shortlisted: 22, deadline: '2026-03-15' },
    { id: 'jp-2', role: 'Data Engineer', company: 'TechCorp Solutions', package: '₹16 LPA', location: 'Hyderabad', type: 'Full-time', applicants: 89, shortlisted: 12, deadline: '2026-03-20' },
    { id: 'jp-3', role: 'ML Engineer', company: 'TechCorp Solutions', package: '₹22 LPA', location: 'Bangalore', type: 'Full-time', applicants: 67, shortlisted: 8, deadline: '2026-04-01' },
];

// ───────── ADMIN / GOVERNANCE ─────────
export const placementStats = {
    totalStudents: 1247,
    placed: 842,
    placementRate: 67.5,
    avgPackage: 12.4,
    highestPackage: 45,
    medianPackage: 10,
    totalCompanies: 85,
    activeCompanies: 23,
    ongoingDrives: 8,
    upcomingDrives: 15,
    offersExtended: 912,
    offersAccepted: 842,
};

export const departmentStats = [
    { department: 'CSE', placed: 280, total: 320, rate: 87.5, avgPackage: 16.2 },
    { department: 'IT', placed: 180, total: 240, rate: 75.0, avgPackage: 12.8 },
    { department: 'ECE', placed: 150, total: 220, rate: 68.2, avgPackage: 10.5 },
    { department: 'EEE', placed: 90, total: 180, rate: 50.0, avgPackage: 8.2 },
    { department: 'MECH', placed: 72, total: 160, rate: 45.0, avgPackage: 7.5 },
    { department: 'CIVIL', placed: 70, total: 127, rate: 55.1, avgPackage: 6.8 },
];

export const salaryDistribution = [
    { range: '3-5 LPA', count: 120 },
    { range: '5-8 LPA', count: 210 },
    { range: '8-12 LPA', count: 185 },
    { range: '12-18 LPA', count: 150 },
    { range: '18-25 LPA', count: 95 },
    { range: '25-35 LPA', count: 52 },
    { range: '35+ LPA', count: 30 },
];

export const hiringTrends = [
    { year: '2021', placed: 680, companies: 55 },
    { year: '2022', placed: 720, companies: 62 },
    { year: '2023', placed: 695, companies: 58 },
    { year: '2024', placed: 780, companies: 72 },
    { year: '2025', placed: 810, companies: 78 },
    { year: '2026', placed: 842, companies: 85 },
];

export const placementPolicies = [
    {
        id: 'pol-1',
        name: 'Maximum Offers Rule',
        description: 'Students can hold a maximum of 2 offers at any time. Must release one before accepting a third.',
        status: 'active',
        type: 'eligibility',
        logic: 'IF offers_count >= 2 THEN block_new_applications',
        violations: 3,
    },
    {
        id: 'pol-2',
        name: 'CGPA Cutoff',
        description: 'Minimum CGPA of 7.0 required for placement eligibility. Department-wise relaxation available.',
        status: 'active',
        type: 'eligibility',
        logic: 'IF cgpa < 7.0 AND !has_relaxation THEN mark_ineligible',
        violations: 12,
    },
    {
        id: 'pol-3',
        name: 'Backlog Restriction',
        description: 'Students with active backlogs (>2) are restricted from Tier-1 company applications.',
        status: 'active',
        type: 'restriction',
        logic: 'IF active_backlogs > 2 AND company_tier == 1 THEN restrict',
        violations: 8,
    },
    {
        id: 'pol-4',
        name: 'Dream Company Override',
        description: 'Students placed below 10 LPA can apply for dream companies offering 2x their current CTC.',
        status: 'active',
        type: 'override',
        logic: 'IF placed AND new_offer >= 2 * current_offer THEN allow_application',
        violations: 0,
    },
    {
        id: 'pol-5',
        name: 'Attendance Requirement',
        description: 'Minimum 75% attendance in pre-placement training sessions required.',
        status: 'draft',
        type: 'eligibility',
        logic: 'IF ppt_attendance < 75 THEN warn_student',
        violations: 0,
    },
];

export const companyManagement = [
    { id: 'cm-1', name: 'Google', tier: 1, visits: 3, lastVisit: '2025-09-15', status: 'confirmed', contactPerson: 'John Smith', email: 'john@google.com' },
    { id: 'cm-2', name: 'Microsoft', tier: 1, visits: 5, lastVisit: '2025-11-20', status: 'confirmed', contactPerson: 'Sarah Lee', email: 'sarah@microsoft.com' },
    { id: 'cm-3', name: 'Amazon', tier: 1, visits: 4, lastVisit: '2025-10-10', status: 'pending', contactPerson: 'Mike Chen', email: 'mike@amazon.com' },
    { id: 'cm-4', name: 'Flipkart', tier: 2, visits: 6, lastVisit: '2026-01-15', status: 'confirmed', contactPerson: 'Ravi Kumar', email: 'ravi@flipkart.com' },
    { id: 'cm-5', name: 'Infosys', tier: 3, visits: 8, lastVisit: '2026-02-01', status: 'confirmed', contactPerson: 'Anita Desai', email: 'anita@infosys.com' },
];

// ───────── ALERTS & ANNOUNCEMENTS ─────────
export const announcements = [
    { id: 'ann-1', title: 'Pre-placement Talk: Google', message: 'Google PPT scheduled for March 12 at 2:00 PM in Auditorium A.', date: '2026-02-25', priority: 'high' },
    { id: 'ann-2', title: 'Resume Submission Deadline', message: 'All students must submit updated resumes by March 1.', date: '2026-02-24', priority: 'high' },
    { id: 'ann-3', title: 'Mock Interview Sessions', message: 'Sign up for mock interviews with industry professionals. Slots limited.', date: '2026-02-23', priority: 'medium' },
    { id: 'ann-4', title: 'Placement Policy Update', message: 'Updated policies for 2025-26 season are now live. Review in Settings.', date: '2026-02-22', priority: 'low' },
];
