import React from 'react';

export default function FormField({ label, error, children, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {children}
            </div>
            {error && (
                <div className="flex items-center gap-1.5 mt-2 ml-1 text-[10px] font-bold text-rose-500 uppercase tracking-wider animate-in slide-in-from-top-1 duration-300">
                    <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                    {error}
                </div>
            )}
        </div>
    );
}
