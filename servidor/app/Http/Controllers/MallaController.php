<?php

namespace App\Http\Controllers;

use App\Models\Malla;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MallaController extends Controller
{
    public function storeMalla()
    {
        $this->validar(\request());
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

    protected function validar(Request $request)
    {
        $this->validate($request, [
            'tipoMalla' => 'required|in:hexagonal,olimpica,ganadera,milimetrica puntas abiertas,milimetrica puntas cerradas,presoldada',
            'alto' => 'required|numeric|min:0.4|max:5|',
            'largo' => 'required|numeric|min:2|max:300|',
            'precio' => 'required|numeric|min:0.1|max:2000|',
        ]);
    }

    public function updateMalla()
    {
        $this->validar(\request());
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

    public function getMallas()
    {
        $mallas = Malla::orderBy('tipoMalla')->get();
        return response()->json($mallas, 200);
    }

    public function paginateMallas()
    {
        $items = \request()->input('items');
        $mallas = Malla::orderBy('tipoMalla')->paginate($items);
        // $mallas = Malla::get();
        return response()->json($mallas, 200);
    }

    public function destroyMalla($id)
    {
        $malla = Malla::find($id);
        $malla->delete();

        return response()->json($malla['id'], 200);
    }
}
