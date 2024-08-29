<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Subject;
use App\Models\Admin;
use App\Models\User;


class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
/**
 * Update the user's profile information.
 */
public function update(ProfileUpdateRequest $request): RedirectResponse
{
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
        $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    // Jika pengguna adalah guru, simpan subject ke tabel "gurus"
    if ($request->user()->role === 'guru') {
        $subject = $request->input('subject');
        if ($subject) {
            // Perbarui data guru
            $guru = Guru::updateOrcreate(
                ['user_id' => $request->user()->id],
                [
                    'subject' => $subject,
                    'jenis_kelamin' => $request->input('jenis_kelamin'),    
                    'nip' => $request->input('nip'),
                    'class' => $request->input('class')
                ]
            );
    
            // Buat atau perbarui data mata pelajaran di tabel "subjects"
            $subjectData = Subject::updateOrcreate(
                [
                    'subject_name' => $subject,
                    'class' => $request->input('class'),
                    'guru_id' => $guru->id,
                ]
            );
        }
    }
    
    if ($request->user()->role === 'siswa') {
        // Jika pengguna adalah siswa, Anda tidak perlu menyertakan 'nip'
        Siswa::updateOrcreate(
            ['user_id' => $request->user()->id],
            [
                'nis' => $request->input('nis'),
                'jenis_kelamin' => $request->input('jenis_kelamin'),
                'class' => $request->input('class')
            ]
        );
    }

    if ($request->user()->role === 'admin') {
        // Jika pengguna adalah siswa, Anda tidak perlu menyertakan 'nip'
        Admin::updateOrcreate(
            ['user_id' => $request->user()->id],
            [
                'telepon' => $request->input('telepon'),
            ]
        );
    }

    return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
