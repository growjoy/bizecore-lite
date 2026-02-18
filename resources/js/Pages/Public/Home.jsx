import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Briefcase, Building2, ArrowRight, Zap, CheckCircle, Shield, TrendingUp, Clock, Target, Award, Star, Quote, ChevronUp, ExternalLink, CheckCircle2 } from 'lucide-react';
import Modal from '@/Components/Modal';
import { LoadingOverlay } from '@/Components/LoadingState';
import { motion } from 'framer-motion';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Home({ stats = { employees: 0, active_projects: 0, divisions: 0, projects: 0 }, latestProjects = [], distribution = [], teamMembers = [], company = {} }) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <MainLayout>
            <Head title="Home - Company Data Portal" />

            {/* Unified Light Content Wrapper */}
            <div className="relative bg-white overflow-hidden">
                {/* Global Background Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
                    <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-violet-50 rounded-full blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-[40%] left-[10%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-[110px] opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

                    {/* Subtle Pattern */}
                    <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>
                </div>

                {/* Hero Section */}
                <section className="relative pt-24 pb-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm shadow-indigo-100/50">
                                    <Zap className="w-3 h-3 mr-2 animate-pulse fill-indigo-200" />
                                    Next-Gen Enterprise Hub
                                </div>
                                <h1 className="text-6xl sm:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8 italic">
                                    Unified <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Company</span> <br />
                                    Data Hub.
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-lg mb-12">
                                    Access mission-critical data, manage high-impact projects, and track team performance in one seamless, high-performance interface.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <Link
                                        href={route('public.projects')}
                                        className="relative group px-10 py-5 overflow-hidden rounded-2xl bg-indigo-600 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-200 flex items-center justify-center"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative flex items-center">
                                            View Projects
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                    <Link
                                        href={route('public.employees')}
                                        className="px-10 py-5 bg-white/50 backdrop-blur-md border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-white hover:border-indigo-200 transition-all text-center"
                                    >
                                        Discover Teams
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-20 lg:mt-0 relative group">
                                {/* Floating Card Reflection Background */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="relative bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-white shadow-[0_32px_80px_-16px_rgba(79,70,229,0.15)] ring-1 ring-slate-100">
                                    <div className="space-y-10">
                                        <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                                            <div className="space-y-1">
                                                <h3 className="font-black text-slate-900 text-xl tracking-tight italic">Live Network</h3>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Node Status</p>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                            <div className="space-y-1 group/stat">
                                                <p className="text-5xl font-black text-slate-900 tracking-tighter group-hover/stat:text-indigo-600 transition-colors italic">{stats.employees}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Employees</p>
                                            </div>
                                            <div className="space-y-1 group/stat">
                                                <p className="text-5xl font-black text-slate-900 tracking-tighter group-hover/stat:text-indigo-600 transition-colors italic">{stats.active_projects}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Active</p>
                                            </div>
                                            <div className="space-y-1 group/stat">
                                                <p className="text-5xl font-black text-slate-900 tracking-tighter group-hover/stat:text-indigo-600 transition-colors italic">{stats.divisions}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Divisions</p>
                                            </div>
                                            <div className="space-y-1 group/stat">
                                                <p className="text-5xl font-black text-indigo-600 tracking-tighter group-hover/stat:scale-110 transition-transform origin-left italic">{stats.projects}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Company Section */}
                <section id="about" className="relative py-32 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -left-10 -top-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
                                <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
                                    <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center">
                                        <Building2 className="w-32 h-32 text-indigo-200 group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent"></div>
                                    <div className="absolute bottom-10 left-10">
                                        <p className="text-white text-5xl font-black italic tracking-tighter">Established 2024</p>
                                        <p className="text-indigo-200 text-xs font-black uppercase tracking-[0.3em] mt-2">The Intelligence Era</p>
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2 space-y-10">
                                <div>
                                    <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-6">Our Legacy</div>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tight italic mb-8 leading-tight">Driven by Purpose, <br />Defined by Results.</h2>
                                    <div className="space-y-6">
                                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                            {company.history?.about_text || 'Loading description...'}
                                        </p>
                                        <div className="flex gap-10 items-center py-6 border-y border-slate-50">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Our Mission</p>
                                                <p className="text-sm font-bold text-slate-700">{company.history?.mission}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Our Vision</p>
                                                <p className="text-sm font-bold text-slate-700">{company.history?.vision}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-6">
                                    <div className="space-y-2">
                                        <p className="text-4xl font-black text-indigo-600 italic">250+</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Clients</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-4xl font-black text-indigo-600 italic">12+</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Strategic Hubs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Organizational Intelligence (API Stats) */}
                <section className="relative py-24 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-6">Real-time Analytics</div>
                                <h2 className="text-5xl font-black text-indigo-950 tracking-tight italic mb-8 leading-tight">Organizational Intelligence.</h2>
                                <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed max-w-xl">
                                    Direct insight into our operational matrix. Track resource allocation and division growth through live data synchronization.
                                </p>

                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Efficiency Rating</p>
                                        <div className="flex items-end gap-2">
                                            <p className="text-4xl font-black text-indigo-600">98.4<span className="text-lg">%</span></p>
                                            <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
                                        </div>
                                    </div>
                                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Data Sync Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <p className="text-lg font-black text-slate-800 uppercase tracking-tight">Optimized</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3.5rem] p-10 lg:p-14 border border-slate-100 shadow-2xl shadow-indigo-100/30">
                                <h3 className="text-xl font-black text-slate-900 mb-10 italic uppercase tracking-tight">Division Distribution</h3>
                                <div className="space-y-8">
                                    {distribution.map((div, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <p className="text-xs font-black text-indigo-950 uppercase tracking-wider">{div.name}</p>
                                                <p className="text-xs font-black text-indigo-600 uppercase">{div.count} Personnel</p>
                                            </div>
                                            <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${Math.min((div.count / (stats.employees || 1)) * 100, 100)}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {distribution.length === 0 && (
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center py-10">Waiting for intelligence data...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                            <div>
                                <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-6">Execution</div>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tight italic">High-Impact Initiatives</h2>
                                <p className="text-slate-500 font-medium max-w-xl text-lg mt-4 leading-relaxed">Leading edge projects defining the future of our operations.</p>
                            </div>
                            <Link href={route('public.projects')} className="group flex items-center gap-3 px-6 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-white hover:border-indigo-200 transition-all">
                                Full Portfolio
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {latestProjects.map((project) => (
                                <div key={project.id} className="group bg-white/40 backdrop-blur-xl rounded-[3rem] p-10 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all duration-500 hover:shadow-[0_24px_50px_-12px_rgba(79,70,229,0.1)]">
                                    <div className="mb-10 flex items-center justify-between">
                                        <span className={cn(
                                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm",
                                            project.status === 'completed' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                        )}>
                                            {project.status === 'completed' ? 'Delivered' : 'Execution'}
                                        </span>
                                        <button
                                            onClick={() => openDetails(project)}
                                            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h3
                                        className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors cursor-pointer italic"
                                        onClick={() => openDetails(project)}
                                    >
                                        {project.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-12 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="pt-10 border-t border-slate-50 flex items-center justify-between font-sans">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-100 select-none">
                                                {project.pic?.name?.charAt(0) || '?'}
                                            </div>
                                            <div className="leading-tight">
                                                <p className="text-[11px] font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{project.pic?.name || 'Unassigned'}</p>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Project Lead</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Entity</p>
                                            <p className="text-[10px] font-black text-indigo-600 uppercase italic tracking-wider">{project.client}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section (Updated) */}
                <section className="relative py-32 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-6">Human Capital</div>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight italic mb-4">Elite Professionals.</h2>
                            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">The brilliant minds behind our technological architecture.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {teamMembers.slice(0, 4).map((member) => (
                                <div key={member.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:shadow-xl text-center">
                                    <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-3xl font-black text-indigo-600 mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-1">{member.name}</h3>
                                    <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                                        {member.role_label}
                                    </p>
                                    <div className="pt-4 border-t border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.division?.name || 'General Division'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-32 bg-gradient-to-br from-indigo-50 via-white to-violet-50 relative overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Our Process</h2>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">How It Works</h3>
                            <p className="mt-6 text-slate-500 text-xl font-medium max-w-2xl mx-auto">
                                Get started in minutes with our streamlined onboarding process
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                {
                                    step: '01',
                                    icon: Users,
                                    title: 'Sign Up & Setup',
                                    description: 'Create your account and configure your organization profile with our intuitive setup wizard.',
                                    color: 'from-blue-500 to-indigo-600'
                                },
                                {
                                    step: '02',
                                    icon: Target,
                                    title: 'Import Your Data',
                                    description: 'Seamlessly migrate existing employee, division, and project data through our automated import tools.',
                                    color: 'from-indigo-600 to-purple-600'
                                },
                                {
                                    step: '03',
                                    icon: TrendingUp,
                                    title: 'Track & Analyze',
                                    description: 'Monitor real-time metrics, generate insights, and make data-driven decisions with confidence.',
                                    color: 'from-purple-600 to-pink-600'
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="relative group">
                                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
                                            {/* Step Number Background */}
                                            <div className="absolute -top-8 -right-8 text-[120px] font-black text-slate-50 group-hover:text-indigo-50 transition-colors">
                                                {item.step}
                                            </div>

                                            <div className="relative z-10">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h4 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h4>
                                                <p className="text-slate-500 leading-relaxed font-medium">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Connecting Arrow */}
                                        {index < 2 && (
                                            <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                                                <ArrowRight className="w-12 h-12 text-indigo-300" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us</h2>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Built For Performance</h3>
                            <p className="mt-6 text-slate-500 text-xl font-medium max-w-2xl mx-auto">
                                Everything you need to manage your organization efficiently
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: 'Enterprise Security',
                                    description: 'Bank-level encryption and compliance with international data protection standards.',
                                    gradient: 'from-emerald-500 to-teal-600'
                                },
                                {
                                    icon: Clock,
                                    title: 'Real-Time Updates',
                                    description: 'Instant synchronization across all devices with live data streaming technology.',
                                    gradient: 'from-blue-500 to-cyan-600'
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Advanced Analytics',
                                    description: 'Powerful insights with customizable dashboards and automated reporting.',
                                    gradient: 'from-violet-500 to-purple-600'
                                },
                                {
                                    icon: Users,
                                    title: 'Team Collaboration',
                                    description: 'Seamless collaboration tools designed for modern distributed teams.',
                                    gradient: 'from-pink-500 to-rose-600'
                                },
                                {
                                    icon: Zap,
                                    title: 'Lightning Fast',
                                    description: 'Optimized performance with sub-second response times on all operations.',
                                    gradient: 'from-amber-500 to-orange-600'
                                },
                                {
                                    icon: Award,
                                    title: '24/7 Support',
                                    description: 'Dedicated support team available around the clock to assist you.',
                                    gradient: 'from-indigo-500 to-blue-600'
                                },
                            ].map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={index} className="group bg-slate-50 rounded-[2rem] p-8 border border-transparent hover:border-indigo-100 hover:bg-white transition-all duration-500 hover:shadow-2xl">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 mb-3">{benefit.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                            {benefit.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

            </div>

            {/* About & Mission Section */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 skew-x-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">Who We Are</h2>
                                <h3 className="text-5xl font-black tracking-tight leading-tight">Empowering Innovation Through Data Excellence.</h3>
                                <p className="mt-8 text-slate-400 text-xl leading-relaxed font-medium">
                                    Bizecore is a forward-thinking enterprise dedicated to bridging the gap between raw data and actionable intelligence.
                                    Founded with a vision to revolutionize organizational efficiency, we provide world-class management solutions
                                    tailored for modern, data-driven companies.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold">Reliable Systems</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Built on robust architecture to ensure 100% uptime for your critical operations.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-indigo-400/20 border border-indigo-400/30 rounded-xl flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h4 className="text-xl font-bold">Rapid Integration</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Seamlessly connect your existing workflows with our advanced data portal.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] group-hover:bg-indigo-600/40 transition-all"></div>
                                <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">Our Vision</h2>
                                <p className="text-2xl font-bold leading-relaxed">
                                    To become the global cornerstone of organizational intelligence, where every decision is powered by clarity and truth.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group hover:border-violet-500/50 transition-all duration-500">
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] group-hover:bg-violet-600/40 transition-all"></div>
                                <h2 className="text-violet-400 font-bold uppercase tracking-widest text-sm mb-4">Our Mission</h2>
                                <ul className="space-y-6">
                                    {[
                                        'Democratize access to real-time company data for all stakeholders.',
                                        'Build secure and intuitive tools that reduce operational friction.',
                                        'Foster a culture of transparency through unified project tracking.'
                                    ].map((text, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-violet-600/20 flex-shrink-0 flex items-center justify-center mt-1">
                                                <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                                            </div>
                                            <p className="text-slate-300 font-medium">{text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
                        <h3 className="text-5xl font-black tracking-tight leading-tight">Loved By Teams Worldwide</h3>
                        <p className="mt-6 text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                            See what our customers have to say about their experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Sarah Johnson',
                                role: 'CTO, TechCorp',
                                image: '👩‍💼',
                                rating: 5,
                                text: 'Bizecore transformed how we manage our organization. The real-time analytics and intuitive interface have made data-driven decisions effortless.'
                            },
                            {
                                name: 'Michael Chen',
                                role: 'Operations Director, InnovateLabs',
                                image: '👨‍💻',
                                rating: 5,
                                text: 'The best investment we made this year. Project tracking is seamless, and our team productivity has increased by 40% since implementation.'
                            },
                            {
                                name: 'Emily Rodriguez',
                                role: 'HR Manager, GlobalCo',
                                image: '👩‍💼',
                                rating: 5,
                                text: 'Managing 500+ employees has never been easier. The employee management system is robust yet simple to use. Highly recommended!'
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl group">
                                <Quote className="w-10 h-10 text-indigo-400 mb-6 opacity-50" />

                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-slate-300 leading-relaxed font-medium mb-8 text-lg">
                                    "{testimonial.text}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                        {testimonial.image}
                                    </div>
                                    <div>
                                        <h5 className="font-black text-white text-lg">{testimonial.name}</h5>
                                        <p className="text-slate-400 text-sm font-medium">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-20 pt-16 border-t border-white/10 overflow-hidden">
                        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Trusted By Industry Leaders</p>

                        {/* Marquee Animation */}
                        <div className="relative">
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes scroll {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(-50%); }
                                }
                                .animate-scroll {
                                    animation: scroll 20s linear infinite;
                                }
                                .animate-scroll:hover {
                                    animation-play-state: paused;
                                }
                            `}} />

                            <div className="flex animate-scroll">
                                {/* Duplicate the array twice for seamless loop */}
                                {[...Array(2)].map((_, setIndex) => (
                                    <div key={setIndex} className="flex gap-16 px-8">
                                        {['Company A', 'Brand B', 'Corp C', 'Enterprise D', 'Business E', 'Startup F', 'Tech G'].map((company, index) => (
                                            <div key={index} className="text-2xl font-black text-white/30 whitespace-nowrap">
                                                {company}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-2xl shadow-indigo-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-300"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
            {/* Project Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Project Details"
                maxWidth="max-w-xl"
            >
                {selectedProject && (
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className={cn(
                                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                                    selectedProject.status === 'completed' ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
                                )}>
                                    {selectedProject.status === 'completed' ? 'Delivered' : 'Ongoing'}
                                </span>
                                <span className="inline-flex items-center px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <Building2 className="w-3 h-3 mr-1.5" />
                                    {selectedProject.client}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                {selectedProject.name}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-indigo-500" />
                                    Started Date
                                </p>
                                <p className="text-sm font-bold text-slate-900">{selectedProject.start_date || 'TBA'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Target className="w-3 h-3 text-indigo-500" />
                                    Lead Manager
                                </p>
                                <p className="text-sm font-bold text-slate-900">{selectedProject.pic?.name}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                Project Overview
                            </h4>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                {selectedProject.description || "No description provided for this project."}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all text-sm uppercase tracking-widest"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </MainLayout>
    );
}
