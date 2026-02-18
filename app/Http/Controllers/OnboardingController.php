<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $program = $this->resolveProgram($user);

        if (!$program) {
            return redirect()->route('dashboard')->with('error', 'No onboarding program is assigned for your account.');
        }

        return Inertia::render('Dashboard/Onboarding', [
            'program' => $program,
            'progress' => $this->normalizeProgress($user->onboarding_progress),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'step' => 'required|string',
            'completed' => 'required|boolean',
        ]);

        $user = Auth::user();
        $program = $this->resolveProgram($user);

        if (!$program) {
            abort(403, 'No onboarding program available for this account.');
        }

        $allowedStepIds = collect($program['steps'])->pluck('id')->all();
        $step = $request->input('step');

        if (!in_array($step, $allowedStepIds, true)) {
            return back()->with('error', 'Invalid onboarding step.');
        }

        $progress = $this->normalizeProgress($user->onboarding_progress);

        if ($request->input('completed')) {
            if (!in_array($step, $progress)) {
                $progress[] = $step;
            }
        } else {
            $progress = array_values(array_diff($progress, [$step]));
        }

        $user->update(['onboarding_progress' => $progress]);

        return back();
    }

    private function normalizeProgress(mixed $value): array
    {
        if (is_array($value)) {
            return array_values(array_filter($value, fn ($item) => is_string($item) && trim($item) !== ''));
        }

        if (is_string($value)) {
            $decoded = json_decode($value, true);

            if (is_array($decoded)) {
                return array_values(array_filter($decoded, fn ($item) => is_string($item) && trim($item) !== ''));
            }

            $trimmed = trim($value);
            return $trimmed !== '' ? [$trimmed] : [];
        }

        return [];
    }

    private function resolveProgram(User $user): ?array
    {
        if ($user->role === 'superadmin') {
            return [
                'type' => 'role',
                'title' => 'Superadmin Onboarding Protocol',
                'subtitle' => 'Global governance and security initialization.',
                'context_name' => 'Superadmin Console',
                'description' => 'Finalize platform-level controls and audit readiness before operating production controls.',
                'steps' => [
                    ['id' => 'superadmin.security-baseline', 'label' => 'Review security baseline and access control matrix'],
                    ['id' => 'superadmin.audit-channel', 'label' => 'Verify bug report triage and audit escalation channel'],
                    ['id' => 'superadmin.data-retention', 'label' => 'Confirm backup integrity and data retention policy'],
                    ['id' => 'superadmin.release-gate', 'label' => 'Approve release governance checklist for all divisions'],
                    ['id' => 'superadmin.monitoring', 'label' => 'Validate system monitoring alerts and incident response handoff'],
                ],
            ];
        }

        if ($user->role === 'admin') {
            return [
                'type' => 'role',
                'title' => 'Admin Onboarding Protocol',
                'subtitle' => 'Operational leadership setup for your teams.',
                'context_name' => 'Owner Operations',
                'description' => 'Prepare team management workflows, division controls, and delivery oversight routines.',
                'steps' => [
                    ['id' => 'admin.team-structure', 'label' => 'Review manager-worker team structure and role boundaries'],
                    ['id' => 'admin.division-setup', 'label' => 'Validate division onboarding checklist and ownership alignment'],
                    ['id' => 'admin.project-oversight', 'label' => 'Set project reporting cadence and risk review workflow'],
                    ['id' => 'admin.task-governance', 'label' => 'Confirm task distribution rules and accountability tracking'],
                    ['id' => 'admin.communication', 'label' => 'Publish communication protocol for cross-division coordination'],
                ],
            ];
        }

        if (!$user->division_id || !$user->division) {
            return null;
        }

        $division = $user->division;
        $divisionSteps = collect($division->onboarding_steps ?? [])
            ->filter(fn ($step) => is_string($step) && trim($step) !== '')
            ->values()
            ->map(function (string $label, int $index) use ($division) {
                $slug = Str::slug($label);
                $safeSlug = $slug !== '' ? $slug : "step-{$index}";
                return [
                    'id' => "division.{$division->id}.{$index}.{$safeSlug}",
                    'label' => $label,
                ];
            })
            ->all();

        return [
            'type' => 'division',
            'title' => 'Division Onboarding Protocol',
            'subtitle' => 'Complete your division initialization tasks.',
            'context_name' => $division->name,
            'description' => $division->description,
            'steps' => $divisionSteps,
        ];
    }
}
