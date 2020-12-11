<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MallaController;
use App\Http\Controllers\GavionController;
use App\Http\Controllers\AlambreController;
use App\Http\Controllers\CajaclavoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\ProduccionMallaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:api'], function() {

    Route::post('get-user', [AuthController::class, 'getUser']);

    /*
     * Mallas
     * */

    Route::get('get-mallas', [MallaController::class, 'getMallas']);
    Route::post('paginate-mallas', [MallaController::class, 'paginateMallas']);
    Route::post('store-malla', [MallaController::class, 'storeMalla']);
    Route::post('update-malla', [MallaController::class, 'updateMalla']);
    Route::delete('delete-malla/{id}', [MallaController::class, 'destroyMalla']);

    /*
     * Gaviones
     * */

    Route::post('paginate-gaviones', [GavionController::class, 'paginateGaviones']);
    Route::post('store-gavion', [GavionController::class, 'storeGavion']);
    Route::post('update-gavion', [GavionController::class, 'updateGavion']);
    Route::delete('delete-gavion/{id}', [GavionController::class, 'destroyGavion']);

    /*
     * Alambres
     * */

    Route::post('paginate-alambres', [AlambreController::class, 'paginateAlambres']);
    Route::post('store-alambre', [AlambreController::class, 'storeAlambre']);
    Route::post('update-alambre', [AlambreController::class, 'updateAlambre']);
    Route::delete('delete-alambre/{id}', [AlambreController::class, 'destroyAlambre']);

    /*
     * Cajaclavos
     * */

    Route::post('paginate-cajaclavos', [CajaclavoController::class, 'paginateCajaclavos']);
    Route::post('store-cajaclavo', [CajaclavoController::class, 'storeCajaclavo']);
    Route::post('update-cajaclavo', [CajaclavoController::class, 'updateCajaclavo']);
    Route::delete('delete-cajaclavo/{id}', [CajaclavoController::class, 'destroyCajaclavo']);

    /*
     * Clientes
     * */

    Route::post('paginate-clientes', [ClienteController::class, 'paginateClientes']);
    Route::post('store-cliente', [ClienteController::class, 'storeCliente']);
    Route::post('update-cliente', [ClienteController::class, 'updateCliente']);
    Route::delete('delete-cliente/{id}', [ClienteController::class, 'destroyCliente']);

    /*
     * Empleados
     * */

    Route::get('get-empleados-malleros', [EmpleadoController::class, 'getEmpleadosMalleros']);
    Route::post('paginate-empleados', [EmpleadoController::class, 'paginateEmpleados']);
    Route::post('store-empleado', [EmpleadoController::class, 'storeEmpleado']);
    Route::post('update-empleado', [EmpleadoController::class, 'updateEmpleado']);
    Route::delete('delete-empleado/{id}', [EmpleadoController::class, 'destroyEmpleado']);

    /*
     * Reservas
     * */

    Route::post('paginate-reservas', [ReservaController::class, 'paginateReservas']);

    Route::post('update-reserva', [ReservaController::class, 'updateReserva']);
    Route::delete('delete-reserva/{id}', [ReservaController::class, 'destroyReserva']);
    Route::post('recepcionar-reserva', [ReservaController::class, 'recepcionarReserva']);

    /*
     * ProduccionMallas
     * */

    Route::post('paginate-produccion-mallas-fecha', [ProduccionMallaController::class, 'paginateProduccionMallasFecha']);
    Route::post('store-produccion-malla-individual', [ProduccionMallaController::class, 'storeProduccionMallaIndividual']);
    Route::post('store-produccion-malla-grupal', [ProduccionMallaController::class, 'storeProduccionMallaGrupal']);
    Route::post('store-produccion-malla-sin-cupo', [ProduccionMallaController::class, 'storeProduccionMallaSinCupo']);
    Route::post('update-produccion-malla', [ProduccionMallaController::class, 'updateProduccionMalla']);
    Route::delete('delete-produccion-malla/{id}', [ProduccionMallaController::class, 'destroyProduccionMalla']);

});

Route::get('users', [UsuarioController::class, 'index']);

Route::post('login', [AuthController::class, 'login']);

/*
 * Store Reserva
 * */

Route::post('store-reserva', [ReservaController::class, 'storeReserva']);
