<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduccionMallasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produccion_mallas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('cupo')->nullable();
            $table->integer('cantidad');
            $table->double('desperdicio')->nullable();
            $table->boolean('concluido')->default(false);
            $table->unsignedBigInteger('malla_id');
            $table->foreign('malla_id')->references('id')->on('mallas')->cascadeOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produccion_mallas');
    }
}
