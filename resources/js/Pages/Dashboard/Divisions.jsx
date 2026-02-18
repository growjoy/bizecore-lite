import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Building2, Eye, Users, CheckCircle2, ListTodo, X, ShieldCheck, UserCircle } from 'lucide-react';
import Modal from '@/Components/Modal';

export default function Divisions({ auth, divisions }) {
    const isAdmin = auth.user.role === 'admin' || auth.user.role === 'superadmin';
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [editingDivision, setEditingDivision] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        onboarding_steps: [],
    });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setData('onboarding_steps', []);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (division) => {
        setEditingDivision(division);
        setData({
            name: division.name,
            description: division.description || '',
            onboarding_steps: division.onboarding_steps || [],
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const addOnboardingStep = () => {
        setData('onboarding_steps', [...data.onboarding_steps, '']);
    };

    const removeOnboardingStep = (index) => {
        const newSteps = [...data.onboarding_steps];
        newSteps.splice(index, 1);
        setData('onboarding_steps', newSteps);
    };

    const updateOnboardingStep = (index, value) => {
        const newSteps = [...data.onboarding_steps];
        newSteps[index] = value;
        setData('onboarding_steps', newSteps);
    };

    const submitStore = (e) => {
        e.preventDefault();
        post(route('dashboard.divisions.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            },
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        put(route('dashboard.divisions.update', editingDivision.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const deleteDivision = (division) => {
        if (confirm('Are you sure? This cannot be undone if there are employees.')) {
            destroy(route('dashboard.divisions.destroy', division.id));
        }
    };

    return (
        <DashboardLayout auth={auth}>
            <Head title="Divisions" />

            <div className="sm:flex sm:items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight">Business Divisions</h1>
                    <p className="mt-2 text-sm text-slate-500">Global organizational structure and department tracking.</p>
                </div>
                {isAdmin && (
                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center px-6 py-4 border border-transparent text-sm font-bold rounded-2xl shadow-xl shadow-indigo-100 text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Division
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {divisions.map((division) => (
                    <div key={division.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 hover:shadow-xl transition-all group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="h-14 w-14 bg-indigo-50 text-indigo-600 rounded-[1.25rem] flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                <Building2 className="w-7 h-7" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                UNIT #{division.id}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{division.name}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6 h-12 line-clamp-2">{division.description || 'No description provided.'}</p>

                        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                                <UserCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Project Manager</p>
                                {division.managers && division.managers.length > 0 ? (
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{division.managers.map(m => m.name).join(', ')}</p>
                                ) : (
                                    <p className="text-sm font-bold text-slate-400 italic">Unassigned</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex gap-4">
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{division.members_count}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Headcount</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-indigo-600 tracking-tight">{division.onboarding_steps?.length || 0}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Steps</p>
                                </div>
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => {
                                        setSelectedDivision(division);
                                        setIsDetailModalOpen(true);
                                    }}
                                    className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                                    title="View Intelligence"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => openEditModal(division)}
                                            className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteDivision(division)}
                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Division" maxWidth="max-w-2xl">
                <form onSubmit={submitStore} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Division Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50"
                                placeholder="e.g. Technology & Innovation"
                                required
                            />
                            {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50"
                                placeholder="Briefly describe this division's purpose..."
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Onboarding Protocol</label>
                            <button
                                type="button"
                                onClick={addOnboardingStep}
                                className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg hover:bg-indigo-100 transition-all"
                            >
                                + Add Step
                            </button>
                        </div>
                        <div className="space-y-3">
                            {data.onboarding_steps.map((step, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={step}
                                        onChange={e => updateOnboardingStep(index, e.target.value)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder={`Step ${index + 1}: Personnel initialization...`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOnboardingStep(index)}
                                        className="p-3 text-slate-400 hover:text-red-500 transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            {data.onboarding_steps.length === 0 && (
                                <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    No onboarding steps defined for this division.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={processing} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all">
                            {processing ? 'Processing...' : 'Deploy Division'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modify Division" maxWidth="max-w-2xl">
                <form onSubmit={submitUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Division Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50 font-bold text-lg"
                                required
                            />
                            {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Mission Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Onboarding Steps Configuration</label>
                            <button
                                type="button"
                                onClick={addOnboardingStep}
                                className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg hover:bg-indigo-100 transition-all"
                            >
                                + Add Protocol Step
                            </button>
                        </div>
                        <div className="space-y-3">
                            {data.onboarding_steps.map((step, index) => (
                                <div key={index} className="flex gap-2 group">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-black text-xs">
                                        {index + 1}
                                    </div>
                                    <input
                                        type="text"
                                        value={step}
                                        onChange={e => updateOnboardingStep(index, e.target.value)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOnboardingStep(index)}
                                        className="p-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={processing} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest text-sm">
                            {processing ? 'Synchronizing...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Detail Modal */}
            <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Division Intelligence Overview" maxWidth="max-w-3xl">
                {selectedDivision && (
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="h-20 w-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                                    <Building2 className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 leading-none italic">{selectedDivision.name}</h2>
                                    <p className="text-sm font-bold text-indigo-600 mt-2 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        Verified Operational Unit
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Strategic Mission</h4>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                                        {selectedDivision.description || "Mission parameters for this division have not been initialized."}
                                    </p>
                                </div>

                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Unit Capacity</h4>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-slate-900">{selectedDivision.members_count}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Personnel</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                                    <ListTodo className="w-3 h-3 text-indigo-600" />
                                    Onboarding Protocols
                                </h4>
                                <div className="space-y-4">
                                    {selectedDivision.onboarding_steps?.length > 0 ? (
                                        selectedDivision.onboarding_steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all group">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 leading-tight py-1.5">{step}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                            <AlertCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-slate-400 uppercase">No protocols established</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                            <button onClick={() => setIsDetailModalOpen(false)} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all text-sm uppercase tracking-widest shadow-xl shadow-slate-100">
                                Close Unit Dossier
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </DashboardLayout>
    );
}
