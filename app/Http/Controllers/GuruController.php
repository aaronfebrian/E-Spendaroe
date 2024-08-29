<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Guru;
use App\Models\Subject;
use App\Models\User;

class GuruController extends Controller
{
    /**                 
     * Display a listing of the resource.
     */
    public function index()
    {
        $gurus = User::where('role', 'guru')
                     ->with('guru')
                     ->select('id', 'name', 'email', 'created_at', 'role') // Pilih kolom yang diperlukan dari tabel 'users'
                     ->get()
                     ->map(function ($user) {
                         return [
                             'id' => $user->id,
                             'name' => $user->name,
                             'email' => $user->email,
                             'role' => $user->role,
                             'nip' => optional($user->guru)->nip,
                             'subject' => optional($user->guru)->subject,
                             'jenis_kelamin' => optional($user->guru)->jenis_kelamin,
                             'class' => optional($user->guru)->class,
                             'created_at' => $user->created_at,
                         ];
                     });
    
        return Inertia::render('DaftarGuru', ['gurus' => $gurus]);
    }    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $gurus = User::where('role', 'guru')->with('guru')->get();
        return Inertia::render('TambahGuru', ['gurus' => $gurus]);
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
            'role' => 'guru',
        ]);

        $guru = $user->guru()->create([
            'nip' => $request->input('nip'),
            'subject' => $request->input('subject'),
            'class' => $request->input('class'),
            'jenis_kelamin' => $request->input('jenis_kelamin'),
            // Tambahkan kolom lain sesuai kebutuhan
        ]);

        if ($guru && $guru->id) {
            $subjectData = [
                'subject_name' => $request->input('subject'),
                'class' => $request->input('class'),
                'guru_id' => $guru->id,
            ];
    
            Subject::create($subjectData);
        }

        return redirect('/guru');
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
        $gurus = User::findOrFail($id);
        return Inertia::render('EditGuru', ['guru' => $gurus]);
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
        'nip' => 'required|string|max:255',
        'class' => 'required|string|max:255',
        'jenis_kelamin' => 'nullable|string|in:Laki-Laki,Perempuan',
        'subject' => 'required|string|max:255',
    ]);

    // Perbarui data guru
    $guru = User::with('guru.subject')->findOrFail($id)->guru;

    // Perbarui data pada tabel 'users'
    $guru->update([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => $request->filled('password') ? Hash::make($request->input('password')) : $guru->password,
    ]);

    // Perbarui data pada tabel 'gurus'
    $guru->update([
        'nip' => $request->input('nip'),
        'subject' => $request->input('subject'),
        'class' => $request->input('class'),
        'jenis_kelamin' => $request->input('jenis_kelamin'),
    ]);

    // Perbarui data pada tabel 'subjects'
    $subjectData = [
        'subject_name' => $request->input('subject'),
        'class' => $request->input('class'),
        'guru_id' => $guru->guru->id,
    ];

    if ($guru->subject) {
        $guru->subject->update($subjectData);
    } else {
        $subject = Subject::create($subjectData);
        $guru->subject()->associate($subject)->save();
    }

    return redirect('/guru/edit/' . $id)->with('status', 'Data guru berhasil diperbarui.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
