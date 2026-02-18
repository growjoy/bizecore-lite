<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = ['name', 'client', 'status', 'start_date', 'end_date', 'pic_id', 'description'];

    public function pic()
    {
        return $this->belongsTo(User::class, 'pic_id');
    }
}
