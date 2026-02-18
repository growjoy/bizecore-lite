<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    /** @use HasFactory<\Database\Factories\DivisionFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'onboarding_steps'];

    protected function casts(): array
    {
        return [
            'onboarding_steps' => 'array',
        ];
    }

    public function members()
    {
        return $this->hasMany(User::class);
    }

    public function managers()
    {
        return $this->hasMany(User::class)->where('role', 'manager');
    }
}
