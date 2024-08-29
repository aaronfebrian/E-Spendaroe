<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_name',
        'class',
        'guru_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function materi()
    {
        return $this->hasMany(Materi::class, 'subject_id');
    }

    public function tugas()
    {
        return $this->hasMany(Tugas::class, 'subject_id'); // Assuming mata_pelajaran_id is the foreign key in the tugas table referencing the mata_pelajarans table
    }
}
