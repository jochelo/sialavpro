<?php

namespace App\Http\Controllers;

use App\Models\Cajaclavo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CajaclavoController extends Controller
{
    public function storeCajaclavo() {
        $this->validar(\request());
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

    protected function validar(Request $request) {
        $this->validate($request, [
            'tipoClavo' => 'required|in:construccion,calamina',
            'largo' => 'required|numeric|min:0.2|max:30|',
            'bwg' => 'required|numeric|min:4|max:25|',
            'precio' => 'required|numeric|min:5|max:700|',
            'numeroBolsas' => 'required|numeric|min:1|max:200|',
        ]);
    }

    public function updateCajaclavo() {
        $this->validar(\request());
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
