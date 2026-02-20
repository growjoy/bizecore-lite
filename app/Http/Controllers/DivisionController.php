<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Divisions', [
            'divisions' => Division::with(['managers'])->withCount('members')->get(),
        ]);
    }

    public function store(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'superadmin'])) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:divisions,name',
            'description' => 'nullable|string',
            'onboarding_steps' => 'nullable|array',
        ]);

        Division::create($validated);

        return redirect()->back()->with('success', 'Division created successfully.');
    }

    public function update(Request $request, Division $division)
    {
        if (!in_array($request->user()->role, ['admin', 'superadmin'])) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:divisions,name,' . $division->id,
            'description' => 'nullable|string',
            'onboarding_steps' => 'nullable|array',
        ]);

        $division->update($validated);

        return redirect()->back()->with('success', 'Division updated successfully.');
    }

    public function destroy(Division $division)
    {
        if (!in_array(request()->user()->role, ['admin', 'superadmin'])) {
            abort(403, 'Unauthorized action.');
        }

        if ($division->members()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete division with active members.');
        }
        $division->delete();
        return redirect()->back()->with('success', 'Division deleted successfully.');
    }
}
