<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Project;
use App\Models\Division;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        if (!Schema::hasTable('employees') || !Schema::hasTable('divisions') || !Schema::hasTable('projects')) {
            return Inertia::render('Public/Home', [
                'stats' => [
                    'employees' => 0,
                    'divisions' => 0,
                    'projects' => 0,
                    'active_projects' => 0,
                ],
                'latestProjects' => [],
                'distribution' => [],
                'teamMembers' => [],
            ]);
        }

        $stats = [
            'employees' => Employee::count() + User::whereNotIn('role', ['admin', 'superadmin'])->count(),
            'divisions' => Division::count(),
            'projects' => Project::count(),
            'active_projects' => Project::where('status', 'ongoing')->count(),
        ];

        $distribution = Division::withCount('members')->get()->map(fn($div) => [
            'name' => $div->name,
            'count' => $div->members_count
        ]);

        $latestProjects = Project::with('pic')->latest()->take(3)->get();

        // Fetch users who are not owners (manager/worker roles) for home page preview
        $teamMembers = User::whereIn('role', ['manager', 'worker'])
            ->with('division')
            ->latest()
            ->get()
            ->map(function ($u) {
                $u->role_label = $u->role === 'manager' ? 'Project Manager' : 'Field Worker';
                return $u;
            });

        return Inertia::render('Public/Home', [
            'stats' => $stats,
            'latestProjects' => $latestProjects,
            'distribution' => $distribution,
            'teamMembers' => $teamMembers,
            'company' => config('bizecore.company'),
        ]);
    }

    public function employees()
    {
        if (!Schema::hasTable('employees') || !Schema::hasTable('users')) {
            return Inertia::render('Public/Employees', [
                'employees' => [
                    'data' => [],
                    'links' => []
                ],
            ]);
        }

        // Combine interns (Employee) and internal users (User - non admin)
        $interns = Employee::with('division')->get()->map(function ($e) {
            $e->is_intern = true;
            $e->role_label = 'Intern';
            return $e;
        });

        $users = User::whereIn('role', ['manager', 'worker'])
            ->with('division')
            ->get()
            ->map(function ($u) {
                $u->is_intern = false;
                $u->role_label = $u->role === 'manager' ? 'Project Manager' : 'Field Worker';
                return $u;
            });

        $allMembers = $interns->concat($users)->sortByDesc('created_at')->values()->map(function ($m) {
            $isIntern = $m instanceof \App\Models\Employee;
            return [
                'id'         => $m->id,
                'unique_key' => ($isIntern ? 'intern_' : 'user_') . $m->id, // prevent duplicate React keys
                'name'       => $m->name,
                'email'      => $m->email,
                'job_title'  => $m->job_title ?? $m->role_label,
                'division'   => $m->division ? ['name' => $m->division->name] : null,
                'status'     => $m->status ?? 'active',
                'is_intern'  => $isIntern,
                'role_label' => $m->role_label,
            ];
        })->toArray();

        return Inertia::render('Public/Employees', [
            'employees' => [
                'data' => $allMembers,
                'links' => [] // Manual handling for now
            ],
        ]);
    }

    public function projects()
    {
        if (!Schema::hasTable('projects')) {
            return Inertia::render('Public/Projects', [
                'projects' => [
                    'data' => [],
                    'links' => []
                ],
            ]);
        }

        $projects = Project::with('pic')->paginate(9);

        return Inertia::render('Public/Projects', [
            'projects' => $projects,
        ]);
    }
}
