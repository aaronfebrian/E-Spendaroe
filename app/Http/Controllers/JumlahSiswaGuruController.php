<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Admin;

class JumlahSiswaGuruController extends Controller
{
    public function getJumlahSiswa()
    {
        $jumlahSiswa = User::where('role', 'siswa')->count();
        return response()->json(['jumlahSiswa' => $jumlahSiswa]);
    }

    public function getJumlahGuru()
    {
        $jumlahGuru = User::where('role', 'guru')->count();
        return response()->json(['jumlahGuru' => $jumlahGuru]);
    }

    public function getJumlahAdmin()
    {
        $jumlahAdmin = User::where('role', 'admin')->count();
        return response()->json(['jumlahAdmin' => $jumlahAdmin]);
    }
}
