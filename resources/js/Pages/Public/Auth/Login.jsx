import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-100">
            <Head title="Sign In - Bizecore" />

            {/* Light Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-indigo-50 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-violet-50 rounded-full blur-[120px]"
                />
                {/* Subtle Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[460px] relative z-10"
            >
                {/* Modern Minimal Header */}
                <div className="text-center mb-10">
                    <Link href={route('home')} className="inline-flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:rotate-12 transition-transform duration-500">
                            <Zap className="w-6 h-6 fill-white/20" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 italic">
                            BIZECORE
                        </h1>
                    </Link>
                </div>

                <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-600" />

                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <Sparkles className="w-3 h-3" />
                            Secure Gateway
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Portal Access</h2>
                        <p className="text-slate-500 font-medium mt-1 text-sm">Welcome back to your workspace.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Terminal</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value.trim().toLowerCase())}
                                    className="w-full pl-16 pr-8 py-[1.125rem] rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-50 transition-all font-semibold text-slate-900 placeholder:text-slate-300"
                                    placeholder="Enter authorization email"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[10px] text-rose-500 font-black uppercase tracking-wider px-1 animate-in fade-in slide-in-from-left-2">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Key</label>
                                <button type="button" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Recovery?</button>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full pl-16 pr-16 py-[1.125rem] rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-50 transition-all font-semibold text-slate-900 placeholder:text-slate-300"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-600 transition-all"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[10px] text-rose-500 font-black uppercase tracking-wider px-1 animate-in fade-in slide-in-from-left-2">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full relative group overflow-hidden rounded-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:scale-105 transition-transform duration-500" />
                                <div className="relative py-[1.125rem] flex items-center justify-center font-black uppercase tracking-widest text-sm text-white space-x-2">
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span>Validating</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Unlocking Access</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-xs text-indigo-700 font-semibold leading-relaxed">
                            Demo login: <span className="font-black">lathif@bizecore.com</span> / <span className="font-black">password</span>
                        </div>
                    </form>
                </div>

                {/* Light Minimal Footer */}
                <div className="mt-12 flex flex-col items-center gap-7">
                    <div className="flex items-center gap-8 px-6 py-2 bg-slate-50/50 rounded-full border border-slate-100">
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            Trusted
                        </div>
                        <div className="hidden sm:block w-[1px] h-3 bg-slate-200" />
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Globe className="w-3.5 h-3.5 text-indigo-500" />
                            Encrypted
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 group"
                    >
                        Return to Public Home
                        <div className="w-5 h-px bg-slate-200 group-hover:w-8 group-hover:bg-indigo-600 transition-all shrink-0" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
