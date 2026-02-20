import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Mail, Building2, User, ShieldCheck } from 'lucide-react';

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Employees({ employees }) {
    return (
        <MainLayout>
            <Head title="Our Team - Bizecore" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="mb-20">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Our Elite Talent.</h1>
                    <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl">
                        Meet the brilliant minds driving innovation and efficiency across our global divisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {employees.data.map((employee) => (
                        <div key={employee.unique_key || employee.id} className="group bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    {employee.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">{employee.name}</h3>
                                    <div className="flex gap-2 items-center mt-1">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider",
                                            employee.is_intern ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                        )}>
                                            {employee.role_label}
                                        </span>
                                        <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                                            {employee.job_title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        <Building2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm">{employee.division?.name || 'Unassigned'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm truncate">{employee.email}</span>
                                </div>
                            </div>

                            <div className="mt-10">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 animate-pulse">
                                    {employee.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simple Pagination */}
                {employees.links.length > 3 && (
                    <div className="mt-20 flex justify-center gap-2">
                        {employees.links.map((link, i) => (
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
        </MainLayout>
    );
}
