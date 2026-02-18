import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { BookOpen, Search, FileText, Code, Download, ExternalLink } from 'lucide-react';

export default function Documentation() {
    const sections = [
        {
            title: 'Getting Started',
            icon: BookOpen,
            items: [
                { name: 'Introduction', desc: 'Learn the basics of Bizecore platform' },
                { name: 'Quick Start Guide', desc: 'Get up and running in 5 minutes' },
                { name: 'Installation', desc: 'Step-by-step installation instructions' },
                { name: 'Configuration', desc: 'Configure your environment' },
            ]
        },
        {
            title: 'Core Concepts',
            icon: FileText,
            items: [
                { name: 'Employee Management', desc: 'Managing your team members' },
                { name: 'Division Structure', desc: 'Organizing company divisions' },
                { name: 'Project Tracking', desc: 'Track and monitor projects' },
                { name: 'Dashboard Analytics', desc: 'Understanding your data' },
            ]
        },
        {
            title: 'Advanced Topics',
            icon: Code,
            items: [
                { name: 'Authentication & Security', desc: 'JWT implementation guide' },
                { name: 'Data Import/Export', desc: 'Bulk operations and migrations' },
                { name: 'Custom Reports', desc: 'Create custom analytics' },
                { name: 'API Integration', desc: 'Integrate with third-party systems' },
            ]
        },
    ];

    return (
        <MainLayout>
            <Head title="Documentation - Bizecore" />

            {/* Header */}
            <section className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-black mb-6">Documentation</h1>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Everything you need to know about using Bizecore platform
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentation Content */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">{section.title}</h2>
                                    </div>

                                    <ul className="space-y-4">
                                        {section.items.map((item, index) => (
                                            <li key={index}>
                                                <a href="#" className="group block p-4 rounded-xl hover:bg-slate-50 transition-all">
                                                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Resources */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 border border-indigo-100">
                            <Download className="w-10 h-10 text-indigo-600 mb-4" />
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Download PDF Guide</h3>
                            <p className="text-slate-600 mb-6">Get the complete documentation as a PDF file for offline reading.</p>
                            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                Download Now
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-8 border border-violet-100">
                            <ExternalLink className="w-10 h-10 text-violet-600 mb-4" />
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Video Tutorials</h3>
                            <p className="text-slate-600 mb-6">Watch step-by-step video guides to master Bizecore features.</p>
                            <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors">
                                Watch Videos
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
