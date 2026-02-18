import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Footer from '@/Components/Footer';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: route('home'), active: route().current('home') },
        { name: 'Employees', href: route('public.employees'), active: route().current('public.employees') },
        { name: 'Projects', href: route('public.projects'), active: route().current('public.projects') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        {/* Logo - Left */}
                        <div className="flex items-center">
                            <Link
                                href={route('home')}
                                className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
                            >
                                Bizecore
                            </Link>
                        </div>

                        {/* Navigation Links - Right Side */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                                        item.active
                                            ? "text-indigo-600 bg-indigo-50"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="w-px h-6 bg-slate-200 mx-4" />

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 text-sm font-bold hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="px-6 py-3 text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 animate-in slide-in-from-top duration-300">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "block px-4 py-3 rounded-xl text-base font-bold",
                                    item.active ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="block w-full text-center py-4 bg-indigo-600 text-white rounded-2xl font-bold"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="block w-full text-center py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Content */}
            <main className="min-h-[calc(100vh-80px-240px)]">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
