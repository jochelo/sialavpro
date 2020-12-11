<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlambresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alambres', function (Blueprint $table) {
            $table->id();
            $table->enum('tipoAlambre', ['amarre', 'galvanizado', 'puas']);
            $table->integer('awg');
            $table->float('peso', 8, 2);
            $table->double('precio', 9, 2);
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
        Schema::dropIfExists('alambres');
    }
}
