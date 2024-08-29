<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAssignment extends Model
{
    use HasFactory;

    protected $table = 'studentassignment';
    protected $fillable = [
        'catatan',
        'file_pendukung',
        'siswa_id',
        'tugas_id',
    ];

    protected $dates = ['waktu_pengumpulan'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function tugas()
    {
        return $this->belongsTo(Tugas::class, 'tugas_id');
    }

    public function getStatusPengumpulanAttribute()
    {
        $now = now();
        $deadline = $this->tugas->tanggal_tenggat . ' ' . $this->tugas->waktu_tenggat;
        $isTerlambat = $now > $deadline;

        if ($isTerlambat) {
            return 'Terlambat';
        }

        return $this->update_at <= $deadline ? 'Mengumpulkan' : 'Belum Mengumpulkan';
    }
}
