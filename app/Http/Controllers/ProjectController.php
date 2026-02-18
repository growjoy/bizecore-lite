<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Projects', [
            'projects' => Project::with('pic')->latest()->get(),
            'projectManagers' => User::where('role', 'manager')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'pic_id' => 'required|exists:users,id',
            'status' => 'required|in:ongoing,completed',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        Project::create($validated);

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'pic_id' => 'required|exists:users,id',
            'status' => 'required|in:ongoing,completed',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->back()->with('success', 'Project deleted successfully.');
    }

    public function export()
    {
        $projects = Project::with('pic')->latest()->get();
        $filename = "Project_Intelligence_Report_" . date('Y_m_d') . ".xls";

        $headers = [
            "Content-Type" => "application/vnd.ms-excel; charset=utf-8",
            "Content-Disposition" => "attachment; filename=\"$filename\"",
            "Expires" => "0",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Pragma" => "public"
        ];

        $html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
        $html .= '<head><meta http-equiv="Content-type" content="text/html;charset=utf-8" />';
        $html .= '<style>table { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #e2e8f0; }</style>';
        $html .= '</head>';
        $html .= '<body>';
        $html .= '<table border="1">';
        $html .= '<thead>';
        $html .= '<tr style="background-color: #4f46e5; color: #ffffff; font-weight: bold;">';
        $html .= '<th>MISSION ID</th>';
        $html .= '<th>PROJECT NAME</th>';
        $html .= '<th>CLIENT IDENTITY</th>';
        $html .= '<th>MISSION STATUS</th>';
        $html .= '<th>LAUNCH DATE</th>';
        $html .= '<th>COMPLETION DATE</th>';
        $html .= '<th>MISSION LEAD (PIC)</th>';
        $html .= '<th>STRATEGIC DESCRIPTION</th>';
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';

        foreach ($projects as $project) {
            $html .= '<tr>';
            $html .= '<td>' . $project->id . '</td>';
            $html .= '<td>' . htmlspecialchars($project->name) . '</td>';
            $html .= '<td>' . htmlspecialchars($project->client) . '</td>';
            $html .= '<td style="text-align: center;">' . strtoupper($project->status) . '</td>';
            $html .= '<td style="text-align: center;">' . $project->start_date . '</td>';
            $html .= '<td style="text-align: center;">' . ($project->end_date ?? '-') . '</td>';
            $html .= '<td>' . htmlspecialchars($project->pic ? $project->pic->name : 'N/A') . '</td>';
            $html .= '<td>' . htmlspecialchars($project->description ?? '-') . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody>';
        $html .= '</table>';
        $html .= '</body>';
        $html .= '</html>';

        return response($html)->withHeaders($headers);
    }
}
