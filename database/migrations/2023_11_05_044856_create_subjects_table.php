<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('subject_name'); // Nama mata pelajaran
            $table->string('class'); // Kelas yang diajarkan
            $table->unsignedBigInteger('guru_id'); // ID guru yang mengampu
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('gurus'); // Menghubungkan dengan tabel guru
        });
    }

    public function down()
    {
        Schema::dropIfExists('subjects');
    }
};
