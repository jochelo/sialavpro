<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenGavionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_gavions', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad');
            $table->double('subTotal', 10, 2);

            $table->unsignedBigInteger('gavion_id');
            $table->foreign('gavion_id')->references('id')->on('gavions')->cascadeOnDelete();

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
        Schema::dropIfExists('orden_gavions');
    }
}
