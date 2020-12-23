<?php

namespace App\Http\Controllers;

use App\Models\AdquisicionAlambre;
use App\Models\Alambre;
use Illuminate\Http\Request;

class AdquisicionAlambreController extends Controller
{
    public function storeAdquisicionAlambre() {
        $adquisicionAlambreRequest = \request()->all();

        $adquisicionAlambre = AdquisicionAlambre::create($adquisicionAlambreRequest);

        $alambre = Alambre::find($adquisicionAlambre->alambre_id);
        $alambre['cantidad'] += $adquisicionAlambre['cantidad'];
        $alambre->save();
        return response()->json($adquisicionAlambre, 201);
    }

    public function updateAdquisicionAlambre() {
        $adquisicionAlambreRequest = \request()->all();
        $adquisicionAlambre = AdquisicionAlambre::find($adquisicionAlambreRequest['id']);

        if (isset($adquisicionAlambreRequest['cantidad'])) {
            $alambre = Alambre::find($adquisicionAlambre->alambre_id);
            $alambre['cantidad'] = $alambre['cantidad'] - $adquisicionAlambre['cantidad'] + $adquisicionAlambreRequest['cantidad'];
            $alambre->save();
        }

        $adquisicionAlambre->update($adquisicionAlambreRequest);
        return response()->json($adquisicionAlambre, 201);
    }

    public function getAdquisicionAlambres() {
        $adquisicionAlambres = AdquisicionAlambre::get();
        return response()->json($adquisicionAlambres, 200);
    }

    public function paginateAdquisicionAlambres() {
        $items = \request()->input('items');
        $adquisicionAlambres = AdquisicionAlambre::paginate($items);
        return response()->json($adquisicionAlambres, 200);
    }

    public function destroyAdquisicionAlambre($id) {
        $adquisicionAlambre = AdquisicionAlambre::find($id);
        $alambre = Alambre::find($adquisicionAlambre['alambre_id']);
        $alambre['cantidad'] -= $adquisicionAlambre['cantidad'];
        $alambre->save();
        $adquisicionAlambre->delete();

        return response()->json($adquisicionAlambre['id'], 200);
    }
}
