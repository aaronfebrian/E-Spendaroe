<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;    
use App\Models\Guru;
use App\Models\Subject;
use App\Models\Materi;

class DeleteGuruController extends Controller
{
    public function hapusGuru(User $user)
    {
        // Pastikan user memiliki role guru sebelum dihapus
        if ($user->role === 'guru') {
            // Lakukan operasi penghapusan guru terkait
            $guru = $user->guru;
    
            if ($guru) {
                // Hapus data materi yang terkait dengan guru
                $guru->materi()->delete();
    
                // Hapus data subjek yang terkait dengan guru
                $guru->subjects()->delete();
    
                // Hapus data guru terkait
                $guru->delete();
            }
    
            // Hapus user dari tabel users
            $user->delete();
    
            return response()->json(['message' => 'User dan data guru, subjek, serta materi terkait berhasil dihapus']);
        }
    
        return response()->json(['error' => 'Gagal menghapus user']);
    }    
}


// public function hapusGuru(User $user)
// {
//     // Pastikan user memiliki role guru
//     if ($user->role === 'guru') {
//         // Lakukan operasi penghapusan guru berdasarkan $user
//         $user->delete();
//         // ...
//         return response()->json(['message' => 'User berhasil dihapus']);
//     }

//     return response()->json(['error' => 'Gagal menghapus user']);
// }