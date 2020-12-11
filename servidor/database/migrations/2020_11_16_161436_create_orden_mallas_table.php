<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenMallasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_mallas', function (Blueprint $table) {
            $table->id();
            $table->float('alto', 5, 2)->nullable();
            $table->float('largo', 5, 2)->nullable();
            $table->integer('cantidad');
            $table->double('subTotal', 10, 2);
            $table->unsignedBigInteger('malla_id');
            $table->foreign('malla_id')->references('id')->on('mallas')->cascadeOnDelete();

            $table->unsignedBigInteger('pedido_id');
            $table->foreign('pedido_id')->references('id')->on('pedidos')->cascadeOnDelete();

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
        Schema::dropIfExists('orden_mallas');
    }
}
