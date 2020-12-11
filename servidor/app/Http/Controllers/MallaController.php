<?php

namespace App\Http\Controllers;

use App\Models\Malla;
use Illuminate\Support\Facades\Storage;

class MallaController extends Controller
{
    public function storeMalla() {
        $mallaRequest = \request()->all();
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgMallas', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $mallaRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $mallaRequest['foto'] = Storage::disk('s3')->url('imgMallas/malla-sin-imagen.png');
        }
        /*if ($mallaRequest['celda'] === 'null') {
            $mallaRequest['celda'] = null;
        }

        if ($mallaRequest['alambre'] === 'null') {
            $mallaRequest['alambre'] = null;
        }*/

        if ($mallaRequest['descripcion'] === 'null') {
            $mallaRequest['descripcion'] = null;
        }

        /*if ($mallaRequest['m2'] === 'true') {
            $mallaRequest['m2'] = true;
        }

        if ($mallaRequest['m2'] === 'false') {
            $mallaRequest['m2'] = false;
        }*/

        $mallaRequest['m2'] = false;

        $malla = Malla::create($mallaRequest);
        return response()->json($malla, 201);
    }

    public function updateMalla() {
        $mallaRequest = \request()->all();
        $malla = Malla::find($mallaRequest['id']);
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgMallas', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $mallaRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $mallaRequest['foto'] = $malla['foto'];
        }
        /*if ($mallaRequest['alto'] === 'null') {
            $mallaRequest['alto'] = null;
        }

        if ($mallaRequest['largo'] === 'null') {
            $mallaRequest['largo'] = null;
        }*/

        if ($mallaRequest['descripcion'] === 'null') {
            $mallaRequest['descripcion'] = null;
        }

        /*if ($mallaRequest['m2'] === 'true') {
            $mallaRequest['m2'] = true;
        }

        if ($mallaRequest['m2'] === 'false') {
            $mallaRequest['m2'] = false;
        }*/
        $mallaRequest['m2'] = false;

//         $mallaRequest['cantidad'] = $malla['cantidad'];

        $malla->update($mallaRequest);
        return response()->json($malla, 201);
    }

    public function getMallas() {
        $items = \request()->input('items');
        $mallas = Malla::orderBy('tipoMalla')->get();
        // $mallas = Malla::get();
        return response()->json($mallas, 200);
    }

    public function paginateMallas() {
        $items = \request()->input('items');
        $mallas = Malla::orderBy('tipoMalla')->paginate($items);
        // $mallas = Malla::get();
        return response()->json($mallas, 200);
    }

    public function destroyMalla($id) {
        $malla = Malla::find($id);
        $malla->delete();

        return response()->json($malla['id'], 200);
    }
}
