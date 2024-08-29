<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Siswa;

class DeleteSiswaController extends Controller
{
    public function hapusSiswa(User $user)
    {
        // Pastikan user memiliki role siswa sebelum dihapus
        if ($user->role === 'siswa') {
            // Lakukan operasi penghapusan siswa terkait
            $siswa = $user->siswa;

            if ($siswa) {
                // Hapus data siswa terkait
                $siswa->delete();
            }
            
            // Hapus user dari tabel users
            $user->delete();

            return response()->json(['message' => 'User dan data siswa berhasil dihapus']);
        }
    
        return response()->json(['error' => 'Gagal menghapus user']);
    }
}
