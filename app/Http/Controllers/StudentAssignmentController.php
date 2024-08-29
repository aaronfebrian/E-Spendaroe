<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Guru;
use App\Models\Subject;
use App\Models\Siswa;
use App\Models\User;
use App\Models\Tugas;
use App\Models\StudentAssignment;

class StudentAssignmentController extends Controller
{
    public function index()
    {
        $studentassignment = StudentAssignment::with('siswa')
            ->select('id', 'catatan', 'file_pendukung', 'siswa_id', 'tugas_id', 'created_at', 'updated_at')
            ->get()
            ->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'catatan' => $assignment->catatan,
                    'file_pendukung' => $assignment->file_pendukung,
                    'siswa_id' => $assignment->siswa_id,
                    'tugas_id' => $assignment->tugas_id,
                    'created_at' => $assignment->created_at,
                    'updated_at' => $assignment->updated_at,
                    'status_pengumpulan' => $assignment->getStatusPengumpulanAttribute(), // Menggunakan accessor jika ada
                ];
            });
    
        return Inertia::render('PenugasanGuruShow', ['studentA]assignment' => $studentassignment]);
    }
    

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }


    public function show($id)
    {
        // $tugas = Tugas::with('studentassignment.siswa')->find($id);
        // $siswas = $tugas->studentassignment;
    
        // return inertia('PenugasanGuruShow', compact('tugas', 'siswas'));

        $tugas = Tugas::findOrFail($id);
        $siswa = auth()->user()->siswa; // Assuming there is a relationship between User and Siswa models
    // dd($siswa);
        // Ensure siswa exists
        if (!$siswa) {
            abort(403, 'Unauthorized');
        }
    
        // Ambil data student assignment sesuai dengan id siswa
        $studentassignment = StudentAssignment::where('tugas_id', $tugas->id)
            ->where('siswa_id', $siswa->id)
            ->first();
    
            return inertia('PenugasanShow', [
                'tugas' => $tugas,
                'studentassignment' => $studentassignment,
                'auth' => [
                    'user' => auth()->user(),
                ],
            ]);
            
    }
    

    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }


    public function viewJawabanSiswa($id)
    {
        $studentassignment = StudentAssignment::findOrFail($id);

        $pathToFile = storage_path('app/public/assignments/' . $studentassignment->file_pendukung);

        // Gunakan metode header untuk menambahkan header Content-Type
        return response()->file($pathToFile, ['Content-Type' => mime_content_type($pathToFile)]);
    }


    public function downloadJawabanSiswa($id)
    {
        $studentassignment = StudentAssignment::findOrFail($id);
        
        $pathToFile = storage_path('app/public/assignments/' . $studentassignment->file_pendukung);

        return response()->download($pathToFile, $studentassignment->file_pendukung);
    }


    public function viewStudentAssignment($id)
    {
        $studentassignment = StudentAssignment::where('siswa_id', auth()->id())->findOrFail($id);

        $pathToFile = storage_path('app/document/' . $studentassignment->file_pendukung);

        if (Storage::exists('document/' . $studentassignment->file_pendukung)) {
            $mimeType = Storage::mimeType('document/' . $studentassignment->file_pendukung);

            return response()->file($pathToFile, ['Content-Type' => $mimeType]);
        } else {
            abort(404);
        }
    }


    public function getStudentAssignment($id)
    {
        $siswaId = auth()->user()->siswas->id; // Mengambil ID siswa yang sedang login
        $studentassignment = StudentAssignment::where('id', $id)
            ->where('siswa_id', $siswaId)
            ->firstOrFail();
    
        return $studentassignment;
    }

}
