import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage, router } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Trash2,
    User,
    ChevronDown,
    ShieldAlert,
    Filter,
    ArrowUpRight,
    CircleDashed,
    RefreshCcw,
    CheckCircle,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BugReports({ reports }) {
    const [filter, setFilter] = useState('all');

    const filteredReports = reports.filter(r =>
        filter === 'all' ? true : r.status === filter
    );

    const handleUpdateStatus = (id, status) => {
        router.patch(route('dashboard.bug-reports.update', id), {
            status: status
        }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this report? This action is permanent.')) {
            router.delete(route('dashboard.bug-reports.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const priorityColors = {
        low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        medium: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        high: 'bg-orange-50 text-orange-600 border-orange-100',
        critical: 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse',
    };

    const statusIcons = {
        open: { icon: CircleDashed, color: 'text-blue-500', bg: 'bg-blue-50' },
        in_progress: { icon: RefreshCcw, color: 'text-amber-500', bg: 'bg-amber-50' },
        resolved: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        closed: { icon: X, color: 'text-slate-400', bg: 'bg-slate-50' },
    };

    return (
        <DashboardLayout>
            <Head title="Bug Intelligence - Issue Tracker" />

            <div className="space-y-10 pb-20">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-black text-indigo-950 tracking-tight italic">Issue Intelligence</h1>
                        </div>
                        <p className="text-slate-500 font-medium">Global system health monitor & vulnerability tracking center.</p>
                    </div>

                    <div className="flex bg-white p-2 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                        {['all', 'open', 'in_progress', 'resolved'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filter === f
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'text-slate-400 hover:text-indigo-600'
                                    }`}
                            >
                                {f.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {filteredReports.map((report, idx) => {
                        const StatusIcon = statusIcons[report.status].icon;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={report.id}
                                className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden group hover:border-indigo-400/50 transition-all duration-500"
                            >
                                <div className="p-10 lg:p-14 flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1 space-y-8">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className={`flex items-center gap-2 px-5 py-2 rounded-full border ${priorityColors[report.priority]}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                                                    {report.priority} PRIORITY
                                                </span>
                                            </div>
                                            <div className={`flex items-center gap-2 px-5 py-2 rounded-full ${statusIcons[report.status].bg} ${statusIcons[report.status].color}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                                                    {report.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h2 className="text-3xl font-black text-indigo-950 leading-tight italic max-w-2xl group-hover:text-indigo-600 transition-colors">
                                                {report.title}
                                            </h2>
                                            <p className="text-slate-500 text-lg font-medium leading-[1.8] max-w-3xl">
                                                {report.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-3 group/user">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 font-black text-sm border-2 border-white shadow-sm transition-all group-hover/user:bg-indigo-600 group-hover/user:text-white">
                                                    {report.user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Reporter</p>
                                                    <p className="text-sm font-bold text-slate-900">{report.user.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border-2 border-white shadow-sm">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Detected At</p>
                                                    <p className="text-sm font-bold text-slate-900">{new Date(report.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:w-80 flex flex-col justify-between gap-10 bg-indigo-50/30 p-8 rounded-[2.5rem] border border-indigo-100/50">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Lifecycle</p>
                                                <div className="h-px flex-1 bg-indigo-100 ml-4" />
                                            </div>
                                            <div className="grid grid-cols-1 gap-2.5">
                                                {['open', 'in_progress', 'resolved', 'closed'].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleUpdateStatus(report.id, s)}
                                                        className={`group/btn relative px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-left transition-all overflow-hidden ${report.status === s
                                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200'
                                                            : 'bg-white text-slate-400 hover:text-indigo-600 border border-transparent hover:border-indigo-100 uppercase'
                                                            }`}
                                                    >
                                                        <span className="relative z-10 flex items-center justify-between">
                                                            {s.replace('_', ' ')}
                                                            {report.status === s && <ArrowUpRight className="w-4 h-4 ml-2" />}
                                                        </span>
                                                        {report.status !== s && (
                                                            <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(report.id)}
                                            className="w-full py-5 rounded-[1.5rem] bg-rose-50 text-rose-600 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl hover:shadow-rose-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Erase Data
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {filteredReports.length === 0 && (
                        <div className="bg-white rounded-[4rem] border-2 border-dashed border-indigo-100 p-32 text-center space-y-8 shadow-sm">
                            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-inner">
                                <ShieldAlert className="w-12 h-12" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-indigo-950 italic tracking-tight">Zero Threats Detected</h3>
                                <p className="text-slate-400 font-medium text-lg mt-2">All sectors operational. No intelligence reports found in this sector.</p>
                            </div>
                            <button
                                onClick={() => setFilter('all')}
                                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-100"
                            >
                                Reset Monitor
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
