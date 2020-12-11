<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCajaclavosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cajaclavos', function (Blueprint $table) {
            $table->id();
            $table->enum('tipoClavo', ['calamina', 'construccion']);
            $table->string('longitud');
            $table->integer('bwg');
            $table->double('precio', 9, 2);
            $table->integer('numeroBolsas');
            $table->string('foto')->nullable();
            $table->bigInteger('cantidad')->default(0);
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
        Schema::dropIfExists('cajaclavos');
    }
}
