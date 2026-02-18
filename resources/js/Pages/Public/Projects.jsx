import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Calendar, User, Building, ExternalLink, Clock, Target, CheckCircle2 } from 'lucide-react';
import Modal from '@/Components/Modal';

export default function Projects({ projects }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <MainLayout>
            <Head title="Projects - Bizecore" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="mb-20">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Corporate Portfolio.</h1>
                    <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl">
                        A transparent look into our ongoing initiatives and historical company achievements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.data.map((project) => (
                        <div key={project.id} className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                            <div className={`h-3 bg-gradient-to-r ${project.status === 'completed' ? 'from-emerald-400 to-teal-500' : 'from-indigo-400 to-violet-500'}`}></div>

                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <Building className="w-4 h-4 text-indigo-600" />
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{project.client}</span>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'}`}>
                                        {project.status}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                    {project.name}
                                </h3>

                                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10 flex-1 line-clamp-4">
                                    {project.description}
                                </p>

                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400">
                                            {project.pic?.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Lead</p>
                                            <p className="text-xs font-black text-slate-900 leading-none">{project.pic?.name}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openDetails(project)}
                                        className="flex items-center gap-2 bg-indigo-50/50 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest">Details</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simple Pagination */}
                {projects.links.length > 3 && (
                    <div className="mt-20 flex justify-center gap-2">
                        {projects.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url || link.active}
                                onClick={() => window.location.href = link.url}
                                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${link.active
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                                    } ${!link.url ? 'opacity-30' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

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
                                    {selectedProject.status}
                                </span>
                                <span className="inline-flex items-center px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <Building className="w-3 h-3 mr-1.5" />
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
                                <p className="text-sm font-bold text-slate-900">{selectedProject.start_date}</p>
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

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

