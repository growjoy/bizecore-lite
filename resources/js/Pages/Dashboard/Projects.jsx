import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { FolderPlus, Pencil, Trash2, Calendar, User, Building, Eye, Clock, Target, CheckCircle2 } from 'lucide-react';
import Modal from '@/Components/Modal';
import StyledSelect from '@/Components/StyledSelect';
import StyledDatePicker from '@/Components/StyledDatePicker';

export default function Projects({ auth, projects, projectManagers }) {
    const isAdmin = auth.user.role === 'admin' || auth.user.role === 'superadmin';
    const managerOptions = projectManagers.map((m) => ({ value: String(m.id), label: m.name }));
    const statusOptions = [
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
    ];
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [editingProject, setEditingProject] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        client: '',
        pic_id: '',
        status: 'ongoing',
        start_date: '',
        end_date: '',
        description: '',
    });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        setData({
            name: project.name,
            client: project.client,
            pic_id: project.pic_id,
            status: project.status,
            start_date: project.start_date,
            end_date: project.end_date || '',
            description: project.description || '',
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const submitStore = (e) => {
        e.preventDefault();
        post(route('dashboard.projects.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            },
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        put(route('dashboard.projects.update', editingProject.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const deleteProject = (project) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('dashboard.projects.destroy', project.id));
        }
    };

    return (
        <DashboardLayout>
            <Head title="Projects" />

            <div className="sm:flex sm:items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight">Project Portfolio</h1>
                    <p className="mt-2 text-sm text-slate-500">Track initiatives, deliverables, and team performance.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-4">
                    <a
                        href="/dashboard/projects/export"
                        download
                        className="inline-flex items-center px-6 py-4 border border-indigo-100 text-sm font-bold rounded-2xl shadow-xl shadow-indigo-50 text-indigo-600 bg-white hover:bg-slate-50 transition-all"
                    >
                        <Eye className="w-5 h-5 mr-2" />
                        Download Intel
                    </a>
                    {isAdmin && (
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center px-6 py-4 border border-transparent text-sm font-bold rounded-2xl shadow-xl shadow-indigo-100 text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                        >
                            <FolderPlus className="w-5 h-5 mr-2" />
                            Initiate Project
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-100/20 overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-indigo-50/50 text-indigo-400 uppercase text-[10px] font-black tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-6 text-left">Project Intelligence</th>
                                <th className="px-8 py-6 text-left">Client & Mission Lead</th>
                                <th className="px-8 py-6 text-left text-center">Timeline</th>
                                <th className="px-8 py-6 text-left text-center">Deployment Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-indigo-50/30 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-indigo-950 group-hover:text-indigo-600 transition-colors uppercase italic tracking-tight">{project.name}</div>
                                        <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold line-clamp-1 max-w-xs">{project.description || 'No special directives'}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center text-[10px] font-black text-indigo-500 uppercase tracking-[0.1em] mb-1">
                                            <Building className="w-3 h-3 mr-2" />
                                            {project.client}
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-slate-500">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] mr-2 text-indigo-600 font-black">
                                                {project.pic?.name?.charAt(0) || '?'}
                                            </div>
                                            {project.pic?.name || 'No PIC'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 border border-slate-100 italic">
                                            <Calendar className="w-3.5 h-3.5 text-indigo-300" />
                                            {project.start_date}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-emerald-600' : 'bg-amber-600 animate-pulse'}`} />
                                            {project.status === 'completed' ? 'Delivered' : 'Ongoing'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2 transition-all">
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(project);
                                                    setIsDetailModalOpen(true);
                                                }}
                                                className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md border border-transparent hover:border-indigo-100 rounded-xl transition-all"
                                                title="Intel Overview"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            {isAdmin && (
                                                <>
                                                    <button
                                                        onClick={() => openEditModal(project)}
                                                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md border border-transparent hover:border-indigo-100 rounded-xl transition-all"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProject(project)}
                                                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-white hover:shadow-md border border-transparent hover:border-rose-100 rounded-xl transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
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

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Initiate New Project" maxWidth="max-w-3xl">
                <form onSubmit={submitStore} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Project Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50"
                            placeholder="e.g. Enterprise Cloud Migration" />
                        {errors.name && <p className="mt-1 text-xs text-red-500 font-bold">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Client Name</label>
                            <input type="text" value={data.client} onChange={e => setData('client', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lead / PIC</label>
                            <StyledSelect
                                value={data.pic_id}
                                onChange={(value) => setData('pic_id', value)}
                                options={managerOptions}
                                placeholder="Select PIC"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                            <StyledSelect
                                value={data.status}
                                onChange={(value) => setData('status', value)}
                                options={statusOptions}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                            <StyledDatePicker
                                value={data.start_date}
                                onChange={(value) => setData('start_date', value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">End Date (Optional)</label>
                            <StyledDatePicker
                                value={data.end_date}
                                onChange={(value) => setData('end_date', value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Brief Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="3"
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50" />
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={processing} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all disabled:opacity-50">
                            {processing ? 'Processing...' : 'Initiate Project'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Update: ${editingProject?.name}`} maxWidth="max-w-3xl">
                <form onSubmit={submitUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Project Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Client Name</label>
                            <input type="text" value={data.client} onChange={e => setData('client', e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lead / PIC</label>
                            <StyledSelect
                                value={data.pic_id}
                                onChange={(value) => setData('pic_id', value)}
                                options={managerOptions}
                                placeholder="Select PIC"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                            <StyledSelect
                                value={data.status}
                                onChange={(value) => setData('status', value)}
                                options={statusOptions}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                            <StyledDatePicker
                                value={data.start_date}
                                onChange={(value) => setData('start_date', value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">End Date (Optional)</label>
                            <StyledDatePicker
                                value={data.end_date}
                                onChange={(value) => setData('end_date', value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Brief Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="3"
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-slate-50" />
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={processing} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all">
                            {processing ? 'Saving...' : 'Update Details'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Detail Modal */}
            <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Mission Intelligence Overview" maxWidth="max-w-xl">
                {selectedProject && (
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${selectedProject.status === 'completed' ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"}`}>
                                    {selectedProject.status}
                                </span>
                                <span className="inline-flex items-center px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <Building className="w-3 h-3 mr-1.5" />
                                    {selectedProject.client}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 leading-tight italic">
                                {selectedProject.name}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-indigo-500" />
                                    Launch Date
                                </p>
                                <p className="text-sm font-bold text-slate-900">{selectedProject.start_date}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Target className="w-3 h-3 text-indigo-500" />
                                    Mission Lead
                                </p>
                                <p className="text-sm font-bold text-slate-900">{selectedProject.pic?.name}</p>
                            </div>
                            {selectedProject.end_date && (
                                <div className="col-span-2 pt-4 border-t border-slate-200/50 mt-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Calendar className="w-3 h-3 text-emerald-500" />
                                        Expected/Actual Completion
                                    </p>
                                    <p className="text-sm font-bold text-slate-900">{selectedProject.end_date}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                Mission Strategy
                            </h4>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                {selectedProject.description || "No mission constraints or objectives defined."}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <button onClick={() => setIsDetailModalOpen(false)} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all text-sm uppercase tracking-widest">
                                Acknowledge Details
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </DashboardLayout>
    );
}
