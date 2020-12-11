<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGavionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gavions', function (Blueprint $table) {
            $table->id();
            $table->enum('tipoGavion', ['gavion', 'colchoneta']);
            $table->float('alto', 5, 2);
            $table->float('ancho', 5, 2);
            $table->float('largo', 5, 2);
            $table->integer('alambre')->nullable();
            $table->float('celda', 4, 2)->nullable();
            $table->integer('numeroDiafragma');
            $table->double('precio', 8, 2);
            $table->string('foto')->nullable();
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
        Schema::dropIfExists('gavions');
    }
}
