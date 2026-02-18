<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Division;
use App\Models\Project;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\EmployeeFactory> */
    use HasFactory;

    protected $fillable = ['name', 'email', 'job_title', 'division_id', 'status'];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'pic_id');
    }
}
