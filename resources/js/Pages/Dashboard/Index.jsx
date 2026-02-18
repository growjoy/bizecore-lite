import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { Users, Building2, Briefcase, Zap, AlertCircle, CheckSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({
    stats = {},
    recentEmployees = [],
    recentProjects = [],
    divisionDistribution = [],
}) {
    const safeStats = {
        total_employees: stats.total_employees ?? 0,
        total_divisions: stats.total_divisions ?? 0,
        total_projects: stats.total_projects ?? 0,
        ongoing_projects: stats.ongoing_projects ?? 0,
        total_tasks: stats.total_tasks ?? 0,
        total_bug_reports: stats.total_bug_reports ?? 0,
        total_users: stats.total_users ?? 0,
    };

    const cards = [
        { name: 'Total Employees', value: safeStats.total_employees, icon: Users, color: 'indigo' },
        { name: 'Divisions', value: safeStats.total_divisions, icon: Building2, color: 'violet' },
        { name: 'Total Projects', value: safeStats.total_projects, icon: Briefcase, color: 'blue' },
        { name: 'Ongoing', value: safeStats.ongoing_projects, icon: Zap, color: 'emerald' },
        { name: 'Managed Tasks', value: safeStats.total_tasks, icon: CheckSquare, color: 'amber' },
        { name: 'Bug Reports', value: safeStats.total_bug_reports, icon: AlertCircle, color: 'rose' },
    ];

    const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <DashboardLayout>
            <Head title="Overview" />

            {/* Premium Portal Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full mb-4">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Data Hub</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Web Data Portal</h1>
                    <p className="text-slate-500 mt-2 font-medium">Global intelligence and operational monitoring dashboard.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        Export Report
                    </button>
                    <button className="px-5 py-2.5 bg-indigo-600 rounded-xl text-xs font-black text-white uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Stats Grid - Enhanced */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-10">
                {cards.map((card) => (
                    <div key={card.name} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:scale-150" />

                        <div className="relative z-10">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110",
                                card.color === 'indigo' ? "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" :
                                    card.color === 'violet' ? "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white" :
                                        card.color === 'blue' ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" :
                                            card.color === 'rose' ? "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white" :
                                                card.color === 'amber' ? "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white" :
                                                    "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                            )}>
                                <card.icon className="h-7 w-7" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.name}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 mb-10">
                {/* Chart Section - Expanded */}
                <div className="lg:col-span-2 min-w-0 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight italic">Division Distribution</h3>
                            <p className="text-sm text-slate-500 font-medium">Workforce allocation across business units</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase">Weekly</span>
                        </div>
                    </div>
                    <div className="h-80 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280} debounce={50}>
                            <BarChart data={divisionDistribution}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.12)', padding: '20px' }}
                                />
                                <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={48}>
                                    {divisionDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* System Status / Health - New Feature */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl" />
                    <div className="relative z-10 h-full flex flex-col">
                        <h3 className="text-xl font-black mb-8 italic">Portal Health</h3>
                        <div className="space-y-8 flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400">Database Connection</span>
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-400/30 px-2 py-1 rounded-md">Optimal</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400">Search Engine (ES)</span>
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-400/30 px-2 py-1 rounded-md">Synced</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400">API Gateway</span>
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-400/30 px-2 py-1 rounded-md">Stable</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400">Cloud Storage</span>
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-400/30 px-2 py-1 rounded-md">98% Usage</span>
                            </div>
                        </div>
                        <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Last Backup</p>
                            <p className="text-sm font-bold">Today, 04:00 AM (Auto)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Recent Employees */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 italic">Recent Employees</h3>
                        <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-[0.2em] border-b-2 border-indigo-100 pb-1">View Network</button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentEmployees.map((employee) => (
                            <div key={employee.id} className="p-8 flex items-center hover:bg-slate-50/50 transition-colors group">
                                <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    {employee.name.charAt(0)}
                                </div>
                                <div className="ml-6 flex-1 overflow-hidden">
                                    <p className="text-base font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{employee.name}</p>
                                    <p className="text-xs text-slate-500 font-bold truncate uppercase tracking-wider">{employee.job_title} &bull; {employee.division?.name || 'Unassigned'}</p>
                                </div>
                                <span className={cn(
                                    "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    employee.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                                )}>
                                    {employee.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Projects */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 italic">Global Projects</h3>
                        <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-[0.2em] border-b-2 border-indigo-100 pb-1">Full Portfolio</button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentProjects.map((project) => (
                            <div key={project.id} className="p-8 flex items-center hover:bg-slate-50/50 transition-colors group">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-base font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{project.name}</p>
                                    <p className="text-xs text-slate-500 font-bold truncate uppercase tracking-wider">Entity: {project.client}</p>
                                </div>
                                <span className={cn(
                                    "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    project.status === 'completed' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-orange-50 text-orange-700 border border-orange-100'
                                )}>
                                    {project.status === 'completed' ? 'Delivered' : 'Execution'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
