<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materi extends Model
{
    use HasFactory;

    protected $table = 'materis';
    protected $fillable = [
        'judul',
        'tanggal_upload',
        'deskripsi',
        'file_pendukung',
        'guru_id',
        'subject_id',
    ];

    public function guru()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function siswas()
    {
        return $this->belongsToMany(Siswa::class, 'materi_siswa');
    }
    
}
