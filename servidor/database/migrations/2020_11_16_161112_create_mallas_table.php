<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMallasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mallas', function (Blueprint $table) {
            $table->id();
            $table->enum('tipoMalla', ['hexagonal', 'olimpica', 'ganadera', 'milimetrica puntas abiertas', 'milimetrica puntas cerradas', 'presoldada']);
            $table->float('celda', 5, 2)->nullable();
            $table->integer('alambre')->nullable();
            $table->float('alto', 5, 2);
            $table->float('largo', 5, 2);
            $table->double('precio', 8, 2);
            $table->string('foto')->nullable();
            $table->boolean('m2');
            $table->bigInteger('cantidad');
            $table->string('descripcion')->nullable();

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
        Schema::dropIfExists('mallas');
    }
}
