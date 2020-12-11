<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function storeReserva()
    {
        $this->validar(\request());
        $reservaRequest = \request()->all();
        $reserva = Reserva::create($reservaRequest);
        return response()->json($reserva, 201);
    }

    public function updateReserva()
    {
        $this->validar(\request());
        $reservaRequest = \request()->all();
        $reserva = Reserva::find($reservaRequest['id']);
        $reserva->update($reservaRequest);
        return response()->json($reserva, 201);
    }

    public function paginateReservas()
    {
        $items = \request()->input('items');
        $reservas = Reserva::orderBy('created_at', 'desc')->paginate($items);
        // $reservas = Reserva::get();
        return response()->json($reservas, 200);
    }

    public function destroyReserva($id)
    {
        $reserva = Reserva::find($id);
        $reserva->delete();

        return response()->json($reserva['id'], 200);
    }

    public function recepcionarReserva() {
        $idreserva = \request()->input('idreserva');
        $recepcionado = \request()->input('recepcionado');

        $reserva = Reserva::find($idreserva);
        $reserva->recepcionado = $recepcionado;
        $reserva->save();
        return response()->json($reserva, 200);
    }

    protected function validar(Request $request)
    {
        $this->validate($request, [
            'nombre' => 'required|regex:/^([A-Z][a-zñáéíóú]+[\s]*)+$/i',
            'celular' => 'required|numeric',
            'detalle' => 'required',
        ]);
    }
}
