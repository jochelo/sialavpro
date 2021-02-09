<?php

namespace App\Http\Controllers;

use App\Models\Alambre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AlambreController extends Controller
{
    public function storeAlambre()
    {
        $this->validar(\request());
        $alambreRequest = \request()->all();
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgAlambres', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $alambreRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $alambreRequest['foto'] = Storage::disk('s3')->url('imgAlambres/alambre-sin-imagen.png');
        }

        if ($alambreRequest['descripcion'] === 'null') {
            $alambreRequest['descripcion'] = null;
        }

        $alambre = Alambre::create($alambreRequest);
        return response()->json($alambre, 201);
    }

    protected function validar(Request $request)
    {
        $this->validate($request, [
            'tipoAlambre' => 'required|in:amarre,galvanizado,puas',
            'peso' => 'required|numeric|min:0.5|max:100|',
            'awg' => 'required|numeric|min:1|max:25|',
            'precio' => 'required|numeric|min:5|max:1000|',
        ]);
    }

    public function updateAlambre()
    {
        $this->validar(\request());
        $alambreRequest = \request()->all();
        $alambre = Alambre::find($alambreRequest['id']);
        if (\request()->hasFile('foto')) {
            $path = \request()->file('foto')->store('imgAlambres', 's3');

            // Storage::disk('s3')->setVisibility($path, 'private');

            $alambreRequest['foto'] = Storage::disk('s3')->url($path);
        } else {
            $alambreRequest['foto'] = $alambre['foto'];
        }

        if ($alambreRequest['descripcion'] === 'null') {
            $alambreRequest['descripcion'] = null;
        }

        $alambre->update($alambreRequest);
        return response()->json($alambre, 201);
    }

    public function getAlambres()
    {
        $alambres = Alambre::get();
        return response()->json($alambres, 200);
    }

    public function paginateAlambres()
    {
        $items = \request()->input('items');
        $alambres = Alambre::paginate($items);
        return response()->json($alambres, 200);
    }

    public function destroyAlambre($id)
    {
        $alambre = Alambre::find($id);
        $alambre->delete();

        return response()->json($alambre['id'], 200);
    }
}
