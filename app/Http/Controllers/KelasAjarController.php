<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Guru;
use App\Models\User;

class KelasAjarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        // Mendapatkan data guru dengan kelas yang diampunya
        $userGuru = User::with('guru')->find($user->id); // Sesuaikan dengan hubungan di model User

        return Inertia::render('KelasAjar', [
            'auth' => ['user' => auth()->user()],
            'userGuru' => $userGuru,
        ]);
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
        $kelasAjar = Guru::findOrFail($id);
    
        return inertia('ShowKelasAjar', [
            'kelasAjar' => $kelasAjar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $kelasAjar = Guru::findOrFail($id);

        return inertia('EditKelasAjar', [
            'kelasAjar' => $kelasAjar,
        ]);
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
