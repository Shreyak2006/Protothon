import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Progress } from '../../components/ui/Progress';
import {
    User,
    BookOpen,
    Code,
    FileText,
    ChevronRight,
    ChevronLeft,
    Check,
    Upload,
    Plus,
    X,
    Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Academics', icon: BookOpen },
    { id: 3, title: 'Skills & Tech', icon: Code },
    { id: 4, title: 'Resume & Socials', icon: FileText }
];

export default function ProfileSetupPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: 'Arjun',
        lastName: 'Mehta',
        phone: '',
        university: 'Stanford University',
        course: 'B.Tech Computer Science',
        year: '2026',
        cgpa: '',
        skills: [],
        github: '',
        linkedin: '',
        resume: null
    });
    const [skillInput, setSkillInput] = useState('');
    const navigate = useNavigate();

    const progress = (currentStep / STEPS.length) * 100;

    const nextStep = () => setCurrentStep(s => Math.min(s + 1, STEPS.length));
    const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

    const addSkill = (e) => {
        if (e.key === 'Enter' && skillInput) {
            if (!formData.skills.includes(skillInput)) {
                setFormData({ ...formData, skills: [...formData.skills, skillInput] });
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    const handleComplete = () => {
        // Final submission logic
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#06080F] flex flex-col items-center py-12 px-6">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">
                        <Sparkles className="w-3 h-3" />
                        Onboarding Wizard
                    </div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Complete Your Profile</h1>
                    <p className="text-muted-foreground">This information will be used by AI to match you with top employers.</p>
                </div>

                {/* Stepper */}
                <div className="mb-12 relative">
                    <div className="flex justify-between relative z-10">
                        {STEPS.map(step => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            return (
                                <div key={step.id} className="flex flex-col items-center">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2",
                                        isActive ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110" :
                                            isCompleted ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" :
                                                "bg-card border-border text-muted-foreground"
                                    )}>
                                        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] mt-2 font-bold uppercase tracking-wider",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="absolute top-6 left-6 right-6 h-[2px] bg-border -z-0">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>First Name</Label>
                                        <Input placeholder="Arjun" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Last Name</Label>
                                        <Input placeholder="Mehta" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <Label>University Name</Label>
                                    <Input placeholder="Search university..." value={formData.university} onChange={e => setFormData({ ...formData, university: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Degree / Course</Label>
                                        <Input placeholder="B.Tech CS" value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Graduation Year</Label>
                                        <Input placeholder="2026" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Current CGPA / Percentage</Label>
                                    <Input placeholder="e.g. 9.2" value={formData.cgpa} onChange={e => setFormData({ ...formData, cgpa: e.target.value })} />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <Label>Technical Skills</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <Code className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                            className="pl-10 h-12"
                                            placeholder="Type and press Enter (e.g. React, Python)"
                                            value={skillInput}
                                            onChange={e => setSkillInput(e.target.value)}
                                            onKeyDown={addSkill}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {formData.skills.map(skill => (
                                            <div key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-medium">
                                                {skill}
                                                <button onClick={() => removeSkill(skill)}><X className="w-3 h-3 hover:text-white" /></button>
                                            </div>
                                        ))}
                                        {formData.skills.length === 0 && <p className="text-xs text-muted-foreground italic">No skills added yet.</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <Label>Upload Resume (PDF only)</Label>
                                    <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors group cursor-pointer bg-muted/20">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-6 h-6 text-primary" />
                                        </div>
                                        <p className="text-sm font-bold text-white mb-1">Click to upload or drag & drop</p>
                                        <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
                                        <input type="file" className="hidden" accept=".pdf" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>GitHub Profile</Label>
                                        <Input placeholder="https://github.com/..." value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>LinkedIn Profile</Label>
                                        <Input placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="h-12 rounded-xl px-6"
                        >
                            <ChevronLeft className="mr-2 w-4 h-4" /> Previous
                        </Button>

                        {currentStep < STEPS.length ? (
                            <Button onClick={nextStep} className="h-12 rounded-xl px-8">
                                Next Step <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                        ) : (
                            <Button onClick={handleComplete} className="h-12 rounded-xl px-8 bg-emerald-600 hover:bg-emerald-700">
                                Complete Setup <Check className="ml-2 w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Completeness Tracker */}
                <div className="mt-8 flex items-center gap-6 p-4 bg-muted/20 border border-border rounded-2xl">
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Profile Completeness</span>
                            <span className="text-sm font-bold text-primary leading-none">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                    </div>
                    <div className="hidden sm:block text-[10px] text-muted-foreground max-w-[150px] leading-tight italic">
                        Highly complete profiles get 3x more recruiters' attention.
                    </div>
                </div>
            </div>
        </div>
    );
}
