<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('divisions', function (Blueprint $table) {
            $table->json('onboarding_steps')->nullable()->after('description');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('division_id')->nullable()->constrained('divisions')->onDelete('set null')->after('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['division_id']);
            $table->dropColumn('division_id');
        });

        Schema::table('divisions', function (Blueprint $table) {
            $table->dropColumn('onboarding_steps');
        });
    }
};
