import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, router } from '@inertiajs/react';
import { CheckCircle2, Building2, ShieldCheck, ListTodo } from 'lucide-react';

export default function Onboarding({ auth, program, progress }) {
    const steps = program?.steps || [];
    const isCompletedStep = (step) => progress.includes(step.id) || progress.includes(step.label);

    const completedCount = steps.filter(step => isCompletedStep(step)).length;
    const totalCount = steps.length;
    const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    const toggleStep = (step, isCompleted) => {
        router.post(route('dashboard.onboarding.update'), {
            step: step.id,
            completed: !isCompleted
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <DashboardLayout auth={auth}>
            <Head title="My Onboarding" />

            {/* Header & Division Info */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                        <ListTodo className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboarding Protocol</h1>
                        <p className="text-slate-500 font-bold">{program?.subtitle || 'Complete your onboarding checklist.'}</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 mt-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                        <Building2 className="w-48 h-48 text-indigo-900 transform rotate-12 translate-x-12 -translate-y-12" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div>
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full mb-3 inline-block">
                                    Active Program
                                </span>
                                <h2 className="text-2xl font-black text-slate-900">{program?.context_name || '-'}</h2>
                                {program?.description && (
                                    <p className="text-slate-500 mt-2 max-w-2xl font-medium leading-relaxed">
                                        {program.description}
                                    </p>
                                )}
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-6 min-w-[200px] text-center border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-3xl font-black text-indigo-600">{progressPercentage}%</p>
                                <p className="text-xs font-bold text-slate-400 mt-1">Complete</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
                {steps.map((step, index) => {
                    const isCompleted = isCompletedStep(step);
                    return (
                        <div
                            key={step.id}
                            onClick={() => toggleStep(step, isCompleted)}
                            className={`
                                group relative overflow-hidden rounded-2xl p-6 border-2 transition-all cursor-pointer select-none
                                ${isCompleted
                                    ? 'bg-emerald-50/50 border-emerald-100'
                                    : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-lg'
                                }
                            `}
                        >
                            <div className="flex items-center gap-6 relative z-10">
                                <div className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0
                                    ${isCompleted
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                                        : 'bg-slate-100 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white'
                                    }
                                `}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <div className="text-lg font-black">{index + 1}</div>}
                                </div>
                                <div className="flex-1">
                                    <p className={`
                                        text-lg font-bold transition-all
                                        ${isCompleted ? 'text-emerald-900 line-through opacity-50' : 'text-slate-700'}
                                    `}>
                                        {step.label}
                                    </p>
                                </div>
                                {isCompleted && (
                                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        Done
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {steps.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                        <ShieldCheck className="w-12 h-12 text-indigo-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">All Systems Go</h3>
                        <p className="text-slate-400 font-medium">No onboarding protocols required for this program.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
