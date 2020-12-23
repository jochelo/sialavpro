<?php

namespace App\Http\Controllers;

use App\Models\Cajaclavo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CajaclavoController extends Controller
{
    public function storeCajaclavo() {
        $cajaclavoRequest = \request()->all();
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgCajaclavos', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $cajaclavoRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $cajaclavoRequest['foto'] = Storage::disk('s3')->url('imgCajaclavos/cajaclavo-sin-imagen.png');
        }

        if ($cajaclavoRequest['descripcion'] === 'null') {
            $cajaclavoRequest['descripcion'] = null;
        }

        $cajaclavo = Cajaclavo::create($cajaclavoRequest);
        return response()->json($cajaclavo, 201);
    }

    public function updateCajaclavo() {
        $cajaclavoRequest = \request()->all();
        $cajaclavo = Cajaclavo::find($cajaclavoRequest['id']);
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgCajaclavos', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $cajaclavoRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $cajaclavoRequest['foto'] = $cajaclavo['foto'];
        }

        if ($cajaclavoRequest['descripcion'] === 'null') {
            $cajaclavoRequest['descripcion'] = null;
        }

        $cajaclavo->update($cajaclavoRequest);
        return response()->json($cajaclavo, 201);
    }

    public function getCajaclavos() {
        $cajaclavos = Cajaclavo::get();
        return response()->json($cajaclavos, 200);
    }

    public function paginateCajaclavos() {
        $items = \request()->input('items');
        $cajaclavos = Cajaclavo::paginate($items);
        // $cajaclavos = Cajaclavo::get();
        return response()->json($cajaclavos, 200);
    }

    public function destroyCajaclavo($id) {
        $cajaclavo = Cajaclavo::find($id);
        $cajaclavo->delete();

        return response()->json($cajaclavo['id'], 200);
    }
}
