import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Plus,
    MoreHorizontal,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle2,
    Circle,
    Trash2,
    Layout
} from 'lucide-react';
import Modal from '@/Components/Modal';
import StyledSelect from '@/Components/StyledSelect';
import StyledDatePicker from '@/Components/StyledDatePicker';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = [
    { id: 'not_started', label: 'Not started', color: 'bg-slate-500', icon: Circle },
    { id: 'upcoming', label: 'Upcoming Work', color: 'bg-amber-500', icon: Clock },
    { id: 'in_progress', label: 'In progress', color: 'bg-indigo-500', icon: Layout },
    { id: 'revision', label: 'Revision', color: 'bg-rose-500', icon: AlertCircle },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-500', icon: CheckCircle2 },
];

export default function Tasks({ auth, tasks, workers, selectedDivision = null }) {
    const canManage = ['admin', 'superadmin', 'manager'].includes(auth.user.role);
    const [localTasks, setLocalTasks] = useState(tasks);
    const workerOptions = workers.map((w) => ({ value: String(w.id), label: w.name }));
    const statusOptions = columns.map((c) => ({ value: c.id, label: c.label }));
    const priorityOptions = [
        { value: 'low', label: 'Low Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'high', label: 'High Priority' },
    ];

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        description: '',
        user_id: canManage ? '' : auth.user.id,
        status: 'not_started',
        priority: 'medium',
        due_date: '',
    });

    const openCreateModal = (status = 'not_started') => {
        reset();
        setData('status', status);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setData({
            title: task.title,
            description: task.description || '',
            user_id: task.user_id,
            status: task.status,
            priority: task.priority,
            due_date: task.due_date || '',
        });
        setIsEditModalOpen(true);
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        post(route('dashboard.tasks.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    const handleUpdateTask = (e) => {
        e.preventDefault();
        // Optimistic update for edit modal
        const updatedLocalTasks = localTasks.map(t =>
            t.id === selectedTask.id ? { ...t, ...data, user: workers.find(w => w.id == data.user_id) || auth.user } : t
        );
        setLocalTasks(updatedLocalTasks);

        put(route('dashboard.tasks.update', selectedTask.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
            }
        });
    };

    const handleDeleteTask = (task) => {
        if (confirm('Are you sure you want to delete this task?')) {
            const updatedLocalTasks = localTasks.filter(t => t.id !== task.id);
            setLocalTasks(updatedLocalTasks);
            destroy(route('dashboard.tasks.destroy', task.id));
        }
    };

    // Drag and Drop Handler
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId;
        const taskId = parseInt(draggableId);

        // Optimistic Update
        const newLocalTasks = localTasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: newStatus };
            }
            return task;
        });

        setLocalTasks(newLocalTasks);

        // Server Update
        router.put(route('dashboard.tasks.update', taskId), {
            status: newStatus
        }, {
            preserveScroll: true,
            preserveState: true,
            onError: () => {
                // Revert on error if needed (optional implementation)
                setLocalTasks(tasks);
            }
        });
    };


    const groupedTasks = useMemo(() => {
        return columns.reduce((acc, col) => {
            acc[col.id] = localTasks.filter(t => t.status === col.id);
            return acc;
        }, {});
    }, [localTasks]);

    const priorityBadge = (priority) => {
        const styles = {
            low: 'bg-slate-100 text-slate-600',
            medium: 'bg-indigo-50 text-indigo-600',
            high: 'bg-rose-50 text-rose-600',
        };
        return (
            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${styles[priority]}`}>
                {priority}
            </span>
        );
    };

    return (
        <DashboardLayout>
            <Head title="Task Intelligence - Kanban Board" />

            <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
                {/* Board Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                                <Layout className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-black text-indigo-950 tracking-tight italic">Environment Work</h1>
                        </div>
                        <p className="text-slate-400 font-medium">
                            {selectedDivision?.name
                                ? `Task matrix for division: ${selectedDivision.name}`
                                : 'Strategic task allocation and progress monitoring matrix.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                                <Layout className="w-4 h-4" />
                                Board view
                            </button>
                        </div>
                        {canManage && (
                            <button
                                onClick={() => openCreateModal()}
                                className="inline-flex items-center px-6 py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                New task
                            </button>
                        )}
                    </div>
                </div>

                {/* Kanban Board */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex-1 overflow-x-auto pb-6 -mx-4 px-4 custom-scrollbar">
                        <div className="flex gap-6 h-full min-w-max">
                            {columns.map((col) => (
                                <div key={col.id} className="w-80 flex flex-col group">
                                    <div className="flex items-center justify-between mb-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${col.color}`}>
                                                {col.label}
                                            </div>
                                            <span className="text-sm font-bold text-slate-400 tracking-tight">
                                                {groupedTasks[col.id]?.length || 0}
                                            </span>
                                        </div>
                                        <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <Droppable droppableId={col.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`flex-1 rounded-[2.5rem] p-4 border transition-colors overflow-y-auto custom-scrollbar
                                                    ${snapshot.isDraggingOver ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-50/50 border-slate-100/50'}
                                                `}
                                            >
                                                <div className="space-y-4">
                                                    {canManage && (
                                                        <button
                                                            onClick={() => openCreateModal(col.id)}
                                                            className="w-full py-4 px-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-white transition-all group/new"
                                                        >
                                                            <Plus className="w-4 h-4 inline-block mr-1 group-hover/new:rotate-90 transition-transform" />
                                                            New task
                                                        </button>
                                                    )}

                                                    {groupedTasks[col.id].map((task, index) => (
                                                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{ ...provided.draggableProps.style }}
                                                                    className={`bg-white p-5 rounded-3xl border shadow-sm transition-all group/card
                                                                        ${snapshot.isDragging ? 'rotate-2 scale-105 shadow-2xl border-indigo-300 z-50' : 'border-slate-100 hover:shadow-xl hover:shadow-indigo-100/30 hover:border-indigo-200'}
                                                                    `}
                                                                    onClick={() => openEditModal(task)}
                                                                >
                                                                    <div className="space-y-4">
                                                                        <div className="flex justify-between items-start">
                                                                            <h4 className="text-sm font-black text-indigo-950 tracking-tight leading-tight group-hover/card:text-indigo-600 transition-colors">
                                                                                {task.title}
                                                                            </h4>
                                                                            {canManage && (
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleDeleteTask(task);
                                                                                    }}
                                                                                    className="p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover/card:opacity-100"
                                                                                >
                                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                                </button>
                                                                            )}
                                                                        </div>

                                                                        {task.description && (
                                                                            <p className="text-xs text-slate-400 font-medium line-clamp-2">
                                                                                {task.description}
                                                                            </p>
                                                                        )}

                                                                        <div className="flex items-center justify-between pt-2">
                                                                            <div className="flex items-center gap-2">
                                                                                {task.user && (
                                                                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100">
                                                                                        <div className="w-5 h-5 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                                                                                            {task.user.name.charAt(0)}
                                                                                        </div>
                                                                                        <span className="text-[10px] font-bold text-slate-600 truncate max-w-[80px]">
                                                                                            {task.user.name}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                                {priorityBadge(task.priority)}
                                                                            </div>
                                                                            {task.due_date && (
                                                                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                                                    <Calendar className="w-3 h-3" />
                                                                                    {new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
                        </div>
                    </div>
                </DragDropContext>
            </div>

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Initiate New Task">
                <form onSubmit={handleCreateTask} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Objective Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-bold"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Ente objective title..."
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Strategic Description</label>
                        <textarea
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium min-h-[100px]"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Operational details and mission parameters..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {canManage && (
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Deploy to Personnel</label>
                                <StyledSelect
                                    value={data.user_id}
                                    onChange={(value) => setData('user_id', value)}
                                    options={workerOptions}
                                    placeholder="Select personnel"
                                />
                            </div>
                        )}
                        <div className={canManage ? "" : "col-span-2"}>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Deadline</label>
                            <StyledDatePicker
                                value={data.due_date}
                                onChange={(value) => setData('due_date', value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Current Sector</label>
                            <StyledSelect
                                value={data.status}
                                onChange={(value) => setData('status', value)}
                                options={statusOptions}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Priority Level</label>
                            <StyledSelect
                                value={data.priority}
                                onChange={(value) => setData('priority', value)}
                                options={priorityOptions}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.01] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Processing Signal...' : 'Deploy Task'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Objective Details">
                <form onSubmit={handleUpdateTask} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Objective Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-bold"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Strategic Description</label>
                        <textarea
                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium min-h-[100px]"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Delegated Personnel</label>
                            {canManage ? (
                                <StyledSelect
                                    value={data.user_id}
                                    onChange={(value) => setData('user_id', value)}
                                    options={workerOptions}
                                    placeholder="Select personnel"
                                />
                            ) : (
                                <div className="px-6 py-4 rounded-2xl bg-slate-100 text-slate-500 text-xs font-bold uppercase">
                                    {auth.user.name}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Priority Level</label>
                            <StyledSelect
                                value={data.priority}
                                onChange={(value) => setData('priority', value)}
                                options={priorityOptions}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Task Sector</label>
                            <StyledSelect
                                value={data.status}
                                onChange={(value) => setData('status', value)}
                                options={statusOptions}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Deadline Date</label>
                            <StyledDatePicker
                                value={data.due_date}
                                onChange={(value) => setData('due_date', value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.01] transition-all"
                        >
                            {processing ? 'Transmitting Data...' : 'Synchronize Task'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
