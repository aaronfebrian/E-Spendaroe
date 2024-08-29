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

class TugasController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $guru = Guru::where('user_id', $user->id)->first();

        $tugas = Tugas::with('guru.user', 'subject')->where('guru_id', $guru->id)->latest()->get();
        // dd($materis);
        return Inertia::render('ViewTugas', [
            'tugas' => $tugas,
        ]);
    }


    public function create()
    {
        $gurus = Guru::all();
        $subjects = Subject::all();

        return Inertia::render('Penugasan', compact('gurus', 'subjects'));
    }


    public function store(Request $request)
    {
        $user = $request->user();
        $guru = Guru::with('subjects')->where('user_id', $user->id)->first();

        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_tenggat' => 'required|date',
            'waktu_tenggat' => 'required|date_format:H:i',
            'deskripsi' => 'required|string',
            'file_pendukung' => 'required|file|mimes:pdf,doc,docx',
        ]);

        $tugas = new Tugas();

        $tugas->judul = $request->input('judul');
        $tugas->tanggal_tenggat = $request->input('tanggal_tenggat');
        $tugas->waktu_tenggat = $request->input('waktu_tenggat');
        $tugas->deskripsi = $request->input('deskripsi');
        $tugas->guru_id = $guru->id;
        $tugas->subject_id = $guru->subjects->id;

        $path = "document/";
        $fileName = $request->file('file_pendukung')->getClientOriginalName();
        $request->file('file_pendukung')->move(public_path($path), $fileName);
        $tugas->file_pendukung = $fileName;

        $tugas->save();

        return redirect()->route('penugasan.index')->with('success', 'Tugas berhasil diunggah.');
    }


    public function show(Request $request, $id)
    {
        $tugas = Tugas::with(['guru', 'subject', 'studentassignment'])->find($id);

        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $studentassignment = StudentAssignment::where('siswa_id', $siswa->id)->where('tugas_id', $id)->first();

        // dd($studentassignment);
    
            return inertia('Penugasan.show', [
            'tugas' => $tugas,
            'studentassignment' => $studentassignment,
        ]);
    }     


    public function edit($id)
    {
        $tugas = Tugas::with(['subject'])->find($id);
        // dd($tugas);

        // Pass the data to the view
        return inertia('EditTugas', [
            'tugas' => $tugas,
        ]);
    }


    public function update(Request $request, $id)
    {
        $tugas = Tugas::findOrFail($id);
    
        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_tenggat' => 'required',
            'waktu_tenggat' => 'required',
            'deskripsi' => 'required|string',
            'file_pendukung' => 'nullable|file|mimes:pdf,doc,docx',
        ]);
    
        $tugas->update([
            'judul' => $request->input('judul'),
            'tanggal_tenggat' => $request->input('tanggal_tenggat'),
            'waktu_tenggat' => $request->input('waktu_tenggat'),
            'deskripsi' => $request->input('deskripsi'),
        ]);
    
        // Update file_pendukung only if a new file is provided and it is valid
        if ($request->hasFile('file_pendukung') && $request->file('file_pendukung')->isValid()) {
            $path = "document/";
            $fileName = time() . $request->file('file_pendukung')->getClientOriginalName();
            $request->file('file_pendukung')->move(public_path($path), $fileName);
    
            // Delete the old file if it exists
            if ($tugas->file_pendukung) {
                unlink(public_path($path . $tugas->file_pendukung));
            }
    
            $tugas->update([
                'file_pendukung' => $fileName,
            ]);
        }
    
        return redirect()->route('penugasan.index', ['id' => $id])->with('success', 'Tugas berhasil diperbarui.');
    }
    

    public function destroy(string $id)
    {
        $tugas = Tugas::findOrFail($id);
        $tugas->delete();

        return response()->json(['message' => 'Tugas berhasil dihapus']);
    }


    public function downloadTugas($id)
    {
        $tugas = Tugas::findOrFail($id);

        $pathToFile = public_path('document/' . $tugas->file_pendukung);

        return response()->download($pathToFile, $tugas->file_pendukung);
    }


    public function viewTugas($id)
    {
        $tugas = Tugas::findOrFail($id);

        $pathToFile = public_path('document/' . $tugas->file_pendukung);

        // Gunakan metode header untuk menambahkan header Content-Type
        return response()->file($pathToFile, ['Content-Type' => mime_content_type($pathToFile)]);
    }


    public static function countTugasByGuru($guruId)
    {
        return self::where('guru_id', $guruId)->count();
    }
    

    public function countUploads(Request $request)
    {
        $user = $request->user();
        $guru = Guru::with('materi', 'tugas')->where('user_id', $user->id)->first();

        $jumlahMateri = $guru->materi->count();
        $jumlahTugas = $guru->tugas->count();

        return response()->json([
            'jumlahMateri' => $jumlahMateri,
            'jumlahTugas' => $jumlahTugas,
        ]);
    }


    public function getTugasTerbaru(Request $request)
    {
        // Sesuaikan query berdasarkan kebutuhan Anda
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        
        $tugasTerbaru = Tugas::whereHas('guru', function ($query) use ($siswa) {
            $query->where('class', $siswa->class);
        })  
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get();
        
        // dd($tugasTerbaru);

        return Inertia::render('TugasSaya', [
            'tugasTerbaru' => $tugasTerbaru
        ]);
    }


    public function getLatestTugas(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user();
            
        // Cek apakah user adalah guru
        $guru = Guru::where('user_id', $user->id)->first();
    
        // Jika user adalah guru, ambil tugas yang diunggah oleh guru tersebut
        if ($guru) {
            $assignments = Tugas::with(['subject', 'guru.user'])
                ->whereHas('guru', function ($query) use ($guru) {
                    $query->where('class', $guru->class)
                          ->where('user_id', $guru->user_id); // Menambahkan kondisi ID pengguna guru
                })
                ->latest()
                ->limit(4)
                ->get();
        } else {
            // Jika user bukan guru, cek apakah user adalah siswa
            $siswa = Siswa::where('user_id', $user->id)->first();
    
            // Jika user adalah siswa, ambil tugas berdasarkan kelas siswa
            if ($siswa) {
                $assignments = Tugas::with(['subject', 'guru.user'])
                    ->whereHas('guru', function ($query) use ($siswa) {
                        $query->where('class', $siswa->class);
                    })
                    ->latest()
                    ->limit(2)
                    ->get();
            } else {
                // Jika user bukan guru atau siswa, berikan respons sesuai kebutuhan aplikasi Anda
                return response()->json(['message' => 'User tidak ditemukan.'], 404);
            }
        }
        
        return response()->json($assignments);
    }    


    // public function getLatestAssignment(Request $request)
    // {
    //     // Ambil user (siswa) yang sedang login
    //     $user = $request->user();
    
    //     // Ambil siswa berdasarkan user_id
    //     $siswa = Siswa::where('user_id', $user->id)->first();
    
    //     // Jika siswa ditemukan, lanjutkan
    //     if ($siswa) {
    //         // Ambil tugas berdasarkan kelas guru yang sesuai dengan kelas siswa
    //         $tugas = Tugas::with(['subject', 'guru.user'])
    //             ->whereHas('guru', function ($query) use ($siswa) {
    //                 $query->where('class', $siswa->class);
    //             })
    //             ->latest()
    //             ->limit(4) // Ambil 3 tugas terbaru
    //             ->get();
    
    //         return response()->json($tugas);
    //     }
    
    //     // Jika siswa tidak ditemukan, berikan respons sesuai kebutuhan aplikasi Anda
    //     return response()->json(['message' => 'Siswa tidak ditemukan.'], 404);
    // }


    public function showUploadForm($id)
    {
        $tugas = Tugas::findOrFail($id);
        $studentassignment = StudentAssignment::where('tugas_id', $id)->first();
    
        return inertia('penugasan.showUploadForm', [
            'tugas' => $tugas,
            'studentassignment' => $studentassignment,
        ]);
        // $tugas = Tugas::findOrFail($id);
        // return inertia('penugasan.showUploadForm', [
        //     'tugas' => $tugas,
        // ]);
    }


    public function showUpdateJawabanForm($id)
    {
        $tugas = Tugas::findOrFail($id);
        $studentassignment = StudentAssignment::where('tugas_id', $id)->first();
    
        return inertia('penugasan.showUpdateJawabanForm', [
            'tugas' => $tugas,
            'studentassignment' => $studentassignment,
        ]);
        // $tugas = Tugas::findOrFail($id);
        // return inertia('penugasan.showUploadForm', [
        //     'tugas' => $tugas,
        // ]);
    }


    public function uploadJawaban(Request $request, $tugasId)
    {
        $request->validate([
            'catatan' => 'required|string',
            'file_pendukung' => 'nullable|file|mimes:pdf,doc,docx', // Sesuaikan tipe file yang diizinkan
        ]);
    
        // Dapatkan siswa yang mengirimkan jawaban (sesuaikan dengan logika aplikasi Anda)
        $siswaId = Auth::user()->siswa->id;
    
        $assignment = new StudentAssignment([
            'tugas_id' => $tugasId,
            'siswa_id' => $siswaId,
            'catatan' => $request->input('catatan'),
            // Tambahkan field lain sesuai kebutuhan
        ]);
    
        if ($request->hasFile('file_pendukung')) {
            $file = $request->file('file_pendukung');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('assignments', $fileName, 'public'); // Sesuaikan folder penyimpanan
            $assignment->file_pendukung = $fileName;
        }
    
        $assignment->save();
    
        return redirect()->route('TugasSaya')->with('success', 'Jawaban berhasil dikirim!');
    }


    public function updateJawaban(Request $request, $tugasId)
    {
        $request->validate([
            'catatan' => 'required|string',
            'file_pendukung' => 'nullable|file|mimes:pdf,doc,docx', // Sesuaikan tipe file yang diizinkan
        ]);

        // Dapatkan siswa yang mengirimkan jawaban (sesuaikan dengan logika aplikasi Anda)
        $siswaId = Auth::user()->siswa->id;

        // Cari data student assignment yang sesuai
        $assignment = StudentAssignment::where('tugas_id', $tugasId)
            ->where('siswa_id', $siswaId)
            ->first();

        if (!$assignment) {
            return redirect()->route('TugasSaya')->with('error', 'Data jawaban tidak ditemukan.');
        }

        // Perbarui catatan
        $assignment->catatan = $request->input('catatan');

        // Perbarui file_pendukung jika ada file yang diunggah
        if ($request->hasFile('file_pendukung')) {
            $file = $request->file('file_pendukung');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('assignments', $fileName, 'public'); // Sesuaikan folder penyimpanan
            $assignment->file_pendukung = $fileName;
        }

        $assignment->save();

        return redirect()->route('TugasSaya')->with('success', 'Jawaban berhasil diperbarui!');
    }


    public function downloadStudentAssignment($id)
    {
        $studentassignment = StudentAssignment::findOrFail($id);
        $pathToFile = storage_path('document/' . $studentassignment->file_pendukung);
    
        if (file_exists($pathToFile)) {
            return response()->download($pathToFile, $studentassignment->file_pendukung);
        } else {
            \Log::warning('File not found: ' . $pathToFile);
            abort(404);
        }
    }
    

    public function viewStudentAssignment($id)
    {
        $studentassignment = StudentAssignment::findOrFail($id);
        $pathToFile = storage_path('app/document/' . $studentassignment->file_pendukung);
    
        \Log::info('Path to file: ' . $pathToFile);
    
        if (file_exists($pathToFile)) {
            $mimeType = mime_content_type($pathToFile);
    
            return response()->file($pathToFile, ['Content-Type' => $mimeType]);
        } else {
            \Log::warning('File not found: ' . $pathToFile);
            abort(404);
        }
    }
    

    public function showTugasGuru($id)
    {
        $tugas = Tugas::with(['guru', 'subject', 'studentassignment'])
            ->find($id);

        $studentassignment = StudentAssignment::with('tugas', 'siswa.user')->where('tugas_id', $id)->get();

        // dd($studentassignment);
    
        if (!$tugas) {
            // Handle jika tugas tidak ditemukan
            return response()->json(['message' => 'Tugas tidak ditemukan'], 404);
        }
    
        $guru = $tugas->guru;
    
        if (!$guru) {
            // Handle jika guru tidak ditemukan
            return response()->json(['message' => 'Guru tidak ditemukan'], 404);
        }
    
        // Ambil siswa yang memiliki kelas yang sama dengan guru
        $siswas = User::where('role', 'siswa')
            ->with('siswa')
            ->whereHas('siswa', function ($siswaQuery) use ($guru) {
                $siswaQuery->where('class', $guru->class);
            })
            ->select('id', 'name', 'email', 'role')
            ->get()
            ->map(function ($user) {
                $siswa = $user->siswa;
    
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'nis' => optional($siswa)->nis,
                    'class' => optional($siswa)->class,
                    'jenis_kelamin' => optional($siswa)->jenis_kelamin,
                    'created_at' => $user->created_at,
                ];
            });
    
        return inertia('PenugasanGuru.show', [
            'tugas' => $tugas,
            'studentassignment' => $studentassignment,
            'siswas' => $siswas,  // Menambahkan data siswa ke properti siswas
        ]);
    }


}
