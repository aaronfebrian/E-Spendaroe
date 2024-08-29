<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('studentassignment', function (Blueprint $table) {
            $table->id();
            $table->string('catatan');
            $table->string('file_pendukung'); // Sesuaikan tipe data dengan kebutuhan Anda
            $table->unsignedBigInteger('siswa_id');
            $table->unsignedBigInteger('tugas_id');
            $table->timestamp('waktu_pengumpulan')->nullable();
            $table->string('status_pengumpulan')->default('belum mengumpulkan');
            $table->foreign('siswa_id')->references('id')->on('siswas');
            $table->foreign('tugas_id')->references('id')->on('tugas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('studentassignment', function (Blueprint $table) {
            $table->dropColumn('waktu_pengumpulan');
            $table->dropColumn('status_pengumpulan');
        });
    }
};
