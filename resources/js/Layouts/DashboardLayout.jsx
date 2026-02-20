import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Building2,
    LogOut,
    Menu as MenuIcon,
    X,
    ChevronRight,
    ChevronLeft,
    PanelLeftClose,
    PanelLeftOpen,
    UsersRound,
    AlertCircle,
    UserCog,
    Home,
    Bell,
    CheckCircle2,
    CheckSquare,
    ClipboardCheck,
    ChevronDown,
    UserPlus,
    User,
    Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition as HeadlessTransition } from '@headlessui/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Modal from '@/Components/Modal';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function DashboardLayout({ children }) {
    const { auth, navigation: sharedNav, flash, currentDivision, workerTaskAlerts } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ type: '', text: '' });
    const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isBugModalOpen, setIsBugModalOpen] = useState(false);

    // Persist minimized state
    useEffect(() => {
        const saved = localStorage.getItem('sidebar-minimized');
        if (saved === 'true') setIsMinimized(true);
    }, []);

    const toggleMinimize = () => {
        const newState = !isMinimized;
        setIsMinimized(newState);
        localStorage.setItem('sidebar-minimized', newState.toString());
    };

    // Handle Flash Messages
    useEffect(() => {
        if (flash?.success || flash?.error) {
            setToastMessage({
                type: flash?.success ? 'success' : 'error',
                text: flash?.success || flash?.error
            });
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success, flash?.error]);

    const hasOnboardingAccess = Boolean(auth.user.division_id) || auth.user.role === 'admin' || auth.user.role === 'superadmin';

    const projectPaths = [
        { name: 'Overview', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        ...(hasOnboardingAccess ? [{ name: 'Onboarding', href: route('dashboard.onboarding'), icon: ClipboardCheck, active: route().current('dashboard.onboarding') }] : []),
        { name: 'Projects', href: route('dashboard.projects'), icon: Briefcase, active: route().current('dashboard.projects*') },
        { name: 'Tasks', href: route('dashboard.tasks'), icon: CheckSquare, active: route().current('dashboard.tasks*') },
        { name: 'Divisions', href: route('dashboard.divisions'), icon: Building2, active: route().current('dashboard.divisions*') },
        { name: 'Interns', href: route('dashboard.employees'), icon: Users, active: route().current('dashboard.employees*') },
    ];

    const isAdminOrSuperAdmin = auth.user.role === 'admin' || auth.user.role === 'superadmin';

    const accountPaths = [
        { name: 'My Profile', href: route('dashboard.profile'), icon: UserCog, active: route().current('dashboard.profile') },
        ...(isAdminOrSuperAdmin ? [{
            name: 'User Management',
            href: route('dashboard.users'),
            icon: UserPlus,
            active: route().current('dashboard.users')
        }] : []),
    ];

    const systemPaths = [
        ...(isAdminOrSuperAdmin ? [{
            name: 'Bug Reports',
            href: route('dashboard.bug-reports.index'),
            icon: AlertCircle,
            active: route().current('dashboard.bug-reports.index')
        }] : []),
    ];

    const bugForm = useForm({
        title: '',
        description: '',
        priority: 'medium',
    });

    const handleReportBug = (e) => {
        e.preventDefault();
        bugForm.post(route('dashboard.bug-reports.store'), {
            onSuccess: () => {
                setIsBugModalOpen(false);
                bugForm.reset();
            },
        });
    };

    const backToHome = { name: 'Back to Website', href: route('home'), icon: X, active: false };

    return (
        <div className={cn(
            "min-h-screen flex transition-colors duration-500",
            auth.user.role === 'superadmin' ? "bg-white" : "bg-slate-50"
        )}>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 bg-white border-r border-slate-100 z-50 transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-auto shadow-2xl shadow-slate-200/50",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                isMinimized ? "w-24" : "w-80"
            )}>
                <div className="flex flex-col h-full relative">
                    {/* Toggle Button Desktop */}
                    <button
                        onClick={toggleMinimize}
                        className="hidden lg:flex absolute -right-4 top-12 w-8 h-8 bg-white border border-slate-100 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 shadow-xl z-20 transition-all hover:scale-110 active:scale-95"
                    >
                        {isMinimized ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                    </button>

                    {/* Brand Section */}
                    <div className={cn(
                        "h-24 flex items-center transition-all duration-500 border-b border-slate-50",
                        isMinimized ? "justify-center" : "px-8"
                    )}>
                        {!isMinimized ? (
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 transition-transform group-hover:rotate-12">
                                    B
                                </div>
                                <span className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                                    BIZECORE
                                </span>
                            </Link>
                        ) : (
                            <Link href="/">
                                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 transition-all hover:scale-110 hover:rotate-12">
                                    B
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Navigation Section */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar py-8">
                        <nav className={cn(
                            "space-y-2 transition-all duration-500",
                            isMinimized ? "px-4" : "px-6"
                        )}>
                            <div className={cn("px-4 mb-4", isMinimized ? "hidden" : "block")}>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Project Portfolio</p>
                            </div>

                            {/* Division Dropdown for Admins */}
                            {isAdminOrSuperAdmin && sharedNav?.divisions?.length > 0 && !isMinimized && (
                                <div className="mb-4">
                                    <button
                                        onClick={() => setIsDivisionDropdownOpen(!isDivisionDropdownOpen)}
                                        className={cn(
                                            "w-full group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-black text-slate-600 border border-slate-200 bg-gradient-to-r from-white to-slate-50 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/40 transition-all duration-300",
                                            route().current('dashboard.division.tasks') && "border-indigo-300 from-indigo-50 to-white text-indigo-700 shadow-sm"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                                <Building2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                                            </span>
                                            <span className="tracking-tight">Division Logs</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black tracking-wider">
                                                {sharedNav.divisions.length}
                                            </span>
                                            <ChevronDown className={cn("w-4 h-4 transition-transform", isDivisionDropdownOpen ? "rotate-180 text-indigo-600" : "text-slate-400")} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isDivisionDropdownOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden mt-2 space-y-1.5 p-2 bg-white border border-slate-100 rounded-2xl shadow-lg shadow-slate-100/70"
                                            >
                                                {sharedNav.divisions.map((div) => (
                                                    <Link
                                                        key={div.id}
                                                        href={route('dashboard.division.tasks', { division: div.id })}
                                                        className={cn(
                                                            "block px-3 py-2.5 rounded-xl text-xs font-black tracking-wide text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all",
                                                            route().current('dashboard.division.tasks', { division: div.id }) && "bg-indigo-50 text-indigo-700"
                                                        )}
                                                    >
                                                        {div.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {projectPaths.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    title={isMinimized ? item.name : ""}
                                    className={cn(
                                        "group flex items-center transition-all duration-300",
                                        isMinimized ? "justify-center h-14 w-14 rounded-2xl mx-auto" : "px-5 py-4 rounded-2xl text-sm font-black",
                                        item.active
                                            ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20"
                                            : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5 transition-transform flex-shrink-0 group-hover:scale-110",
                                        isMinimized ? "" : "mr-4",
                                        item.active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                                    )} />
                                    {!isMinimized && (
                                        <span className="flex-1 tracking-tight">{item.name}</span>
                                    )}
                                    {!isMinimized && item.active && (
                                        <motion.div layoutId="nav-indicator" className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                    )}
                                </Link>
                            ))}

                            <div className={cn("px-4 mt-8 mb-4", isMinimized ? "hidden" : "block")}>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Account Management</p>
                            </div>

                            {accountPaths.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    title={isMinimized ? item.name : ""}
                                    className={cn(
                                        "group flex items-center transition-all duration-300",
                                        isMinimized ? "justify-center h-14 w-14 rounded-2xl mx-auto" : "px-5 py-4 rounded-2xl text-sm font-black",
                                        item.active
                                            ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20"
                                            : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5 transition-transform flex-shrink-0 group-hover:scale-110",
                                        isMinimized ? "" : "mr-4",
                                        item.active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                                    )} />
                                    {!isMinimized && (
                                        <span className="flex-1 tracking-tight">{item.name}</span>
                                    )}
                                    {!isMinimized && item.active && (
                                        <motion.div layoutId="nav-indicator-account" className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                    )}
                                </Link>
                            ))}

                            <div className={cn("px-4 mt-8 mb-4", isMinimized ? "hidden" : "block")}>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">System</p>
                            </div>

                            {systemPaths.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    title={isMinimized ? item.name : ""}
                                    className={cn(
                                        "group flex items-center transition-all duration-300",
                                        isMinimized ? "justify-center h-14 w-14 rounded-2xl mx-auto" : "px-5 py-4 rounded-2xl text-sm font-black",
                                        item.active
                                            ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20"
                                            : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5 transition-transform flex-shrink-0 group-hover:scale-110",
                                        isMinimized ? "" : "mr-4",
                                        item.active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                                    )} />
                                    {!isMinimized && (
                                        <span className="flex-1 tracking-tight">{item.name}</span>
                                    )}
                                    {!isMinimized && item.active && (
                                        <motion.div layoutId="nav-indicator-system" className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                    )}
                                </Link>
                            ))}

                            <button
                                onClick={() => setIsBugModalOpen(true)}
                                className={cn(
                                    "w-full group flex items-center transition-all duration-300",
                                    isMinimized ? "justify-center h-14 w-14 rounded-2xl mx-auto" : "px-5 py-4 rounded-2xl text-sm font-black",
                                    "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                                )}
                            >
                                <AlertCircle className={cn(
                                    "h-5 w-5 transition-transform group-hover:scale-110",
                                    isMinimized ? "" : "mr-4",
                                    "text-slate-400 group-hover:text-rose-600"
                                )} />
                                {!isMinimized && <span className="flex-1 text-left tracking-tight">System Report</span>}
                            </button>

                            <Link
                                href={backToHome.href}
                                className={cn(
                                    "group flex items-center transition-all duration-300",
                                    isMinimized ? "justify-center h-14 w-14 rounded-2xl mx-auto" : "px-5 py-4 rounded-2xl text-sm font-black",
                                    "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <X className={cn(
                                    "h-5 w-5 transition-transform group-hover:scale-110",
                                    isMinimized ? "" : "mr-4",
                                    "text-slate-400 group-hover:text-slate-900"
                                )} />
                                {!isMinimized && <span className="flex-1 tracking-tight">Back to Website</span>}
                            </Link>
                        </nav>
                    </div>

                    {/* Footer Progress / Hint (Optional) */}
                    {!isMinimized && (
                        <div className="p-8 border-t border-slate-50">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <p className="text-xs font-bold text-slate-900">System Nominal</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Navbar / Header */}
                <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex items-center px-8 lg:px-12 sticky top-0 z-40 transition-all">
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                className="p-3 text-slate-500 hover:bg-slate-100 rounded-2xl lg:hidden transition-all active:scale-90"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <MenuIcon className="w-6 h-6" />
                            </button>

                            <div className="hidden sm:flex flex-col">
                                <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-0.5 opacity-80">Control Center</h2>
                                <p className="text-xl font-black text-indigo-950 italic tracking-tight">Intelligence Dashboard</p>
                            </div>
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-4">
                            {auth.user.role === 'worker' ? (
                                <div className="relative hidden lg:block">
                                    <button
                                        onClick={() => setIsAlertOpen(prev => !prev)}
                                        className="flex items-center gap-3 px-4 py-2.5 bg-amber-50/60 rounded-2xl border border-amber-100 transition-all hover:bg-white hover:shadow-md"
                                    >
                                        <Bell className="w-4 h-4 text-amber-600" />
                                        <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Task Alerts</span>
                                        {(workerTaskAlerts?.count ?? 0) > 0 && (
                                            <span className="min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">
                                                {workerTaskAlerts.count}
                                            </span>
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isAlertOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 p-3 z-50"
                                            >
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 pb-2">
                                                    Tagged by Project Manager
                                                </p>
                                                {(workerTaskAlerts?.items?.length ?? 0) === 0 ? (
                                                    <p className="text-xs font-bold text-slate-400 px-2 py-3">No pending alerts right now.</p>
                                                ) : (
                                                    <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                                                        {workerTaskAlerts.items.map((task) => (
                                                            <Link
                                                                key={task.id}
                                                                href={route('dashboard.tasks')}
                                                                className="block p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all"
                                                                onClick={() => setIsAlertOpen(false)}
                                                            >
                                                                <p className="text-xs font-black text-slate-800 line-clamp-1">{task.title}</p>
                                                                <p className="text-[10px] text-slate-500 font-bold mt-1">
                                                                    PM: {task.assigned_by || 'Unknown'} | Status: {String(task.status).replace('_', ' ')}
                                                                </p>
                                                                {task.due_date && (
                                                                    <p className="text-[10px] text-amber-600 font-black mt-1">
                                                                        Due: {new Date(task.due_date).toLocaleDateString('en-US')}
                                                                    </p>
                                                                )}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 group cursor-help transition-all hover:bg-white hover:shadow-md">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Network Secure</span>
                                </div>
                            )}

                            <div className="h-10 w-[1px] bg-slate-100 hidden sm:block mx-2" />

                            {/* Profile Dropdown */}
                            <Menu as="div" className="relative">
                                <Menu.Button className="flex items-center gap-3 pl-2 group focus:outline-none">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-black text-indigo-950 leading-none mb-1 group-hover:text-indigo-600 transition-colors">{auth.user.name}</p>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-[0.1em]",
                                                auth.user.role === 'superadmin' ? "bg-rose-50 text-rose-600" : (auth.user.role === 'admin' ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600")
                                            )}>
                                                {auth.user.role === 'admin' ? 'Owner' : (auth.user.role === 'manager' ? 'Project Manager' : (auth.user.role === 'worker' ? 'Field Worker' : auth.user.role))}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-indigo-100 transition-all group-hover:rotate-6 group-hover:scale-110">
                                            {auth.user.name.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-md">
                                            <div className="h-3 w-3 bg-emerald-500 rounded-full border-2 border-white" />
                                        </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-all" />
                                </Menu.Button>

                                <HeadlessTransition
                                    as={React.Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 scale-95 translate-y-1"
                                    enterTo="opacity-100 scale-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 scale-100 translate-y-0"
                                    leaveTo="opacity-0 scale-95 translate-y-1"
                                >
                                    <Menu.Items className="absolute right-0 mt-4 w-64 origin-top-right rounded-[2rem] bg-white shadow-2xl shadow-indigo-100/50 border border-slate-100 focus:outline-none overflow-hidden z-[100] p-2">
                                        <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-900 truncate">{auth.user.email}</p>
                                        </div>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={route('dashboard.profile')}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                                        active ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
                                                    )}
                                                >
                                                    <User className="w-4 h-4" />
                                                    My Profile
                                                </Link>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={route('dashboard.profile')} // Placeholder for settings
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                                        active ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
                                                    )}
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Account Settings
                                                </Link>
                                            )}
                                        </Menu.Item>

                                        <div className="h-px bg-slate-50 my-1 mx-2" />

                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className={cn(
                                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                                                        active ? "bg-rose-50 text-rose-600" : "text-slate-600"
                                                    )}
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </HeadlessTransition>
                            </Menu>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                    {children}
                </main>

                {/* Toast Notification Container */}
                <div className="fixed top-8 right-8 z-[100] pointer-events-none">
                    <AnimatePresence>
                        {showToast && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, y: -20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                className={cn(
                                    "pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-3xl shadow-2xl border min-w-[320px] backdrop-blur-xl transition-all",
                                    toastMessage.type === 'success'
                                        ? "bg-white/90 border-emerald-100 text-emerald-900"
                                        : "bg-white/90 border-rose-100 text-rose-900"
                                )}
                            >
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
                                    toastMessage.type === 'success' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {toastMessage.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">
                                        System Message
                                    </p>
                                    <p className="text-sm font-bold leading-tight">
                                        {toastMessage.text}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowToast(false)}
                                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-slate-400" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bug Report Modal */}
            <Modal
                isOpen={isBugModalOpen}
                onClose={() => setIsBugModalOpen(false)}
                title="Report a bug"
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleReportBug} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Bug Title</label>
                        <input
                            type="text"
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            value={bugForm.data.title}
                            onChange={e => bugForm.setData('title', e.target.value)}
                            placeholder="e.g., Sidebar not rendering correctly on Safari"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Detail Description</label>
                        <textarea
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold min-h-[120px]"
                            value={bugForm.data.description}
                            onChange={e => bugForm.setData('description', e.target.value)}
                            placeholder="Explain what happened and how to reproduce it..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Urgency Level</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['low', 'medium', 'high', 'critical'].map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => bugForm.setData('priority', p)}
                                    className={cn(
                                        "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                                        bugForm.data.priority === p
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                                            : "bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600"
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => setIsBugModalOpen(false)}
                            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={bugForm.processing}
                            className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-bold shadow-xl shadow-rose-100 hover:bg-rose-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <AlertCircle className="w-5 h-5" />
                            <span>Submit Report</span>
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
