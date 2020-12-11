<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenCajaclavosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_cajaclavos', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad');
            $table->double('subTotal', 10, 2);

            $table->unsignedBigInteger('cajaclavo_id');
            $table->foreign('cajaclavo_id')->references('id')->on('cajaclavos')->cascadeOnDelete();

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
        Schema::dropIfExists('orden_cajaclavos');
    }
}
