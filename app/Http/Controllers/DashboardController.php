<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Division;
use App\Models\Project;
use App\Models\Task;
use App\Models\BugReport;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display the dashboard overview.
     */
    public function index()
    {
        $stats = [
            'total_employees' => Employee::count(),
            'total_divisions' => Division::count(),
            'total_projects' => Project::count(),
            'ongoing_projects' => Project::where('status', 'ongoing')->count(),
            'total_tasks' => Task::count(),
            'total_bug_reports' => BugReport::count(),
            'total_users' => User::count(),
        ];

        $recentEmployees = Employee::with('division')->latest()->take(5)->get();
        $recentProjects = Project::latest()->with('pic')->take(5)->get();

        $divisionDistribution = Division::withCount('members')->get()->map(fn($div) => [
            'name' => $div->name,
            'count' => $div->members_count
        ]);

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentEmployees' => $recentEmployees,
            'recentProjects' => $recentProjects,
            'divisionDistribution' => $divisionDistribution,
        ]);
    }
}
