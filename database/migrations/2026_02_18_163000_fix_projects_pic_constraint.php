<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * Ensures pic_id on projects references users (not employees).
     * Safe to run even if the old constraint doesn't exist.
     */
    public function up(): void
    {
        // Check outside Schema::table() to avoid query-inside-DDL issues

        // Drop old foreign key pointing to 'employees' if it still exists
        $oldKey = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.TABLE_CONSTRAINTS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME   = 'projects'
              AND CONSTRAINT_TYPE = 'FOREIGN KEY'
              AND CONSTRAINT_NAME = 'projects_pic_id_foreign'
        ");

        if (!empty($oldKey)) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropForeign('projects_pic_id_foreign');
            });
        }

        // Only add FK if pic_id does not already reference 'users'
        $existingKey = DB::select("
            SELECT kcu.CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE kcu
            JOIN information_schema.TABLE_CONSTRAINTS tc
              ON kcu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
             AND kcu.TABLE_SCHEMA   = tc.TABLE_SCHEMA
            WHERE kcu.TABLE_SCHEMA        = DATABASE()
              AND kcu.TABLE_NAME          = 'projects'
              AND kcu.COLUMN_NAME         = 'pic_id'
              AND tc.CONSTRAINT_TYPE      = 'FOREIGN KEY'
              AND kcu.REFERENCED_TABLE_NAME = 'users'
        ");

        if (empty($existingKey)) {
            Schema::table('projects', function (Blueprint $table) {
                $table->foreign('pic_id')->references('id')->on('users')->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Only drop FK if it actually exists to avoid errors on rollback
        $existingKey = DB::select("
            SELECT kcu.CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE kcu
            JOIN information_schema.TABLE_CONSTRAINTS tc
              ON kcu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
             AND kcu.TABLE_SCHEMA   = tc.TABLE_SCHEMA
            WHERE kcu.TABLE_SCHEMA   = DATABASE()
              AND kcu.TABLE_NAME     = 'projects'
              AND kcu.COLUMN_NAME    = 'pic_id'
              AND tc.CONSTRAINT_TYPE = 'FOREIGN KEY'
        ");

        if (!empty($existingKey)) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropForeign(['pic_id']);
            });
        }
    }
};
