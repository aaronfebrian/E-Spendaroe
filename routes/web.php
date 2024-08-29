<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MateriController; 
use App\Http\Controllers\JumlahSiswaGuruController;
use App\Http\Controllers\DeleteSiswaController;
use App\Http\Controllers\DeleteGuruController;
use App\Http\Controllers\DeleteAdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KelasAjarController;
use App\Http\Controllers\AksesKelasController;
use App\Http\Controllers\SiswaMateriController;
use App\Http\Controllers\TugasController;
use App\Http\Controllers\StudentAssignmentController;
use Illuminate\Http\JsonResponse;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/unggahmateri', [MateriController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('unggahmateri');

Route::post('/unggahmateri', [MateriController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('unggahmateri');

Route::inertia('/siswa/edit/{id}', 'EditSiswa')->name('siswa.edit');

// Route::get('/materi', [MateriController::class, 'index'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri');

// Route::get('/materi/create', [MateriController::class, 'create'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri.store');

// Route::post('/materi', [MateriController::class, 'store'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri');

// Route::get('/materi/{id}', [MateriController::class, 'show'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri.store');
// Route::get('/materi/{id}/edit', [MateriController::class, 'edit'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri.store');
// Route::patch('/materi/{id}', [MateriController::class, 'update'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri.store');
// Route::delete('/materi/{id}', [MateriController::class, 'delete'])
//     ->middleware(['auth', 'verified'])
//     ->name('unggahmateri.store');


Route::middleware(['auth'])->group(function () {
    // Rute untuk halaman "Tugas Saya"
    Route::get('/tugassaya', function () {
        return Inertia::render('TugasSaya');
    })->name('tugassaya');
    Route::get('/formtugas', function () {
        return Inertia::render('FormTugas');
    })->name('formtugas');
    Route::get('/pengumpulantugas', function () {
        return Inertia::render('PengumpulanTugas');
    })->name('pengumpulantugas');
    Route::get('/allmateri', function () {
        return Inertia::render('AllMateri');
    })->name('allmateri');
    Route::get('/bindo', function () {
        return Inertia::render('Bindo');
    })->name('bindo');
    Route::get('/pkn', function () {
        return Inertia::render('Pkn');
    })->name('pkn');
    Route::get('/mtk', function () {
        return Inertia::render('Mtk');
    })->name('mtk');
    Route::get('/ipa', function () {
        return Inertia::render('Ipa');
    })->name('ipa');
    Route::get('/ips', function () {
        return Inertia::render('Ips');
    })->name('ips');
    Route::get('/agama', function () {
        return Inertia::render('Agama');
    })->name('agama');
    Route::get('/senbud', function () {
        return Inertia::render('Senbud');
    })->name('senbud');
    Route::get('/prakarya', function () {
        return Inertia::render('Prakarya');
    })->name('prakarya');
    Route::get('/penjas', function () {
        return Inertia::render('Penjas');
    })->name('penjas');
    Route::get('/lihatmateri', function () {
        return Inertia::render('LihatMateri');
    })->name('lihatmateri');
    Route::get('/akseskelas', function () {
        return Inertia::render('AksesKelas');
    })->name('akseskelas');
    Route::get('/unggahmateri', function () {
        return Inertia::render('UnggahMateri');
    })->name('unggahmateri');
    Route::get('/penugasan', function () {
        return Inertia::render('Penugasan');
    })->name('penugasan');


    Route::get('/guru', [GuruController::class, 'index'])->name('guru.index');
    Route::get('/guru/create', [GuruController::class, 'create'])->name('guru.create');
    Route::post('/guru', [GuruController::class, 'store'])->name('guru.store');

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/create', [AdminController::class, 'create'])->name('admin.create');
    Route::post('/admin', [AdminController::class, 'store'])->name('admin.store');

    Route::get('/siswa', [SiswaController::class, 'index'])->name('siswa.index');
    Route::get('/siswa/create', [SiswaController::class, 'create'])->name('siswa.create');
    Route::post('/siswa', [SiswaController::class, 'store'])->name('siswa.store');

    Route::get('/jumlahsiswa', [JumlahSiswaGuruController::class, 'getJumlahSiswa']);
    Route::get('/jumlahguru', [JumlahSiswaGuruController::class, 'getJumlahGuru']);
    Route::get('/jumlahadmin', [JumlahSiswaGuruController::class, 'getJumlahAdmin']);
    
    Route::get('/api/users', [UserController::class, 'index']);
    Route::get('/user/total', [UserController::class, 'getTotalUsersWeb']);

    Route::get('/kelas-ajar', [KelasAjarController::class, 'index'])->name('kelas-ajar.index');
    
    Route::get('/akseskelas', [AksesKelasController::class, 'index'])
    ->middleware(['auth'])
    ->name('akseskelas');

    Route::get('/penugasan', [AksesKelasController::class, 'index'])
    ->middleware(['auth'])
    ->name('akseskelas');

    Route::get('/materi/download/{id}', [MateriController::class, 'downloadMateri'])
    ->middleware(['auth'])
    ->name('materi.download');

    Route::get('/penugasan/download/{id}', [TugasController::class, 'downloadTugas'])
    ->middleware(['auth'])
    ->name('tugas.download');

    Route::get('/materi/create', [MateriController::class, 'create'])->name('materi.create');
    Route::post('/materi/store', [MateriController::class, 'store'])->name('materi.store');
    Route::get('/materi', [MateriController::class, 'index'])->name('materi.index');
    Route::delete('/materi/{id}', [MateriController::class, 'destroy']);
    // Anda dapat menambahkan rute lainnya di sini sesuai kebutuhan.
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::patch('/guru/update', 'GuruController@update')->name('guru.update');
    Route::get('/guru/edit/{id}', [GuruController::class, 'edit'])->name('guru.edit');
    Route::put('/update-guru/{id}', [GuruController::class, 'update'])->name('guru.update');
    
    
    Route::put('/update-admin/{id}', [AdminController::class, 'update'])->name('admin.update');
    Route::get('/admin/edit/{id}', [AdminController::class, 'edit'])->name('admin.edit');


    Route::put('/update-siswa/{id}', [SiswaController::class, 'update'])->name('siswa.update');
    Route::get('/siswa/edit/{id}', [SiswaController::class, 'edit'])->name('siswa.edit');


    Route::delete('/hapussiswa/{user}', [DeleteSiswaController::class, 'hapusSiswa']);
    Route::delete('/hapusguru/{user}', [DeleteGuruController::class, 'hapusGuru']);
    Route::delete('/hapusadmin/{user}', [DeleteAdminController::class, 'hapusAdmin']);


    Route::get('/daftarguru', [GuruController::class, 'index'])->name('daftar.guru');
    Route::get('/daftarsiswa', [SiswaController::class, 'index'])->name('daftar.siswa');
    Route::get('/daftaradmin', [AdminController::class, 'index'])->name('daftar.admin');
    

    Route::put('/update-user/{id}', [UserController::class, 'update'])->name('user.update');
    Route::get('/user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');


    Route::get('/materi/edit/{id}', [MateriController::class, 'edit'])->name('materi.edit');
    Route::put('/materi/{id}', [MateriController::class, 'update'])->name('materi.update');
    Route::get('/materi/{id}', [MateriController::class, 'show'])->name('materi.show');
    Route::get('/materi/view/{id}', [MateriController::class, 'viewFile'])->name('materi.viewFile');
    Route::get('/materi/{subject}', [MateriController::class, 'showBySubject'])->name('materi.showBySubject');


    Route::get('/senbud', [MateriController::class, 'indexForSenbud'])->name('senbud');
    Route::get('/agama', [MateriController::class, 'indexForAgama'])->name('agama');
    Route::get('/bindo', [MateriController::class, 'indexForBindo'])->name('bindo');
    Route::get('/pkn', [MateriController::class, 'indexForPkn'])->name('pkn');
    Route::get('/mtk', [MateriController::class, 'indexForMtk'])->name('mtk');
    Route::get('/ipa', [MateriController::class, 'indexForIpa'])->name('ipa');
    Route::get('/ips', [MateriController::class, 'indexForIps'])->name('ips');
    Route::get('/prakarya', [MateriController::class, 'indexForPrakarya'])->name('prakarya');
    Route::get('/penjas', [MateriController::class, 'indexForPenjas'])->name('penjas');
    Route::get('/senbud/{id}', [MateriController::class, 'showForStudent'])->name('senbud.show');
    Route::get('/agama/{id}', [MateriController::class, 'showForStudent'])->name('agama.show');
    Route::get('/bindo/{id}', [MateriController::class, 'showForStudent'])->name('bindo.show');
    Route::get('/pkn/{id}', [MateriController::class, 'showForStudent'])->name('pkn.show');
    Route::get('/mtk/{id}', [MateriController::class, 'showForStudent'])->name('mtk.show');
    Route::get('/ipa/{id}', [MateriController::class, 'showForStudent'])->name('ipa.show');
    Route::get('/ips/{id}', [MateriController::class, 'showForStudent'])->name('ips.show');
    Route::get('/prakarya/{id}', [MateriController::class, 'showForStudent'])->name('prakarya.show');
    Route::get('/penjas/{id}', [MateriController::class, 'showForStudent'])->name('penjas.show');


    Route::get('/count-uploads', [TugasController::class, 'countUploads'])->name('count.uploads');


    Route::get('/penugasan', [TugasController::class, 'index'])->name('penugasan.index');
    Route::get('/penugasan/create', [TugasController::class, 'create'])->name('penugasan.create');
    Route::post('/penugasan/store', [TugasController::class, 'store'])->name('penugasan.store');
    // Route::get('/penugasan/{id}', [TugasController::class, 'show'])->name('penugasan.show');
    Route::get('/penugasan/edit/{id}', [TugasController::class, 'edit'])->name('penugasan.edit');
    Route::put('/penugasan/{id}', [TugasController::class, 'update'])->name('penugasan.update');
    Route::get('/penugasan/{id}', [TugasController::class, 'showTugasGuru'])->name('penugasan.showTugasGuru');
    Route::get('/penugasan/view/{id}', [TugasController::class, 'viewTugas'])->name('penugasan.viewTugas');
    Route::get('/penugasan/show/{id}', [TugasController::class, 'show'])->name('PenugasanShow');
    Route::delete('/penugasan/{id}', [TugasController::class, 'destroy']);


    Route::get('/penugasan/upload/{id}', [TugasController::class, 'showUploadForm'])->name('penugasan.showUploadForm');
    Route::get('/penugasan/update/{id}', [TugasController::class, 'showUpdateJawabanForm'])->name('penugasan.showUpdateJawabanForm');
    Route::post('/penugasan/upload/{id}', [TugasController::class, 'uploadJawaban'])->name('penugasan.uploadJawaban');
    Route::post('/penugasan/update/{id}', [TugasController::class, 'updateJawaban'])->name('penugasan.updateJawaban');


    Route::get('/get-latest-materi', [MateriController::class, 'getLatestMateri'])->name('Dashboard');
    Route::get('/get-latest-tugas', [TugasController::class, 'getLatestTugas'])->name('Dashboard');
    Route::get('/get-tugas-terbaru', [TugasController::class, 'getTugasTerbaru'])->name('TugasSaya');
    // Route::get('/get-latest-assignment', [TugasController::class, 'getLatestAssignment'])->name('Dashboard');
    Route::get('/get-materi-terbaru', [MateriController::class, 'getMateriTerbaru'])->name('Dashboard');
    Route::get('/get-all-materi', [MateriController::class, 'getAllMateri'])->name('AllMateri');


    Route::get('/penugasan-guru/{id}', [StudentAssignmentController::class, 'show'])->name('PenugasanGuruShow');
    Route::get('/penugasan/view/{id}', [StudentAssignmentController::class, 'viewJawabanSiswa'])->name('penugasan.viewJawabanSiswa');
    Route::get('/penugasan/download/{id}', [StudentAssignmentController::class, 'downloadJawabanSiswa'])->middleware(['auth'])->name('penugasan.downloadJawabanSiswa');

    // Route::get('/penugasan/show/{id}', [StudentAssignmentController::class, 'show'])
    // ->middleware(['auth'])
    // ->name('PenugasanShow');
});


require __DIR__.'/auth.php';
