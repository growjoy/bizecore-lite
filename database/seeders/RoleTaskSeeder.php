<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class RoleTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultPassword = 'password';

        $divisions = [
            'Technology & Cloud' => Division::updateOrCreate(
                ['name' => 'Technology & Cloud'],
                [
                    'description' => 'Infrastructure and software development',
                    'onboarding_steps' => ['Setup local environment', 'Read architecture docs', 'Ship first feature'],
                ]
            ),
            'People Operations' => Division::updateOrCreate(
                ['name' => 'People Operations'],
                [
                    'description' => 'Talent acquisition and employee success',
                    'onboarding_steps' => ['Review company handbook', 'Complete HR tools training', 'Join team sync'],
                ]
            ),
            'Growth & Marketing' => Division::updateOrCreate(
                ['name' => 'Growth & Marketing'],
                [
                    'description' => 'Brand strategy and market expansion',
                    'onboarding_steps' => ['Read brand guideline', 'Setup campaign dashboard', 'Launch pilot campaign'],
                ]
            ),
            'Finance & Legal' => Division::updateOrCreate(
                ['name' => 'Finance & Legal'],
                [
                    'description' => 'Financial planning and corporate compliance',
                    'onboarding_steps' => ['Review compliance checklist', 'Access finance systems', 'Complete audit SOP'],
                ]
            ),
        ];

        $users = [
            [
                'name' => 'Lathif',
                'email' => 'lathif@bizecore.com',
                'role' => 'superadmin',
                'division_id' => $divisions['Technology & Cloud']->id,
            ],
            [
                'name' => 'Rasya',
                'email' => 'rasya@bizecore.com',
                'role' => 'admin',
                'division_id' => $divisions['People Operations']->id,
            ],
            [
                'name' => 'Izha',
                'email' => 'izha@bizecore.com',
                'role' => 'worker',
                'division_id' => $divisions['Technology & Cloud']->id,
            ],
            [
                'name' => 'Superadmin Bizecore',
                'email' => 'superadmin@bizecore.com',
                'role' => 'superadmin',
                'division_id' => $divisions['Technology & Cloud']->id,
            ],
            [
                'name' => 'Admin Bizecore',
                'email' => 'admin@bizecore.com',
                'role' => 'admin',
                'division_id' => $divisions['People Operations']->id,
            ],
            [
                'name' => 'Joy D. Software',
                'email' => 'joy@bizecore.com',
                'role' => 'manager',
                'division_id' => $divisions['Technology & Cloud']->id,
            ],
            [
                'name' => 'Sarah Miller',
                'email' => 'sarah@bizecore.com',
                'role' => 'manager',
                'division_id' => $divisions['Growth & Marketing']->id,
            ],
            [
                'name' => 'Kevin Finance',
                'email' => 'kevin@bizecore.com',
                'role' => 'worker',
                'division_id' => $divisions['Finance & Legal']->id,
            ],
            [
                'name' => 'Aulia QA',
                'email' => 'aulia.qa@bizecore.com',
                'role' => 'worker',
                'division_id' => $divisions['Technology & Cloud']->id,
            ],
        ];

        $userByEmail = [];

        foreach ($users as $item) {
            $user = User::updateOrCreate(
                ['email' => $item['email']],
                [
                    'name' => $item['name'],
                    'password' => Hash::make($defaultPassword),
                    'role' => $item['role'],
                    'division_id' => $item['division_id'],
                    'onboarding_progress' => json_encode([]),
                    'email_verified_at' => now(),
                ]
            );

            $userByEmail[$item['email']] = $user;
        }

        $tasks = [
            [
                'title' => 'Setup monitoring dashboard for production',
                'description' => 'Configure infra metrics and error tracking to improve system observability.',
                'status' => 'in_progress',
                'priority' => 'high',
                'due_date' => now()->addDays(3)->toDateString(),
                'email' => 'joy@bizecore.com',
            ],
            [
                'title' => 'Finalize cloud cost optimization report',
                'description' => 'Review monthly spend and propose optimization actions for active services.',
                'status' => 'revision',
                'priority' => 'medium',
                'due_date' => now()->addDays(5)->toDateString(),
                'email' => 'joy@bizecore.com',
            ],
            [
                'title' => 'Prepare hiring pipeline for Q2',
                'description' => 'Coordinate with leads to finalize role requirements and hiring timeline.',
                'status' => 'upcoming',
                'priority' => 'medium',
                'due_date' => now()->addDays(7)->toDateString(),
                'email' => 'rasya@bizecore.com',
            ],
            [
                'title' => 'Review onboarding checklist quality',
                'description' => 'Validate each onboarding step against current division workflows.',
                'status' => 'not_started',
                'priority' => 'low',
                'due_date' => now()->addDays(10)->toDateString(),
                'email' => 'admin@bizecore.com',
            ],
            [
                'title' => 'Implement task drag-and-drop performance fixes',
                'description' => 'Improve board interaction smoothness and reduce unnecessary re-renders.',
                'status' => 'in_progress',
                'priority' => 'high',
                'due_date' => now()->addDays(2)->toDateString(),
                'email' => 'izha@bizecore.com',
                'assigned_by_email' => 'joy@bizecore.com',
            ],
            [
                'title' => 'Refactor dashboard sidebar access rules',
                'description' => 'Align role-based menu visibility with current policy matrix.',
                'status' => 'upcoming',
                'priority' => 'medium',
                'due_date' => now()->addDays(4)->toDateString(),
                'email' => 'aulia.qa@bizecore.com',
                'assigned_by_email' => 'joy@bizecore.com',
            ],
            [
                'title' => 'Validate project export output format',
                'description' => 'Run regression checks for XLS export and sanitize data fields.',
                'status' => 'revision',
                'priority' => 'high',
                'due_date' => now()->addDays(6)->toDateString(),
                'email' => 'aulia.qa@bizecore.com',
                'assigned_by_email' => 'joy@bizecore.com',
            ],
            [
                'title' => 'Close compliance findings for monthly audit',
                'description' => 'Complete documentation updates and submit evidence to legal tracker.',
                'status' => 'completed',
                'priority' => 'medium',
                'due_date' => now()->subDays(1)->toDateString(),
                'email' => 'kevin@bizecore.com',
                'assigned_by_email' => 'sarah@bizecore.com',
            ],
            [
                'title' => 'Launch campaign analytics baseline',
                'description' => 'Define baseline KPI for active channels and sync to dashboard.',
                'status' => 'in_progress',
                'priority' => 'medium',
                'due_date' => now()->addDays(8)->toDateString(),
                'email' => 'sarah@bizecore.com',
            ],
            [
                'title' => 'Review incident response SOP',
                'description' => 'Audit response flow for critical bug reports and update escalation path.',
                'status' => 'not_started',
                'priority' => 'high',
                'due_date' => now()->addDays(12)->toDateString(),
                'email' => 'superadmin@bizecore.com',
            ],
        ];

        $hasAssignedByColumn = Schema::hasColumn('tasks', 'assigned_by');

        foreach ($tasks as $task) {
            $assignee = $userByEmail[$task['email']] ?? null;
            $assigner = isset($task['assigned_by_email']) ? ($userByEmail[$task['assigned_by_email']] ?? null) : null;

            if (!$assignee) {
                continue;
            }

            $payload = [
                'description' => $task['description'],
                'status' => $task['status'],
                'priority' => $task['priority'],
                'due_date' => $task['due_date'],
            ];

            if ($hasAssignedByColumn) {
                $payload['assigned_by'] = $assigner?->id;
            }

            Task::updateOrCreate(
                [
                    'title' => $task['title'],
                    'user_id' => $assignee->id,
                ],
                $payload
            );
        }

        // Force all existing accounts to use the requested default password.
        User::query()->update([
            'password' => Hash::make($defaultPassword),
        ]);
    }
}
