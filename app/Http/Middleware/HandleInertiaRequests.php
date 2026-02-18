<?php

namespace App\Http\Middleware;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    public function rootView(Request $request): string
    {
        if ($request->is('dashboard*')) {
            return 'dashboard';
        }

        return 'landing';
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'navigation' => [
                'divisions' => \App\Models\Division::all(['id', 'name']),
            ],
            'company' => config('bizecore.company'),
            'roles' => config('bizecore.roles'),
            'currentDivision' => fn() => $user?->division
                ? [
                    'id' => $user->division->id,
                    'name' => $user->division->name,
                ]
                : null,
            'workerTaskAlerts' => function () use ($user) {
                if (!$user || $user->role !== 'worker') {
                    return null;
                }

                if (!Schema::hasTable('tasks') || !Schema::hasColumn('tasks', 'assigned_by')) {
                    return [
                        'count' => 0,
                        'items' => [],
                    ];
                }

                $openStatuses = ['not_started', 'upcoming', 'in_progress', 'revision'];

                $baseQuery = Task::query()
                    ->where('user_id', $user->id)
                    ->whereIn('status', $openStatuses)
                    ->whereHas('assignedBy', function ($query) {
                        $query->where('role', 'manager');
                    });

                $items = (clone $baseQuery)
                    ->with('assignedBy:id,name')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(function (Task $task) {
                        return [
                            'id' => $task->id,
                            'title' => $task->title,
                            'status' => $task->status,
                            'due_date' => $task->due_date,
                            'assigned_by' => $task->assignedBy?->name,
                            'created_at' => $task->created_at?->toDateTimeString(),
                        ];
                    })
                    ->values();

                return [
                    'count' => (clone $baseQuery)->count(),
                    'items' => $items,
                ];
            },
        ];
    }
}
