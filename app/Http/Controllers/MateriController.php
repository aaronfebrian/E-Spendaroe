<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Materi;
use App\Models\Guru;
use App\Models\Subject;
use App\Models\Siswa;

class MateriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $guru = Guru::where('user_id', $user->id)->first();

        $materis = Materi::with('guru.user', 'subject')->where('guru_id', $guru->id)->latest()->get();
        // dd($materis);
        return Inertia::render('LihatMateri', [
            'materis' => $materis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $gurus = Guru::all();
        $subjects = Subject::all();

        return Inertia::render('UnggahMateri', compact('gurus', 'subjects'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $guru = Guru::with('subjects')->where('user_id', $user->id)->first();

        $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal_upload' => 'required|date',
            'deskripsi' => 'required|string',
            'file_pendukung' => 'required|file|mimes:pdf,doc,docx', // Sesuaikan dengan ekstensi file yang diizinkan
        ]);

        $materi = new Materi();

        $materi->judul = $request->input('judul');
        $materi->tanggal_upload = $request->input('tanggal_upload');
        $materi->deskripsi = $request->input('deskripsi');
        $materi->guru_id = $guru->id;
        $materi->subject_id = $guru->subjects->id;

        $uploadedFile = $request->file('file_pendukung');
        $originalFileName = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $uploadedFile->getClientOriginalExtension();
    
        // Buat nama file yang unik dengan timestamp
        $fileName = $originalFileName . '_' . time() . '.' . $extension;
    
        // Ganti nama file dengan nama yang sudah diformat
        $materi->file_pendukung = $fileName;
    
        $path = "document/";
        $uploadedFile->move(public_path($path), $fileName);
    

        $materi->save();

        return redirect()->route('materi.index')->with('success', 'Materi berhasil diunggah.');
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     // Fetch materi data with teacher's name
    //     $materi = Materi::with(['subject'])->find($id);

    //     // dd($materi);

    //     // Pass the data to the view
    //     return inertia('Materi.show', [
    //         'materi' => $materi,
    //     ]);
    // }

    public function show($subjectId)
    {
        // Ambil data materi berdasarkan subject_id
        $materi = Materi::where('subject_id', $subjectId)->first();

        // Periksa apakah materi ditemukan
        if ($materi) {
            // Jika ditemukan, tampilkan halaman materi
            return view('materi.show', compact('materi'));
        } else {
            // Jika tidak ditemukan, mungkin tampilkan pesan error atau redirect ke halaman lain
            abort(404, 'Materi tidak ditemukan');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $materi = Materi::with(['subject'])->find($id);

        // Pass the data to the view
        return inertia('EditMateri', [
            'materi' => $materi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $materi = Materi::find($id);

        // dd($request->all()); 
    
        $request->validate([
            'judul' => 'nullable|string|max:255',
            'tanggal_upload' => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'file_pendukung' => 'nullable|file|mimes:pdf,doc,docx',
        ]);
    
        // Update Materi fields
        $materi->update([
            'judul' => $request->input('judul'),
            'tanggal_upload' => $request->input('tanggal_upload'),
            'deskripsi' => $request->input('deskripsi'),
        ]);
    
        // Update file_pendukung if a new file is provided
        if ($request->hasFile('file_pendukung') && $request->file('file_pendukung')->isValid()) {
            $path = "document/";
            $uploadedFile = $request->file('file_pendukung');
            $originalFileName = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $uploadedFile->getClientOriginalExtension();
    
            // Buat nama file yang unik dengan timestamp
            $fileName = $originalFileName . '_' . time() . '.' . $extension;
    
            // Delete the old file if it exists
            if ($materi->file_pendukung) {
                unlink(public_path($path . $materi->file_pendukung));
            }
    
            $uploadedFile->move(public_path($path), $fileName);
    
            $materi->update([
                'file_pendukung' => $fileName,
            ]);
        }

        return redirect()->route('materi.index', ['id' => $id])->with('success', 'Materi berhasil diperbarui.');
    }    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $materi = Materi::findOrFail($id);
        $materi->delete();

        return response()->json(['message' => 'Materi berhasil dihapus']);
    }

    public function downloadMateri($id)
    {
        $materi = Materi::findOrFail($id);

        $pathToFile = public_path('document/' . $materi->file_pendukung);

        return response()->download($pathToFile, $materi->file_pendukung);
    }

    public function viewFile($id)
    {
        $materi = Materi::findOrFail($id);

        $pathToFile = public_path('document/' . $materi->file_pendukung);

        // Gunakan metode header untuk menambahkan header Content-Type
        return response()->file($pathToFile, ['Content-Type' => mime_content_type($pathToFile)]);
    }

    public function indexForAgama(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Agama')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Agama', [
            'materis' => $materis,
        ]);
    }

    public function indexForSenbud(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Seni Budaya')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Senbud', [
            'materis' => $materis,
        ]);
    }

    public function indexForBindo(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Bahasa Indonesia')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Bindo', [
            'materis' => $materis,
        ]);
    }

    public function indexForPkn(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Pendidikan Kewarganegaraan')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Pkn', [
            'materis' => $materis,
        ]);
    }

    public function indexForMtk(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Matematika')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Mtk', [
            'materis' => $materis,
        ]);
    }

    public function indexForIpa(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Ilmu Pengetahuan Alam')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Ipa', [
            'materis' => $materis,
        ]);
    }

    public function indexForIps(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Ilmu Pengetahuan Sosial')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Ips', [
            'materis' => $materis,
        ]);
    }

    public function indexForPrakarya(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Prakarya')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Prakarya', [
            'materis' => $materis,
        ]);
    }

    public function indexForPenjas(Request $request)
    {
        $user = $request->user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $subject = Subject::where('subject_name', 'Pendidikan Jasmani')->where('class', $siswa->class)->first();
        $materis = Materi::with('guru.user', 'subject')->where('subject_id', $subject->id)->latest()->get();
    
        return Inertia::render('Penjas', [
            'materis' => $materis,
        ]);
    }
    
    public function showForStudent($id)
    {
        $materi = Materi::with(['subject', 'guru.user'])->find($id);
    
        return inertia('Materi.showForStudent', [
            'materi' => $materi,
        ]);
    }    

    public function countUploadedMateri(Request $request)
    {
        // Dapatkan ID guru dari pengguna yang sedang login
        $guruId = Auth::user()->guru->id;
    
        // Hitung jumlah materi yang diunggah oleh guru dengan ID tertentu
        $jumlahMateri = Materi::where('guru_id', $guruId)
                            ->whereNotNull('id') // tambahkan kondisi ini jika ingin menghitung materi yang memiliki ID tidak null
                            ->whereNotNull('id_guru') // tambahkan kondisi ini jika ingin menghitung materi yang memiliki ID guru tidak null
                            ->whereNotNull('id_subject') // tambahkan kondisi ini jika ingin menghitung materi yang memiliki ID subject tidak null
                            ->count();
    
        return response()->json(['jumlahMateri' => $jumlahMateri]);
    }

    public function getLatestMateri(Request $request)
    {
        // Ambil user (guru) yang sedang login
        $user = $request->user();
            
        // Ambil guru berdasarkan user_id
        $guru = Guru::where('user_id', $user->id)->first();
    
        // Jika guru ditemukan, lanjutkan
        if ($guru) {
            // Ambil materi berdasarkan guru_id yang sesuai dengan guru yang login
            $materi = Materi::with(['subject', 'guru.user'])
                ->where('guru_id', $guru->id)
                ->latest()
                ->limit(3) // Ambil 3 materi terbaru
                ->get();
    
            return response()->json($materi);
        }
    
        // Jika guru tidak ditemukan, berikan respons sesuai kebutuhan aplikasi Anda
        return response()->json(['message' => 'Guru tidak ditemukan.'], 404);
    }
    

    public function getMateriTerbaru(Request $request)
    {
        // Ambil user (siswa) yang sedang login
        $user = $request->user();
    
        // Ambil siswa berdasarkan user_id
        $siswa = Siswa::where('user_id', $user->id)->first();
    
        // Jika siswa ditemukan, lanjutkan
        if ($siswa) {
            // Ambil tugas berdasarkan kelas guru yang sesuai dengan kelas siswa
            $tugas = Materi::with(['subject', 'guru.user'])
                ->whereHas('guru', function ($query) use ($siswa) {
                    $query->where('class', $siswa->class);
                })
                ->latest()
                ->limit(6) // Ambil 3 tugas terbaru
                ->get();
    
            return response()->json($tugas);
        }
    
        // Jika siswa tidak ditemukan, berikan respons sesuai kebutuhan aplikasi Anda
        return response()->json(['message' => 'Siswa tidak ditemukan.'], 404);
    }

    public function getAllMateri(Request $request)
    {
        // Ambil user (siswa) yang sedang login
        $user = $request->user();
    
        // Ambil siswa berdasarkan user_id
        $siswa = Siswa::where('user_id', $user->id)->first();
    
        // Jika siswa ditemukan, lanjutkan
        if ($siswa) {
            // Ambil tugas berdasarkan kelas guru yang sesuai dengan kelas siswa
            $tugas = Materi::with(['subject', 'guru.user'])
                ->whereHas('guru', function ($query) use ($siswa) {
                    $query->where('class', $siswa->class);
                })
                ->latest()
                // ->limit(3) // Ambil 3 tugas terbaru
                ->get();
    
            return response()->json($tugas);
        }
    
        // Jika siswa tidak ditemukan, berikan respons sesuai kebutuhan aplikasi Anda
        return response()->json(['message' => 'Siswa tidak ditemukan.'], 404);
    }

    public function showBySubject(Subject $subject)
    {
        // Ambil materi berdasarkan subject
        $materi = Materi::where('subject_id', $subject->id)->get();

        return view('materi.index', compact('materi'));
    }
}
