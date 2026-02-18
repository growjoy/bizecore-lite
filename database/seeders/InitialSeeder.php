<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Division;
use App\Models\Employee;
use App\Models\Project;
use Illuminate\Support\Facades\Hash;

class InitialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Superadmin User
        User::updateOrCreate(
            ['email' => 'superadmin@bizecore.com'],
            [
                'name' => 'Superadmin Bizecore',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ]
        );

        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@bizecore.com'],
            [
                'name' => 'Admin Bizecore',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Project Manager User
        $manager = User::updateOrCreate(
            ['email' => 'manager@bizecore.com'],
            [
                'name' => 'Elite Project Manager',
                'password' => Hash::make('password'),
                'role' => 'manager',
            ]
        );

        // Divisions
        $it = Division::firstOrCreate(['name' => 'Technology & Cloud'], ['description' => 'Infrastructure and software development']);
        $hr = Division::firstOrCreate(['name' => 'People Operations'], ['description' => 'Talent acquisition and employee success']);
        $marketing = Division::firstOrCreate(['name' => 'Growth & Marketing'], ['description' => 'Brand strategy and market expansion']);
        $finance = Division::firstOrCreate(['name' => 'Finance & Legal'], ['description' => 'Financial planning and corporate compliance']);

        // Employees
        $emp1 = Employee::firstOrCreate(
            ['email' => 'lathif@bizecore.com'],
            [
                'name' => 'Lathif Hafidz',
                'job_title' => 'Chief Technology Officer',
                'division_id' => $it->id,
                'status' => 'active'
            ]
        );

        $emp2 = Employee::firstOrCreate(
            ['email' => 'joy@bizecore.com'],
            [
                'name' => 'Joy D. Software',
                'job_title' => 'Senior Lead Engineer',
                'division_id' => $it->id,
                'status' => 'active'
            ]
        );

        $emp3 = Employee::firstOrCreate(
            ['email' => 'sarah@bizecore.com'],
            [
                'name' => 'Sarah Miller',
                'job_title' => 'Marketing Director',
                'division_id' => $marketing->id,
                'status' => 'active'
            ]
        );

        $emp4 = Employee::firstOrCreate(
            ['email' => 'kevin@bizecore.com'],
            [
                'name' => 'Kevin Finance',
                'job_title' => 'Legal Counsel',
                'division_id' => $finance->id,
                'status' => 'active'
            ]
        );

        // Projects
        Project::firstOrCreate(
            ['name' => 'Bizecore Data Hub'],
            [
                'client' => 'Internal Strategic Group',
                'status' => 'ongoing',
                'start_date' => now()->subMonths(1),
                'pic_id' => $manager->id,
                'description' => 'Building the next generation of company data management with high-performance analytics.'
            ]
        );

        Project::firstOrCreate(
            ['name' => 'Global Expansion 2026'],
            [
                'client' => 'Bizecore Ventures',
                'status' => 'ongoing',
                'start_date' => now(),
                'pic_id' => $manager->id,
                'description' => 'Market research and infrastructure setup for Saudi and ASEAN markets.'
            ]
        );

        Project::firstOrCreate(
            ['name' => 'Corporate Rebranding'],
            [
                'client' => 'Public Affairs',
                'status' => 'completed',
                'start_date' => now()->subMonths(6),
                'end_date' => now()->subMonths(1),
                'pic_id' => $manager->id,
                'description' => 'Complete overhaul of company visual identity and digital assets.'
            ]
        );

        Project::firstOrCreate(
            ['name' => 'Cloud Migration Phase 2'],
            [
                'client' => 'IT Infrastructure',
                'status' => 'ongoing',
                'start_date' => now()->subMonths(2),
                'pic_id' => $manager->id,
                'description' => 'Moving legacy on-premise systems to a serverless AWS architecture.'
            ]
        );
    }
}
