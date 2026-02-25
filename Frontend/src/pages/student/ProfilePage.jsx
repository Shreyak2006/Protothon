import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Label, Textarea } from '../../components/ui/Input';
import { CircularProgress, Progress } from '../../components/ui/Progress';
import { Avatar, Tabs } from '../../components/ui/SharedUI';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { studentProfile, skills, projects, certifications, radarSkills } from '../../data/mockData';
import { getInitials } from '../../lib/utils';
import {
    Upload, FileText, Github, Linkedin, Globe, Edit3, Save, X,
    ExternalLink, Award, Star, CheckCircle, AlertCircle,
} from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [editing, setEditing] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const tabs = [
        { label: 'Overview', value: 'overview' },
        { label: 'Projects', value: 'projects', count: projects.length },
        { label: 'Skills', value: 'skills', count: skills.length },
        { label: 'Certifications', value: 'certifications', count: certifications.length },
    ];

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            // Simulate file processing
            console.log('Processing file:', files[0].name);
        }
    }, []);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Profile & Resume</h1>
                <Button variant={editing ? 'default' : 'outline'} size="sm" onClick={() => setEditing(!editing)}>
                    {editing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
                </Button>
            </motion.div>

            {/* Profile Header Card */}
            <motion.div variants={item}>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <Avatar fallback={getInitials(studentProfile.name)} size="xl" />
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl font-bold">{studentProfile.name}</h2>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{studentProfile.department} • {studentProfile.batch}</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{studentProfile.bio}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                    <Badge variant="secondary">CGPA: {studentProfile.cgpa}</Badge>
                                    <Badge variant="secondary">{studentProfile.registerNumber}</Badge>
                                    <Badge variant="ai">
                                        <Star className="w-3 h-3 mr-1" /> ATS Score: {studentProfile.atsScore}/100
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-4">
                                    {studentProfile.github && (
                                        <a href={studentProfile.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {studentProfile.linkedin && (
                                        <a href={studentProfile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    )}
                                    {studentProfile.portfolio && (
                                        <a href={studentProfile.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                                            <Globe className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="shrink-0">
                                <CircularProgress value={studentProfile.atsScore} size={100} strokeWidth={8}>
                                    <div className="text-center">
                                        <p className="text-lg font-bold">{studentProfile.atsScore}</p>
                                        <p className="text-[10px] text-[hsl(var(--muted-foreground))]">ATS</p>
                                    </div>
                                </CircularProgress>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Resume Upload */}
            <motion.div variants={item}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Resume
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragOver
                                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]'
                                : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                                }`}
                        >
                            <FileText className="w-10 h-10 mx-auto mb-3 text-[hsl(var(--muted-foreground))]" />
                            <p className="font-medium mb-1">Drag & drop your resume here</p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">PDF, DOCX up to 5MB</p>
                            <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4" /> Browse Files
                            </Button>
                        </div>
                        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--secondary))]">
                            <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Arjun_Mehta_Resume_2026.pdf</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">Uploaded Feb 20, 2026 • 245 KB</p>
                            </div>
                            <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Parsed</Badge>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={item}>
                        <Card>
                            <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: 'Email', value: studentProfile.email },
                                    { label: 'Phone', value: studentProfile.phone },
                                    { label: 'Department', value: studentProfile.department },
                                    { label: 'Year', value: `${studentProfile.year}th Year, Sem ${studentProfile.semester}` },
                                    { label: 'CGPA', value: studentProfile.cgpa },
                                ].map((field) => (
                                    <div key={field.label} className="flex justify-between items-center">
                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">{field.label}</span>
                                        {editing ? (
                                            <Input className="max-w-[200px] h-8 text-sm" defaultValue={field.value} />
                                        ) : (
                                            <span className="text-sm font-medium">{field.value}</span>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={item}>
                        <Card>
                            <CardHeader><CardTitle>Skills Radar</CardTitle></CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <RadarChart data={radarSkills}>
                                        <PolarGrid stroke="hsl(var(--border))" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}

            {activeTab === 'projects' && (
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={item}>
                            <Card hover>
                                <CardContent className="p-5">
                                    <h3 className="font-semibold mb-2">{project.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.techStack.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {project.github && (
                                            <Button variant="outline" size="sm">
                                                <Github className="w-3 h-3" /> Code
                                            </Button>
                                        )}
                                        {project.demo && (
                                            <Button variant="outline" size="sm">
                                                <ExternalLink className="w-3 h-3" /> Demo
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'skills' && (
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {skills.map((skill) => (
                        <motion.div key={skill.name} variants={item} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                            <span className="text-sm font-medium w-40 shrink-0">{skill.name}</span>
                            <div className="flex-1">
                                <Progress value={skill.level} size="sm" indicatorClassName={skill.level >= 80 ? 'bg-[hsl(var(--success))]' : skill.level >= 60 ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--warning))]'} />
                            </div>
                            <span className="text-sm font-medium tabular-nums w-10 text-right">{skill.level}%</span>
                            <Badge variant="secondary" className="text-[10px]">{skill.category}</Badge>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'certifications' && (
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {certifications.map((cert) => (
                        <motion.div key={cert.id} variants={item}>
                            <Card hover>
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center shrink-0">
                                        <Award className="w-5 h-5 text-[hsl(var(--primary))]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{cert.name}</p>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{cert.issuer} • {new Date(cert.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px]">{cert.credentialId}</Badge>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}
