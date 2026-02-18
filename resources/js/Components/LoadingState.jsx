import React from 'react';

export default function LoadingSpinner({ size = 'md', color = 'indigo' }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    const colorClasses = {
        indigo: 'border-indigo-600',
        white: 'border-white',
        slate: 'border-slate-400',
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
        </div>
    );
}

export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[9999] flex items-center justify-center animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] animate-pulse">Synchronizing Data...</p>
            </div>
        </div>
    );
}
