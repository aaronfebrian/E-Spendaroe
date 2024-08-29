<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Admin;
use App\Models\User;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = User::where('role', 'admin')
                     ->with('admin')
                     ->select('id', 'name', 'email', 'created_at', 'role') // Pilih kolom yang diperlukan dari tabel 'users'
                     ->get()
                     ->map(function ($user) {
                         return [
                             'id' => $user->id,
                             'name' => $user->name,
                             'email' => $user->email,
                             'role' => $user->role,
                             'jenis_kelamin' => optional($user->admin)->jenis_kelamin,
                             'telepon' => optional($user->admin)->telepon,
                             'created_at' => $user->created_at,
                         ];
                     });
    
        return Inertia::render('DaftarAdmin', ['admins' => $admins]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $admins = User::where('role', 'admin')->with('admin')->get();
        return Inertia::render('TambahAdmin', ['admins' => $admins]);
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
            'role' => 'admin',
        ]);

        $user->admin()->create([
            'jenis_kelamin' => $request->input('jenis_kelamin'),
            'telepon' => $request->input('telepon'),
            // Tambahkan kolom lain sesuai kebutuhan
        ]);

        return redirect('/admin');
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
    public function edit(string $id)
    {
        $admins = User::findOrFail($id);
        return Inertia::render('EditAdmin', ['admin' => $admins]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
                // Validasi request jika diperlukan
                $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|email|unique:users,email,' . $id,
                    'password' => 'nullable|string|min:8',
                    'jenis_kelamin' => 'nullable|string|in:Laki-Laki,Perempuan', // Perbarui aturan validasi 
                    'telepon' => 'required|string|max:255',
                ]);
        
                // Perbarui data siswa
                $admins = User::findOrFail($id);
                // Perbarui data pada tabel 'users'
                $admins->update([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => $request->filled('password') ? Hash::make($request->input('password')) : $admins->password,
                ]);

                // Perbarui data pada tabel 'siswas'
                $admins->admin->update([
                    'jenis_kelamin' => $request->input('jenis_kelamin'),
                    'telepon' => $request->input('telepon'),
                    // Tambahkan kolom lain sesuai kebutuhan
                ]);

                return redirect('/admin/edit/'. $id)->with('status', 'Data admin berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
