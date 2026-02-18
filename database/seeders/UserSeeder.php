<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lathif - Superadmin
        User::updateOrCreate(
            ['email' => 'lathif@bizecore.com'],
            [
                'name' => 'Lathif',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ]
        );

        // Rasya - Admin
        User::updateOrCreate(
            ['email' => 'rasya@bizecore.com'],
            [
                'name' => 'Rasya',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Izha - Worker
        User::updateOrCreate(
            ['email' => 'izha@bizecore.com'],
            [
                'name' => 'Izha',
                'password' => Hash::make('password'),
                'role' => 'worker',
            ]
        );
    }
}
