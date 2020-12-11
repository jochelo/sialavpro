<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenAlambresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_alambres', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad');
            $table->double('subTotal', 10, 2);

            $table->unsignedBigInteger('alambre_id');
            $table->foreign('alambre_id')->references('id')->on('alambres')->cascadeOnDelete();

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
        Schema::dropIfExists('orden_alambres');
    }
}
