<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function storeCliente() {
        $clienteRequest = \request()->all();
        $cliente = Cliente::create($clienteRequest);
        return response()->json($cliente, 201);
    }

    public function showCliente($id) {
        $cliente = Cliente::find($id);
        return response()->json($cliente, 201);
    }

    public function updateCliente() {
        $clienteRequest = \request()->all();
        $cliente = Cliente::find($clienteRequest['id']);
        $cliente->update($clienteRequest);
        return response()->json($cliente, 201);
    }

    public function getClientes() {
        $clientes = Cliente::get();
        return response()->json($clientes, 200);
    }

    public function paginateClientes() {
        $items = \request()->input('items');
        $clientes = Cliente::orderBy('nombres')->paginate($items);
        // $clientes = Cliente::get();
        return response()->json($clientes, 200);
    }

    public function destroyCliente($id) {
        $cliente = Cliente::find($id);
        $cliente->delete();

        return response()->json($cliente['id'], 200);
    }
}
