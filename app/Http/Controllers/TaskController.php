<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(?Division $division = null)
    {
        $user = Auth::user();
        $tasksQuery = Task::query()->with(['user.division', 'assignedBy']);

        if (in_array($user->role, ['superadmin', 'admin'], true)) {
            if ($division) {
                $tasksQuery->whereHas('user', function ($query) use ($division) {
                    $query->where('division_id', $division->id);
                });
            }

            $workersQuery = User::query()->with('division')->where('role', 'worker');
            if ($division) {
                $workersQuery->where('division_id', $division->id);
            }
            $workers = $workersQuery->orderBy('name')->get();
        } elseif ($user->role === 'manager') {
            if ($division && $user->division_id && (int) $division->id !== (int) $user->division_id) {
                abort(403, 'Project manager can only access tasks from their own division.');
            }

            $workersQuery = User::query()->with('division')->where('role', 'worker');
            if ($user->division_id) {
                $workersQuery->where('division_id', $user->division_id);
            }

            $workers = $workersQuery->orderBy('name')->get();
            $tasksQuery->whereIn('user_id', $workers->pluck('id'));
        } else {
            $tasksQuery->where('user_id', $user->id);
            $workers = [];
        }

        $tasks = $tasksQuery->latest()->get();

        return Inertia::render('Dashboard/Tasks', [
            'tasks' => $tasks,
            'workers' => $workers,
            'selectedDivision' => $division
                ? [
                    'id' => $division->id,
                    'name' => $division->name,
                ]
                : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:not_started,upcoming,in_progress,revision,completed',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        if (!Auth::user()->isManager()) {
            abort(403);
        }

        $authUser = Auth::user();
        $assignee = User::findOrFail($validated['user_id']);

        if ($authUser->role === 'manager') {
            if ($assignee->role !== 'worker') {
                abort(403, 'Project manager can only assign tasks to workers.');
            }

            if ($authUser->division_id && (int) $assignee->division_id !== (int) $authUser->division_id) {
                abort(403, 'Project manager can only assign tasks within their own division.');
            }
        }

        $payload = $validated;
        if (Schema::hasColumn('tasks', 'assigned_by')) {
            $payload['assigned_by'] = $authUser->id;
        }

        Task::create($payload);

        return redirect()->back()->with('success', 'Task created successfully.');
    }

    public function update(Request $request, Task $task)
    {
        $authUser = Auth::user();
        if (!$authUser->isManager() && $task->user_id !== $authUser->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'user_id' => 'sometimes|required|exists:users,id',
            'status' => 'sometimes|required|in:not_started,upcoming,in_progress,revision,completed',
            'priority' => 'sometimes|required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        if ($authUser->role === 'manager') {
            $targetUserId = $validated['user_id'] ?? $task->user_id;
            $targetUser = User::findOrFail($targetUserId);

            if ($targetUser->role !== 'worker') {
                abort(403, 'Project manager can only manage worker tasks.');
            }

            if ($authUser->division_id && (int) $targetUser->division_id !== (int) $authUser->division_id) {
                abort(403, 'Project manager can only manage tasks within their own division.');
            }
        }

        if (!$authUser->isManager()) {
            unset($validated['user_id']);
        } elseif (array_key_exists('user_id', $validated) && Schema::hasColumn('tasks', 'assigned_by')) {
            $validated['assigned_by'] = $authUser->id;
        }

        $task->update($validated);

        return redirect()->back()->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $user = Auth::user();
        if (!$user->isManager()) {
            abort(403);
        }

        if ($user->role === 'manager') {
            $task->loadMissing('user');
            if (!$task->user || $task->user->role !== 'worker') {
                abort(403, 'Project manager can only delete worker tasks.');
            }

            if ($user->division_id && (int) $task->user->division_id !== (int) $user->division_id) {
                abort(403, 'Project manager can only delete tasks from their own division.');
            }
        }

        $task->delete();

        return redirect()->back()->with('success', 'Task deleted successfully.');
    }
}
