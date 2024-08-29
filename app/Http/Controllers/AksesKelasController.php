<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\User;
use App\Models\Guru;

class AksesKelasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $guru = Guru::where('user_id', $user->id)->first();

        // dd($guru);

        $siswas = User::where('role', 'siswa')
        ->with('siswa')
        ->whereHas('siswa', function($siswaQuery) use ($guru) {
            $siswaQuery->where('class', $guru->class);
        })
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

        return Inertia::render('AksesKelas', ['siswas' => $siswas, 'guru' => $guru]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}
