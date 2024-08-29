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
        Schema::create('tugas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->date('tanggal_tenggat');
            $table->time('waktu_tenggat');
            $table->text('deskripsi');
            $table->string('file_pendukung'); // Sesuaikan tipe data dengan kebutuhan Anda
            $table->unsignedBigInteger('guru_id');
            $table->unsignedBigInteger('subject_id');
            $table->foreign('guru_id')->references('id')->on('gurus');
            $table->foreign('subject_id')->references('id')->on('subjects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tugas');
    }
};
