<?php

namespace App\Http\Controllers;

use App\Models\Malla;
use App\Models\ProduccionMalla;
use App\Models\ProduccionMallaEmpleado;
use Carbon\Carbon;

class ProduccionMallaController extends Controller
{
    public function storeProduccionMallaIndividual()
    {
        $produccionMallaRequest = \request()->all();
        $empleados = $produccionMallaRequest['empleados'];
        foreach ($empleados as $empleado) {
            $produccionMalla = ProduccionMalla::create([
                'fecha' => $produccionMallaRequest['fecha'],
                'cupo' => $produccionMallaRequest['cupo'],
                'cantidad' => 0,
                'malla_id' => $produccionMallaRequest['idmalla']
            ]);
            ProduccionMallaEmpleado::create([
               'produccion_malla_id' => $produccionMalla['id'],
               'empleado_id' => $empleado['id']
            ]);
        }
        $items = 5;

        $now = Carbon::now()->format('Y-m-d');
        $produccionMallas = ProduccionMalla::whereDate('fecha', $now)->paginate($items);

        return response()->json($produccionMallas, 201);
    }

    public function storeProduccionMallaGrupal()
    {
        $produccionMallaRequest = \request()->all();
        $empleados = $produccionMallaRequest['empleados'];
        $produccionMalla = ProduccionMalla::create([
            'fecha' => $produccionMallaRequest['fecha'],
            'cupo' => $produccionMallaRequest['cupo'],
            'cantidad' => 0,
            'malla_id' => $produccionMallaRequest['idmalla']
        ]);
        foreach ($empleados as $empleado) {
            ProduccionMallaEmpleado::create([
                'produccion_malla_id' => $produccionMalla['id'],
                'empleado_id' => $empleado['id']
            ]);
        }
        $items = 5;

        $now = Carbon::now()->format('Y-m-d');
        $produccionMallas = ProduccionMalla::whereDate('fecha', $now)->paginate($items);

        return response()->json($produccionMallas, 201);
    }

    public function updateProduccionMalla()
    {
        $produccionMallaRequest = \request()->all();
        $produccionMalla = ProduccionMalla::find($produccionMallaRequest['id']);

        $produccionMallaRequest['concluido'] = true;
        if ($produccionMallaRequest['cantidad'] === null) {
            $produccionMallaRequest['cantidad'] = 0;
        }

        $cantidad = $produccionMallaRequest['cantidad'] - $produccionMalla['cantidad'];

        $produccionMalla->update($produccionMallaRequest);

        $malla = Malla::find($produccionMalla['malla_id']);
        $malla->cantidad = $malla->cantidad + $cantidad;
        $malla->save();

        return response()->json($produccionMalla, 201);
    }

    public function paginateProduccionMallasFecha()
    {
        $items = \request()->input('items');
        // $now = Carbon::now()->format('Y-m-d');
        $fecha = \request()->input('fecha');

        $produccionMallas = ProduccionMalla::whereDate('fecha', $fecha)->paginate($items);

        return response()->json($produccionMallas, 200);
    }

    public function destroyProduccionMalla($id)
    {
        $produccionMalla = ProduccionMalla::find($id);
        $produccionMalla->delete();

        return response()->json($produccionMalla['id'], 200);
    }
}
