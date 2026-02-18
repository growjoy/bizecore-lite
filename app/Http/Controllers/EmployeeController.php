<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Division;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function index()
    {
        // Get Interns
        $interns = Employee::with('division')->latest()->get()->map(function ($e) {
            $e->role_label = 'Intern';
            $e->is_user = false;
            return $e;
        });

        // Get Users (Managers and Workers)
        $users = User::whereIn('role', ['manager', 'worker'])
            ->with('division')
            ->latest()
            ->get()
            ->map(function ($u) {
                $u->role_label = $u->role === 'manager' ? 'Project Manager' : 'Field Worker';
                $u->is_user = true;
                return $u;
            });

        // Merge them
        $allPersonnel = $interns->concat($users)->sortByDesc('created_at')->values();

        return Inertia::render('Dashboard/Employees', [
            'employees' => $allPersonnel,
            'divisions' => Division::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'job_title' => 'required|string|max:255',
            'division_id' => 'required|exists:divisions,id',
            'status' => 'required|in:active,inactive',
        ]);

        Employee::create($validated);

        return redirect()->back()->with('success', 'Intern registered successfully.');
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('employees')->ignore($employee->id)],
            'job_title' => 'required|string|max:255',
            'division_id' => 'required|exists:divisions,id',
            'status' => 'required|in:active,inactive',
        ]);

        $employee->update($validated);

        return redirect()->back()->with('success', 'Information updated successfully.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->back()->with('success', 'Record removed successfully.');
    }
}
