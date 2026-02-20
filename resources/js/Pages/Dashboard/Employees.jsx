import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { UserPlus, Pencil, Trash2, Search, X, Eye, UserX, ShieldCheck } from 'lucide-react';
import Modal from '@/Components/Modal';
import { LoadingOverlay } from '@/Components/LoadingState';
import FormField from '@/Components/FormField';

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Employees({ auth, employees: interns, divisions, company, roles }) {
    const isAdmin = auth.user.role === 'admin' || auth.user.role === 'superadmin';
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        job_title: '',
        division_id: '',
        status: 'active',
    });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setIsCreateModalOpen(true);
    };

    const openDetailModal = (employee) => {
        setSelectedEmployee(employee);
        setIsDetailModalOpen(true);
    };

    const openEditModal = (employee) => {
        setEditingEmployee(employee);
        setData({
            name: employee.name,
            email: employee.email,
            job_title: employee.job_title,
            division_id: employee.division_id || '',
            status: employee.status,
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const submitStore = (e) => {
        e.preventDefault();
        post(route('dashboard.employees.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            },
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        put(route('dashboard.employees.update', editingEmployee.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const dropOutIntern = (employee) => {
        if (confirm(`Apakah Anda yakin ingin melakukan Drop Out pada anak magang ${employee.name}?`)) {
            destroy(route('dashboard.employees.destroy', employee.id));
        }
    };

    return (
        <DashboardLayout auth={auth}>
            <Head title={`${company?.name || 'Bizecore'} - Personnel Hub`} />

            {processing && <LoadingOverlay />}

            <div className="sm:flex sm:items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight">Intern Database</h1>
                    <p className="mt-2 text-sm text-slate-500">Repository data anak magang dan evaluasi kinerja strategis.</p>
                </div>
                {isAdmin && (
                    <div className="mt-6 sm:mt-0">
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center px-6 py-4 border border-transparent text-sm font-bold rounded-2xl shadow-xl shadow-indigo-100 text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Register Intern
                        </button>
                    </div>
                )}
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                            <tr>
                                <th className="px-8 py-5 text-left">Identity</th>
                                <th className="px-8 py-5 text-center">Role Profile</th>
                                <th className="px-8 py-5 text-center">Designation</th>
                                <th className="px-8 py-5 text-center">Division</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {interns.map((employee) => (
                                <tr key={employee.unique_key || employee.id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 flex-shrink-0 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div className="ml-5">
                                                <div className="text-sm font-bold text-slate-900">{employee.name}</div>
                                                <div className="text-xs text-slate-400">{employee.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-center">
                                        <span className={cn(
                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider",
                                            employee.role_label === 'Intern' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                        )}>
                                            {employee.role_label}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-center">
                                        <div className="text-xs font-black text-slate-500 uppercase tracking-wider">{employee.job_title || (employee.role_label)}</div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-center">
                                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                                            {employee.division?.name || 'Unassigned'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${employee.status === 'inactive' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                                            {employee.is_user ? 'Active' : employee.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-right text-xs font-bold">
                                        <div className="flex justify-end space-x-1">
                                            <button
                                                onClick={() => openDetailModal(employee)}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            {isAdmin && !employee.is_user && (
                                                <>
                                                    <button
                                                        onClick={() => openEditModal(employee)}
                                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => dropOutIntern(employee)}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                        title="Drop Out Intern"
                                                    >
                                                        <UserX className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Intern Information"
            >
                {selectedEmployee && (
                    <div className="p-2">
                        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-50">
                            <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-100">
                                {selectedEmployee.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedEmployee.name}</h3>
                                <p className="text-indigo-600 font-bold text-sm mt-1 uppercase tracking-widest">{selectedEmployee.job_title}</p>
                                <div className="mt-3">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedEmployee.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                        {selectedEmployee.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Division</p>
                                    <p className="text-sm font-bold text-slate-900 bg-slate-50 px-4 py-2 rounded-xl">{selectedEmployee.division?.name || 'Not Assigned'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intern UID</p>
                                    <p className="text-sm font-bold text-slate-900 bg-slate-50 px-4 py-2 rounded-xl">#{String(selectedEmployee.id).padStart(5, '0')}</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                                <p className="text-sm font-bold text-slate-900 bg-slate-50 px-4 py-2 rounded-xl">{selectedEmployee.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Intern Registration"
            >
                <form onSubmit={submitStore} className="space-y-8">
                    <FormField label="Full Identity" error={errors.name}>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className={cn(
                                "w-full px-6 py-4 rounded-2xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-semibold",
                                errors.name ? "border-rose-200 focus:border-rose-500" : "border-slate-100 focus:border-indigo-500"
                            )}
                            placeholder="e.g. Jean Doe"
                        />
                    </FormField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField label="Network Email" error={errors.email}>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className={cn(
                                    "w-full px-6 py-4 rounded-2xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-semibold",
                                    errors.email ? "border-rose-200 focus:border-rose-500" : "border-slate-100 focus:border-indigo-500"
                                )}
                                placeholder="name@company.com"
                            />
                        </FormField>
                        <FormField label="Job Designation" error={errors.job_title}>
                            <input
                                type="text"
                                value={data.job_title}
                                onChange={e => setData('job_title', e.target.value)}
                                className={cn(
                                    "w-full px-6 py-4 rounded-2xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-semibold",
                                    errors.job_title ? "border-rose-200 focus:border-rose-500" : "border-slate-100 focus:border-indigo-500"
                                )}
                                placeholder="e.g. Systems Engineer"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField label="Strategic Unit" error={errors.division_id}>
                            <select
                                value={data.division_id}
                                onChange={e => setData('division_id', e.target.value)}
                                className={cn(
                                    "w-full px-6 py-4 rounded-2xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-semibold appearance-none",
                                    errors.division_id ? "border-rose-200 focus:border-rose-500" : "border-slate-100 focus:border-indigo-500"
                                )}
                            >
                                <option value="">Select Division</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.id}>{division.name}</option>
                                ))}
                            </select>
                        </FormField>
                        <FormField label="Operational Status" error={errors.status}>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold appearance-none"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </FormField>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
                        >
                            {processing ? 'Processing...' : 'Register Intern'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={`Update Information: ${editingEmployee?.name}`}
            >
                <form onSubmit={submitUpdate} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Full Identity</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                        />
                        {errors.name && <p className="mt-2 text-xs text-red-500 font-bold uppercase tracking-wider">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Network Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            />
                            {errors.email && <p className="mt-2 text-xs text-red-500 font-bold">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Job Designation</label>
                            <input
                                type="text"
                                value={data.job_title}
                                onChange={e => setData('job_title', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            />
                            {errors.job_title && <p className="mt-2 text-xs text-red-500 font-bold">{errors.job_title}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Division</label>
                            <select
                                value={data.division_id}
                                onChange={e => setData('division_id', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            >
                                <option value="">Select Strategic Unit</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.id}>{division.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Operational Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-semibold"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest text-xs"
                        >
                            {processing ? 'Processing...' : 'Update Records'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>

    );
}
