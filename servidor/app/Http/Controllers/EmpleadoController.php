<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmpleadoController extends Controller
{
    public function storeEmpleado() {
        $empleadoRequest = \request()->all();
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgEmpleados', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $empleadoRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $empleadoRequest['foto'] = Storage::disk('s3')->url('imgEmpleados/empleado-sin-imagen.jpg');
        }

        if ($empleadoRequest['direccion'] === 'null') {
            $empleadoRequest['direccion'] = null;
        }

        $empleado = Empleado::create($empleadoRequest);
        return response()->json($empleado, 201);
    }

    public function updateEmpleado() {
        $empleadoRequest = \request()->all();
        $empleado = Empleado::find($empleadoRequest['id']);
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgEmpleados', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $empleadoRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $empleadoRequest['foto'] = $empleado['foto'];
        }

        if ($empleadoRequest['direccion'] === 'null') {
            $empleadoRequest['direccion'] = null;
        }

        $empleado->update($empleadoRequest);
        return response()->json($empleado, 201);
    }

    public function getEmpleadosMalleros() {

        $empleados = Empleado::
            // where('rolEmpleado', 'mallero')->
            orderBy('nombres')->get();

        return response()->json($empleados, 200);
    }

    public function paginateEmpleados() {
        $items = \request()->input('items');
        $empleados = Empleado::orderBy('nombres')->paginate($items);
        // $empleados = Empleado::get();
        return response()->json($empleados, 200);
    }

    public function destroyEmpleado($id) {
        $empleado = Empleado::find($id);
        $empleado->delete();

        return response()->json($empleado['id'], 200);
    }
}
