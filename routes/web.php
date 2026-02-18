<?php

use App\Http\Controllers\BugReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/employees', [LandingController::class, 'employees'])->name('public.employees');
Route::get('/projects', [LandingController::class, 'projects'])->name('public.projects');

Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/documentation', fn() => Inertia::render('Public/Documentation'))->name('documentation');
Route::get('/api-reference', fn() => Inertia::render('Public/ApiReference'))->name('api.reference');
Route::get('/support', fn() => Inertia::render('Public/SupportCenter'))->name('support');
Route::get('/privacy', fn() => Inertia::render('Public/PrivacyPolicy'))->name('privacy');
Route::get('/terms', fn() => Inertia::render('Public/TermsOfService'))->name('terms');

Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/employees', [EmployeeController::class, 'index'])->name('employees');
        Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
        Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
        Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

        Route::get('/divisions', [DivisionController::class, 'index'])->name('divisions');
        Route::post('/divisions', [DivisionController::class, 'store'])->name('divisions.store');
        Route::put('/divisions/{division}', [DivisionController::class, 'update'])->name('divisions.update');
        Route::delete('/divisions/{division}', [DivisionController::class, 'destroy'])->name('divisions.destroy');

        Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
        Route::get('/projects/export', [ProjectController::class, 'export'])->name('projects.export');
        Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

        Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
        Route::get('/divisions/{division}/tasks', [TaskController::class, 'index'])->name('division.tasks');
        Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
        Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
        Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

        Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
        Route::post('/onboarding', [OnboardingController::class, 'update'])->name('onboarding.update');

        Route::get('/users', [UserController::class, 'index'])->name('users');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::post('/bug-reports', [BugReportController::class, 'store'])->name('bug-reports.store');
        Route::middleware('role:superadmin')->group(function () {
            Route::get('/bug-reports', [BugReportController::class, 'index'])->name('bug-reports.index');
            Route::patch('/bug-reports/{bugReport}', [BugReportController::class, 'updateStatus'])->name('bug-reports.update');
            Route::delete('/bug-reports/{bugReport}', [BugReportController::class, 'destroy'])->name('bug-reports.destroy');
        });
    });
});
