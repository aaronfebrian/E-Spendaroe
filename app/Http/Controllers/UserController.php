<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Siswa;
use App\Models\Guru;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get(); // Ambil data user terbaru
        return response()->json($users);
    }
    
    public function getTotalUsersWeb()
    {
        $totalUsers = User::count();
    
        return response()->json(['totalUsers' => $totalUsers]);
    }

    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('EditUser', ['user' => $user]);
    }

    public function update(Request $request, string $id)
    {
        // Validasi request jika diperlukan
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'nip' => 'nullable|string|max:255', // Kolom guru
            'class' => 'nullable|string|max:255', // Kolom guru dan siswa
            'subject' => 'nullable|string|max:255', // Kolom guru
            'nis' => 'nullable|string|max:255', // Kolom siswa
            'jenis_kelamin' => 'nullable|string|max:255',
            // Tambahkan kolom lain sesuai kebutuhan
        ]);

        // Perbarui data user
        $user = User::findOrFail($id);
        // Perbarui data pada tabel 'users'
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->filled('password') ? Hash::make($request->input('password')) : $user->password,
        ]);

        // Perbarui data pada tabel 'gurus' jika role adalah guru
        if ($user->role === 'guru') {
            $user->guru->update([
                'nip' => $request->input('nip'),
                'jenis_kelamin' => $request->input('jenis_kelamin'),
                'subject' => $request->input('subject'),
                'class' => $request->input('class'),
                // Tambahkan kolom lain sesuai kebutuhan
            ]);
        }

        if ($user->role === 'guru') {
            $user->subject->update([
                'subject_name' => $request->input('subject_name'),
                'class' => $request->input('class'),
                // Tambahkan kolom lain sesuai kebutuhan
            ]);
        }

        // Perbarui data pada tabel 'siswas' jika role adalah siswa
        if ($user->role === 'siswa') {
            $user->siswa->update([
                'jenis_kelamin' => $request->input('jenis_kelamin'),
                'nis' => $request->input('nis'),
                'class' => $request->input('class'),
                // Tambahkan kolom lain sesuai kebutuhan
            ]);
        }

        if ($user->role === 'admin') {
            $user->admin->update([
                'jenis_kelamin' => $request->input('jenis_kelamin'),
                'telepon' => $request->input('telepon'),
                // Tambahkan kolom lain sesuai kebutuhan
            ]);
        }

        return redirect()->back()->with('status', 'Profil user berhasil diperbarui.');
    }
}
