<?php

namespace App\Http\Controllers;

use App\Models\Gavion;
use App\Models\ProduccionGavion;
use App\Models\ProduccionGavionEmpleado;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProduccionGavionController extends Controller
{
    public function storeProduccionGavionIndividual()
    {
        $produccionGavionRequest = \request()->all();
        $empleados = $produccionGavionRequest['empleados'];
        foreach ($empleados as $empleado) {
            $produccionGavion = ProduccionGavion::create([
                'fecha' => $produccionGavionRequest['fecha'],
                'cupo' => $produccionGavionRequest['cupo'],
                'cantidad' => 0,
                'gavion_id' => $produccionGavionRequest['idgavion']
            ]);
            ProduccionGavionEmpleado::create([
                'produccion_gavion_id' => $produccionGavion['id'],
                'empleado_id' => $empleado['id']
            ]);
        }
        $items = 5;

        $now = Carbon::now()->format('Y-m-d');
        $produccionGaviones = ProduccionGavion::whereDate('fecha', $now)->paginate($items);

        return response()->json($produccionGaviones, 201);
    }

    public function storeProduccionGavionGrupal()
    {
        $produccionGavionRequest = \request()->all();
        $empleados = $produccionGavionRequest['empleados'];
        $produccionGavion = ProduccionGavion::create([
            'fecha' => $produccionGavionRequest['fecha'],
            'cupo' => $produccionGavionRequest['cupo'],
            'cantidad' => 0,
            'gavion_id' => $produccionGavionRequest['idgavion']
        ]);
        foreach ($empleados as $empleado) {
            ProduccionGavionEmpleado::create([
                'produccion_gavion_id' => $produccionGavion['id'],
                'empleado_id' => $empleado['id']
            ]);
        }
        $items = 5;

        $now = Carbon::now()->format('Y-m-d');
        $produccionGaviones = ProduccionGavion::whereDate('fecha', $now)->paginate($items);

        return response()->json($produccionGaviones, 201);
    }

    public function updateProduccionGavion()
    {
        $produccionGavionRequest = \request()->all();
        $produccionGavion = ProduccionGavion::find($produccionGavionRequest['id']);

        $produccionGavionRequest['concluido'] = true;
        if ($produccionGavionRequest['cantidad'] === null) {
            $produccionGavionRequest['cantidad'] = 0;
        }

        $cantidad = $produccionGavionRequest['cantidad'] - $produccionGavion['cantidad'];

        $produccionGavion->update($produccionGavionRequest);

        $gavion = Gavion::find($produccionGavion['gavion_id']);
        $gavion->cantidad = $gavion->cantidad + $cantidad;
        $gavion->save();

        return response()->json($produccionGavion, 201);
    }

    public function paginateProduccionGavionesFecha()
    {
        $items = \request()->input('items');
        // $now = Carbon::now()->format('Y-m-d');
        $fecha = \request()->input('fecha');

        $produccionGaviones = ProduccionGavion::whereDate('fecha', $fecha)->paginate($items);

        return response()->json($produccionGaviones, 200);
    }

    public function destroyProduccionGavion($id)
    {
        $produccionGavion = ProduccionGavion::find($id);
        $produccionGavion->delete();

        return response()->json($produccionGavion['id'], 200);
    }
}
