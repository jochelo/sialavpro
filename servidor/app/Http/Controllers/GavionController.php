<?php

namespace App\Http\Controllers;

use App\Models\Gavion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GavionController extends Controller
{
    public function storeGavion()
    {
        $this->validar(\request());
        $gavionRequest = \request()->all();
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgGaviones', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $gavionRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $gavionRequest['foto'] = Storage::disk('s3')->url('imgGaviones/gavion-sin-imagen.png');
        }

        if ($gavionRequest['descripcion'] === 'null') {
            $gavionRequest['descripcion'] = null;
        }

        $gavion = Gavion::create($gavionRequest);
        return response()->json($gavion, 201);
    }

    protected function validar(Request $request)
    {
        $this->validate($request, [
            'tipoGavion' => 'required|in:gavion,colchoneta',
            'alto' => 'required|numeric|min:0.5|max:6|',
            'largo' => 'required|numeric|min:0.5|max:100|',
            'ancho' => 'required|numeric|min:0.5|max:100|',
            'precio' => 'required|numeric|min:10|max:2000|',
            'numeroDiafragma' => 'nullable|numeric|min:0|max:7'
        ]);
    }

    public function updateGavion()
    {
        $this->validar(\request());
        $gavionRequest = \request()->all();
        $gavion = Gavion::find($gavionRequest['id']);
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgGaviones', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $gavionRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $gavionRequest['foto'] = $gavion['foto'];
        }
        if ($gavionRequest['descripcion'] === 'null') {
            $gavionRequest['descripcion'] = null;
        }

        $gavion->update($gavionRequest);
        return response()->json($gavion, 201);
    }

    public function getGaviones()
    {
        $gaviones = Gavion::orderBy('tipoGavion')->get();
        return response()->json($gaviones, 200);
    }

    public function paginateGaviones()
    {
        $items = \request()->input('items');
        $gaviones = Gavion::orderBy('tipoGavion')->paginate($items);
        // $gaviones = Gavion::get();
        return response()->json($gaviones, 200);
    }

    public function destroyGavion($id)
    {
        $gavion = Gavion::find($id);
        $gavion->delete();

        return response()->json($gavion['id'], 200);
    }
}
