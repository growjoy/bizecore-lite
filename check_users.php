<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

foreach (\App\Models\User::all() as $user) {
    echo $user->email . " - " . $user->role . "\n";
}
