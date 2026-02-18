<?php

namespace App\Http\Controllers;

use App\Models\BugReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BugReportController extends Controller
{
    public function index()
    {
        $reports = BugReport::with('user')->latest()->get();
        return Inertia::render('Dashboard/BugReports', [
            'reports' => $reports,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
        ]);

        BugReport::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'status' => 'open',
        ]);

        return back()->with('success', 'Bug report submitted successfully.');
    }

    public function updateStatus(Request $request, BugReport $bugReport)
    {
        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,resolved,closed',
        ]);

        $bugReport->update(['status' => $validated['status']]);

        return back()->with('success', 'Bug report status updated.');
    }

    public function destroy(BugReport $bugReport)
    {
        $bugReport->delete();
        return back()->with('success', 'Bug report deleted.');
    }
}
