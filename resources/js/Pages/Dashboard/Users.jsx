import React, { useMemo, useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ShieldCheck,
    UserPlus,
    UserCog,
    RotateCcw,
    Eye,
    EyeOff
} from 'lucide-react';
import Modal from '@/Components/Modal';

export default function Users({ auth, users, divisions }) {
    const isOwner = auth.user.role === 'admin';
    const isProjectManager = auth.user.role === 'manager';
    const isSuperAdmin = auth.user.role === 'superadmin';
    const canFilterDivision = isOwner || isSuperAdmin;
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [divisionFilter, setDivisionFilter] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const roleLabel = (role) => {
        if (role === 'admin') return 'Owner';
        if (role === 'manager') return 'Project Manager';
        if (role === 'worker') return 'Field Worker';
        if (role === 'superadmin') return 'Super Admin';
        return role;
    };

    const roleFilters = isSuperAdmin
        ? [
            { key: 'all', label: 'All Roles' },
            { key: 'superadmin', label: 'Super Admin' },
            { key: 'admin', label: 'Owner' },
            { key: 'manager', label: 'Project Manager' },
            { key: 'worker', label: 'Field Worker' },
        ]
        : (isOwner
            ? [
                { key: 'all', label: 'All Roles' },
                { key: 'manager', label: 'Project Manager' },
                { key: 'worker', label: 'Field Worker' },
            ]
            : [
                { key: 'all', label: 'All Roles' },
                { key: 'worker', label: 'Field Worker' },
            ]);

    const filteredUsers = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return users.filter((user) => {
            const matchRole = roleFilter === 'all' || user.role === roleFilter;
            const matchDivision = divisionFilter === 'all' || String(user.division_id || '') === divisionFilter;
            const matchSearch = term === ''
                || user.name.toLowerCase().includes(term)
                || user.email.toLowerCase().includes(term);
            return matchRole && matchDivision && matchSearch;
        });
    }, [users, roleFilter, divisionFilter, searchTerm]);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        role: isProjectManager ? 'worker' : 'manager',
        division_id: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: isProjectManager ? 'worker' : 'manager',
        division_id: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('dashboard.users.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
                setShowPassword(false);
            },
        });
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
            division_id: user.division_id || '',
        });
        setShowPassword(false);
        setIsEditModalOpen(true);
    };

    const openDetailModal = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('dashboard.users.update', selectedUser.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
                setShowPassword(false);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('dashboard.users.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput.trim());
    };

    const resetSearch = () => {
        setSearchInput('');
        setSearchTerm('');
    };

    return (
        <DashboardLayout auth={auth}>
            <Head title="User Management - Bizecore" />

            <div className="space-y-10 pb-20">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                            {isProjectManager ? 'Worker Management' : (isOwner ? 'Team Management' : 'User Management')}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {isProjectManager ? 'Manage and monitor your dedicated field workers.' : (isOwner ? 'Oversee your project managers and operational staff.' : 'Manage access and permissions for your team.')}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            createForm.reset();
                            setShowPassword(false);
                            setIsCreateModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{isProjectManager ? 'Add New Worker' : 'Add New Account'}</span>
                    </button>
                </div>

                {/* Search & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300">
                                    <Search className="w-5 h-5 stroke-[2.4]" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="w-full pl-14 pr-4 py-3.5 rounded-xl border-2 border-slate-100 bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold shadow-sm placeholder:text-slate-400 placeholder:font-medium"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-3.5 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-wide hover:bg-indigo-700 transition-all"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={resetSearch}
                                className="px-4 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-black uppercase tracking-wide hover:bg-slate-200 transition-all inline-flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </form>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {roleFilters.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setRoleFilter(item.key)}
                                    className={`px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${roleFilter === item.key
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            {canFilterDivision && (
                                <select
                                    className="ml-auto px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500"
                                    value={divisionFilter}
                                    onChange={(e) => setDivisionFilter(e.target.value)}
                                >
                                    <option value="all">All Divisions</option>
                                    {divisions.map((division) => (
                                        <option key={division.id} value={String(division.id)}>
                                            {division.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 px-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <UserCog className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Matched Users</p>
                            <p className="text-xl font-black text-slate-900">{filteredUsers.length}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">From total {users.length}</p>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">User Details</th>
                                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Role</th>
                                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Division</th>
                                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{user.name}</p>
                                                    <p className="text-xs font-semibold text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'superadmin'
                                                    ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                                    : (user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-50 text-slate-600 border border-slate-100')
                                                    }`}>
                                                    {roleLabel(user.role)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                {user.division ? (
                                                    <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-slate-100">
                                                        {user.division.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Unassigned</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openDetailModal(user)}
                                                    className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-xl transition-all"
                                                    title="View Detail"
                                                >
                                                    <Eye className="w-4.5 h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-xl transition-all"
                                                >
                                                    <Edit2 className="w-4.5 h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-white hover:shadow-md rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-4.5 h-4.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-12 text-center">
                                            <p className="text-sm font-bold text-slate-400">No user found with current filters.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Account Details"
                maxWidth="max-w-md"
            >
                {selectedUser && (
                    <div className="p-2">
                        <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-slate-50">
                            <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-100 mb-6">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedUser.name}</h3>
                            <p className="text-indigo-600 font-bold text-sm mt-1 uppercase tracking-widest">{roleLabel(selectedUser.role)}</p>
                            <div className="mt-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedUser.role === 'superadmin' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                                    {selectedUser.role === 'superadmin' ? 'System Root' : 'Active Account'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">Digital Identity</p>
                                <p className="text-sm font-bold text-slate-900 break-all">{selectedUser.email}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">Strategic Unit</p>
                                    <p className="text-sm font-bold text-slate-900">{selectedUser.division?.name || 'Unassigned'}</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">Reg. Date</p>
                                    <p className="text-sm font-bold text-slate-900">{new Date(selectedUser.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => setIsDetailModalOpen(false)}
                                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-[10px]"
                            >
                                Dismiss Protocol
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Create User Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title={isProjectManager ? 'Initiate New Worker' : 'Deploy New Personnel'}
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleCreate} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            value={createForm.data.name}
                            onChange={e => createForm.setData('name', e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        {createForm.errors.name && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{createForm.errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full pl-6 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                                value={createForm.data.email}
                                onChange={e => createForm.setData('email', e.target.value)}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        {createForm.errors.email && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{createForm.errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold pr-14"
                                    value={createForm.data.password}
                                    onChange={e => createForm.setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {createForm.errors.password && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{createForm.errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Access Role</label>
                            {isProjectManager ? (
                                <div className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-100 text-slate-500 font-bold uppercase text-xs flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Field Worker
                                </div>
                            ) : (
                                <select
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold appearance-none"
                                    value={createForm.data.role}
                                    onChange={e => createForm.setData('role', e.target.value)}
                                    required
                                >
                                    {(isOwner || isSuperAdmin) && <option value="manager">Project Manager</option>}
                                    <option value="worker">Field Worker</option>
                                    {isSuperAdmin && (
                                        <>
                                            <option value="admin">Owner (Admin)</option>
                                            <option value="superadmin">Super Admin</option>
                                        </>
                                    )}
                                </select>
                            )}
                        </div>
                    </div>

                    {(isOwner || isSuperAdmin) && (
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Strategic Division</label>
                            <select
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold appearance-none"
                                value={createForm.data.division_id}
                                onChange={e => createForm.setData('division_id', e.target.value)}
                            >
                                <option value="">No Division (Unassigned)</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.id}>{division.name}</option>
                                ))}
                            </select>
                            <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase px-2">Only administrators can assign personnel to strategic units.</p>
                        </div>
                    )}

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createForm.processing}
                            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span>Create Account</span>
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit User Account"
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            value={editForm.data.name}
                            onChange={e => editForm.setData('name', e.target.value)}
                            required
                        />
                        {editForm.errors.name && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{editForm.errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            value={editForm.data.email}
                            onChange={e => editForm.setData('email', e.target.value)}
                            required
                        />
                        {editForm.errors.email && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{editForm.errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Change Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold pr-14"
                                    value={editForm.data.password}
                                    onChange={e => editForm.setData('password', e.target.value)}
                                    placeholder="Leave blank to keep"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {editForm.errors.password && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{editForm.errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Access Role</label>
                            {isProjectManager ? (
                                <div className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-100 text-slate-500 font-bold uppercase text-xs flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Field Worker
                                </div>
                            ) : (
                                <select
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold appearance-none"
                                    value={editForm.data.role}
                                    onChange={e => editForm.setData('role', e.target.value)}
                                    required
                                >
                                    {(isOwner || isSuperAdmin) && <option value="manager">Project Manager</option>}
                                    <option value="worker">Field Worker</option>
                                    {isSuperAdmin && (
                                        <>
                                            <option value="admin">Owner (Admin)</option>
                                            <option value="superadmin">Super Admin</option>
                                        </>
                                    )}
                                </select>
                            )}
                        </div>
                    </div>

                    {(isOwner || isSuperAdmin) && (
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Strategic Division</label>
                            <select
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold appearance-none"
                                value={editForm.data.division_id}
                                onChange={e => editForm.setData('division_id', e.target.value)}
                            >
                                <option value="">No Division (Unassigned)</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.id}>{division.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={editForm.processing}
                            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <UserCog className="w-5 h-5" />
                            <span>Update Profile</span>
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
