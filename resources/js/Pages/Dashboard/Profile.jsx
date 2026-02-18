import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    User,
    Mail,
    Lock,
    Shield,
    Building2,
    Save,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

export default function Profile({ user }) {
    const { currentDivision } = usePage().props;

    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setData('password', '');
                setData('password_confirmation', '');
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="My Profile - Bizecore" />

            <div className="max-w-4xl mx-auto space-y-10 pb-20">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-200">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 italic">Personal Space</h1>
                        <p className="text-slate-500 font-medium">Update your account information and secure your access.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Account Status</p>
                                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 italic font-bold text-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Active & Verified</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Access Role</p>
                                <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 italic font-bold text-sm">
                                    <Shield className="w-4 h-4" />
                                    <span className="capitalize">{user.role}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Division</p>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-600 rounded-2xl border border-slate-100 italic font-bold text-sm">
                                    <Building2 className="w-4 h-4" />
                                    <span>{currentDivision?.name || 'Not assigned'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                    <User className="w-5 h-5 text-indigo-600" />
                                    General Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                                        />
                                        {errors.name && <p className="text-xs text-rose-500 font-bold px-1 uppercase tracking-wider">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                                        />
                                        {errors.email && <p className="text-xs text-rose-500 font-bold px-1 uppercase tracking-wider">{errors.email}</p>}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-50" />

                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                    <Lock className="w-5 h-5 text-indigo-600" />
                                    Security & Privacy
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Leave empty to keep"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                                        />
                                        {errors.password && <p className="text-xs text-rose-500 font-bold px-1 uppercase tracking-wider">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                {recentlySuccessful ? (
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold animate-in fade-in slide-in-from-left-4">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span>Saved successfully!</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-400 text-sm italic">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Click save to apply changes</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
