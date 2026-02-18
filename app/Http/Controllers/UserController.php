<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = User::latest();

        if ($user->role === 'admin') {
            $query->whereIn('role', ['manager', 'worker']);
        } elseif ($user->role === 'manager') {
            $query->where('role', 'worker');
        }

        return Inertia::render('Dashboard/Users', [
            'users' => $query->with('division')->get(),
            'divisions' => \App\Models\Division::all(),
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $allowedRoles = 'admin,superadmin,manager,worker';

        // Admins can only create workers
        if ($user->role === 'admin') {
            $allowedRoles = 'manager,worker';
        } elseif ($user->role === 'manager') {
            $allowedRoles = 'worker';
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => "required|in:$allowedRoles",
            'division_id' => 'nullable|exists:divisions,id',
        ]);

        if ($user->role !== 'admin' && $user->role !== 'superadmin' && isset($validated['division_id'])) {
            unset($validated['division_id']); // Only admin can assign divisions
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'division_id' => $validated['division_id'] ?? null,
        ]);

        return back()->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $authUser = auth()->user();
        $allowedRoles = 'admin,superadmin,manager,worker';

        // Administrative privilege checks
        if ($authUser->role === 'admin') {
            if (!in_array($user->role, ['manager', 'worker'])) {
                abort(403, 'Owners can only manage Managers and Workers.');
            }
            $allowedRoles = 'manager,worker';
        } elseif ($authUser->role === 'manager') {
            if ($user->role !== 'worker') {
                abort(403, 'Managers can only manage Workers.');
            }
            $allowedRoles = 'worker';
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => "required|in:$allowedRoles",
            'password' => 'nullable|string|min:8',
            'division_id' => 'nullable|exists:divisions,id',
        ]);

        if ($authUser->role !== 'admin' && $authUser->role !== 'superadmin' && isset($validated['division_id'])) {
            unset($validated['division_id']); // Only admin can assign divisions
        }

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'division_id' => $validated['division_id'] ?? $user->division_id,
        ]);

        if ($validated['password']) {
            $user->update(['password' => Hash::make($validated['password'])]);
        }

        return back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $authUser = auth()->user();

        // Administrative privilege checks
        if ($authUser->role === 'admin' && !in_array($user->role, ['manager', 'worker'])) {
            abort(403, 'Owners can only delete Managers and Workers.');
        }
        if ($authUser->role === 'manager' && $user->role !== 'worker') {
            abort(403, 'Managers can only delete Workers.');
        }
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }
}
