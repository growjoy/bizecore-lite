import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Code2, Database, Lock, Users, Briefcase, Building2 } from 'lucide-react';

export default function ApiReference() {
    const endpoints = [
        {
            category: 'Authentication',
            icon: Lock,
            color: 'emerald',
            apis: [
                { method: 'POST', path: '/api/login', desc: 'Authenticate user and get token' },
                { method: 'POST', path: '/api/logout', desc: 'Logout and invalidate token' },
                { method: 'POST', path: '/api/refresh', desc: 'Refresh authentication token' },
            ]
        },
        {
            category: 'Employees',
            icon: Users,
            color: 'blue',
            apis: [
                { method: 'GET', path: '/api/employees', desc: 'Get all employees' },
                { method: 'GET', path: '/api/employees/{id}', desc: 'Get employee by ID' },
                { method: 'POST', path: '/api/employees', desc: 'Create new employee' },
                { method: 'PUT', path: '/api/employees/{id}', desc: 'Update employee' },
                { method: 'DELETE', path: '/api/employees/{id}', desc: 'Delete employee' },
            ]
        },
        {
            category: 'Divisions',
            icon: Building2,
            color: 'violet',
            apis: [
                { method: 'GET', path: '/api/divisions', desc: 'Get all divisions' },
                { method: 'GET', path: '/api/divisions/{id}', desc: 'Get division by ID' },
                { method: 'POST', path: '/api/divisions', desc: 'Create new division' },
                { method: 'PUT', path: '/api/divisions/{id}', desc: 'Update division' },
                { method: 'DELETE', path: '/api/divisions/{id}', desc: 'Delete division' },
            ]
        },
        {
            category: 'Projects',
            icon: Briefcase,
            color: 'indigo',
            apis: [
                { method: 'GET', path: '/api/projects', desc: 'Get all projects' },
                { method: 'GET', path: '/api/projects/{id}', desc: 'Get project by ID' },
                { method: 'POST', path: '/api/projects', desc: 'Create new project' },
                { method: 'PUT', path: '/api/projects/{id}', desc: 'Update project' },
                { method: 'DELETE', path: '/api/projects/{id}', desc: 'Delete project' },
            ]
        },
    ];

    const getMethodColor = (method) => {
        const colors = {
            'GET': 'bg-blue-50 text-blue-700 border-blue-200',
            'POST': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'PUT': 'bg-amber-50 text-amber-700 border-amber-200',
            'DELETE': 'bg-rose-50 text-rose-700 border-rose-200',
        };
        return colors[method] || 'bg-slate-50 text-slate-700';
    };

    return (
        <MainLayout>
            <Head title="API Reference - Bizecore" />

            {/* Header */}
            <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold mb-6">
                            <Code2 className="w-4 h-4" />
                            API Documentation
                        </div>
                        <h1 className="text-5xl font-black mb-6">API Reference</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Complete reference guide for Bizecore REST API endpoints
                        </p>
                    </div>
                </div>
            </section>

            {/* Base URL Info */}
            <section className="py-12 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                        <h3 className="font-black text-slate-900 mb-3">Base URL</h3>
                        <code className="block p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-sm">
                            https://api.bizecore.com/v1
                        </code>
                        <p className="mt-4 text-sm text-slate-600">
                            All API requests should be made to this base URL. Authentication is required via JWT token in the Authorization header.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoints */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {endpoints.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <div key={idx} className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-${section.color}-50 flex items-center justify-center border border-${section.color}-100`}>
                                            <Icon className={`w-7 h-7 text-${section.color}-600`} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900">{section.category}</h2>
                                            <p className="text-slate-500 text-sm">Manage {section.category.toLowerCase()} data</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {section.apis.map((api, index) => (
                                            <div key={index} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                    <span className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase border ${getMethodColor(api.method)} w-fit`}>
                                                        {api.method}
                                                    </span>
                                                    <code className="flex-1 font-mono text-sm text-slate-900 font-bold">
                                                        {api.path}
                                                    </code>
                                                </div>
                                                <p className="text-sm text-slate-600 mt-3">{api.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Code Example */}
                    <div className="mt-16 bg-slate-900 rounded-3xl p-8 border border-slate-800">
                        <h3 className="text-white font-black text-xl mb-6">Example Request</h3>
                        <pre className="text-emerald-400 font-mono text-sm overflow-x-auto">
                            {`curl -X GET "https://api.bizecore.com/v1/employees" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`}
                        </pre>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
