<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\User;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $siswas = User::where('role', 'siswa')
                     ->with('siswa')
                     ->select('id', 'name', 'email', 'created_at', 'role') // Pilih kolom yang diperlukan dari tabel 'users'
                     ->get()
                     ->map(function ($user) {
                         return [
                             'id' => $user->id,
                             'name' => $user->name,
                             'email' => $user->email,
                             'role' => $user->role,
                             'nis' => optional($user->siswa)->nis,
                             'class' => optional($user->siswa)->class,
                             'jenis_kelamin' => optional($user->siswa)->jenis_kelamin,
                             'created_at' => $user->created_at,
                         ];
                     });
    
        return Inertia::render('DaftarSiswa', ['siswas' => $siswas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $siswas = User::where('role', 'siswa')->with('siswa')->get();
        return Inertia::render('TambahSiswa', ['siswas' => $siswas]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => 'siswa',
        ]);

        $user->siswa()->create([
            'nis' => $request->input('nis'),
            'class' => $request->input('class'),
            'jenis_kelamin' => $request->input('jenis_kelamin'),
            // Tambahkan kolom lain sesuai kebutuhan
        ]);

        return redirect('/siswa');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $siswas = User::findOrFail($id);
        return Inertia::render('EditSiswa', ['siswa' => $siswas]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi request jika diperlukan
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'nis' => 'required|string|max:255',
            'jenis_kelamin' => 'nullable|string|in:Laki-Laki,Perempuan', // Perbarui aturan validasi 
            'class' => 'required|string|max:255',
        ]);
    
        // Perbarui data siswa
        $siswas = User::findOrFail($id);
    
        // Perbarui data pada tabel 'users'
        $siswas->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->filled('password') ? Hash::make($request->input('password')) : $siswas->password,
        ]);
    
        // Perbarui data pada tabel 'siswas' hanya jika peran adalah 'siswa'
        if ($siswas->role === 'siswa') {
            $siswas->siswa->update([
                'nis' => $request->input('nis'),
                'jenis_kelamin' => $request->input('jenis_kelamin'),
                'class' => $request->input('class'),
                // Tambahkan kolom lain sesuai kebutuhan
            ]);
        }
    
        return redirect('/siswa/edit/'. $id)->with('status', 'Data siswa berhasil diperbarui.');
    }    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

}
