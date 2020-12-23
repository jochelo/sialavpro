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
use App\Http\Controllers\ProduccionGavionController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\AdquisicionAlambreController;
use App\Http\Controllers\AdquisicionCajaclavoController;

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

    Route::get('get-gaviones', [GavionController::class, 'getGaviones']);
    Route::post('paginate-gaviones', [GavionController::class, 'paginateGaviones']);
    Route::post('store-gavion', [GavionController::class, 'storeGavion']);
    Route::post('update-gavion', [GavionController::class, 'updateGavion']);
    Route::delete('delete-gavion/{id}', [GavionController::class, 'destroyGavion']);

    /*
     * Alambres
     * */

    Route::get('get-alambres', [AlambreController::class, 'getAlambres']);
    Route::post('paginate-alambres', [AlambreController::class, 'paginateAlambres']);
    Route::post('store-alambre', [AlambreController::class, 'storeAlambre']);
    Route::post('update-alambre', [AlambreController::class, 'updateAlambre']);
    Route::delete('delete-alambre/{id}', [AlambreController::class, 'destroyAlambre']);

    /*
     * Cajaclavos
     * */

    Route::get('get-cajaclavos', [CajaclavoController::class, 'getCajaclavos']);
    Route::post('paginate-cajaclavos', [CajaclavoController::class, 'paginateCajaclavos']);
    Route::post('store-cajaclavo', [CajaclavoController::class, 'storeCajaclavo']);
    Route::post('update-cajaclavo', [CajaclavoController::class, 'updateCajaclavo']);
    Route::delete('delete-cajaclavo/{id}', [CajaclavoController::class, 'destroyCajaclavo']);

    /*
     * Clientes
     * */

    Route::post('paginate-clientes', [ClienteController::class, 'paginateClientes']);
    Route::get('get-clientes', [ClienteController::class, 'getClientes']);
    Route::post('store-cliente', [ClienteController::class, 'storeCliente']);
    Route::get('show-cliente/{id}', [ClienteController::class, 'showCliente']);
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

    /*
     * ProduccionGaviones
     * */

    Route::post('paginate-produccion-gaviones-fecha', [ProduccionGavionController::class, 'paginateProduccionGavionesFecha']);
    Route::post('store-produccion-gavion-individual', [ProduccionGavionController::class, 'storeProduccionGavionIndividual']);
    Route::post('store-produccion-gavion-grupal', [ProduccionGavionController::class, 'storeProduccionGavionGrupal']);
    Route::post('store-produccion-gavion-sin-cupo', [ProduccionGavionController::class, 'storeProduccionGavionSinCupo']);
    Route::post('update-produccion-gavion', [ProduccionGavionController::class, 'updateProduccionGavion']);
    Route::delete('delete-produccion-gavion/{id}', [ProduccionGavionController::class, 'destroyProduccionGavion']);

    /*
     * Pedidos
     * */

    Route::get('get-pedidos', [PedidoController::class, 'getPedidos']);
    Route::post('paginate-pedidos', [PedidoController::class, 'paginatePedidos']);
    Route::post('store-pedido', [PedidoController::class, 'storePedido']);

    Route::post('update-importe-pedido', [PedidoController::class, 'updateImportePedido']);
    Route::delete('delete-pedido/{id}', [PedidoController::class, 'destroyPedido']);

    /*
     * AdquisicionAlambres
     * */

    Route::get('get-adquisicion-alambres', [AdquisicionAlambreController::class, 'getAdquisicionAlambres']);
    Route::post('paginate-adquisicion-alambres', [AdquisicionAlambreController::class, 'paginateAdquisicionAlambres']);
    Route::post('store-adquisicion-alambre', [AdquisicionAlambreController::class, 'storeAdquisicionAlambre']);
    Route::post('update-adquisicion-alambre', [AdquisicionAlambreController::class, 'updateAdquisicionAlambre']);
    Route::delete('delete-adquisicion-alambre/{id}', [AdquisicionAlambreController::class, 'destroyAdquisicionAlambre']);

    /*
     * AdquisicionCajaclavos
     * */

    Route::get('get-adquisicion-cajaclavos', [AdquisicionCajaclavoController::class, 'getAdquisicionCajaclavos']);
    Route::post('paginate-adquisicion-cajaclavos', [AdquisicionCajaclavoController::class, 'paginateAdquisicionCajaclavos']);
    Route::post('store-adquisicion-cajaclavo', [AdquisicionCajaclavoController::class, 'storeAdquisicionCajaclavo']);
    Route::post('update-adquisicion-cajaclavo', [AdquisicionCajaclavoController::class, 'updateAdquisicionCajaclavo']);
    Route::delete('delete-adquisicion-cajaclavo/{id}', [AdquisicionCajaclavoController::class, 'destroyAdquisicionCajaclavo']);


});

Route::get('users', [UsuarioController::class, 'index']);

Route::post('login', [AuthController::class, 'login']);

/*
 * Store Reserva
 * */

Route::post('store-reserva', [ReservaController::class, 'storeReserva']);


Route::post('update-pedido', [PedidoController::class, 'updatePedido']);
