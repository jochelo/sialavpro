<?php

namespace App\Http\Controllers;

use App\Models\AdquisicionCajaclavo;
use App\Models\Cajaclavo;
use Illuminate\Http\Request;

class AdquisicionCajaclavoController extends Controller
{
    public function storeAdquisicionCajaclavo() {
        $adquisicionCajaclavoRequest = \request()->all();

        $adquisicionCajaclavo = AdquisicionCajaclavo::create($adquisicionCajaclavoRequest);

        $cajaclavo = Cajaclavo::find($adquisicionCajaclavo->cajaclavo_id);
        $cajaclavo['cantidad'] += $adquisicionCajaclavo['cantidad'];
        $cajaclavo->save();
        return response()->json($adquisicionCajaclavo, 201);
    }

    public function updateAdquisicionCajaclavo() {
        $adquisicionCajaclavoRequest = \request()->all();
        $adquisicionCajaclavo = AdquisicionCajaclavo::find($adquisicionCajaclavoRequest['id']);

        if (isset($adquisicionCajaclavoRequest['cantidad'])) {
            $cajaclavo = Cajaclavo::find($adquisicionCajaclavo->cajaclavo_id);
            $cajaclavo['cantidad'] = $cajaclavo['cantidad'] - $adquisicionCajaclavo['cantidad'] + $adquisicionCajaclavoRequest['cantidad'];
            $cajaclavo->save();
        }

        $adquisicionCajaclavo->update($adquisicionCajaclavoRequest);
        return response()->json($adquisicionCajaclavo, 201);
    }

    public function getAdquisicionCajaclavos() {
        $adquisicionCajaclavos = AdquisicionCajaclavo::get();
        return response()->json($adquisicionCajaclavos, 200);
    }

    public function paginateAdquisicionCajaclavos() {
        $items = \request()->input('items');
        $adquisicionCajaclavos = AdquisicionCajaclavo::paginate($items);
        return response()->json($adquisicionCajaclavos, 200);
    }

    public function destroyAdquisicionCajaclavo($id) {
        $adquisicionCajaclavo = AdquisicionCajaclavo::find($id);
        $cajaclavo = Cajaclavo::find($adquisicionCajaclavo['cajaclavo_id']);
        $cajaclavo['cantidad'] -= $adquisicionCajaclavo['cantidad'];
        $cajaclavo->save();
        $adquisicionCajaclavo->delete();

        return response()->json($adquisicionCajaclavo['id'], 200);
    }
}
