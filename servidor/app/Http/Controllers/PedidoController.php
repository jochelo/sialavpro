<?php

namespace App\Http\Controllers;

use App\Models\Alambre;
use App\Models\Cajaclavo;
use App\Models\Gavion;
use App\Models\ImportePedido;
use App\Models\Malla;
use App\Models\OrdenAlambre;
use App\Models\OrdenCajaclavo;
use App\Models\OrdenGavion;
use App\Models\OrdenMalla;
use App\Models\Pedido;
use Carbon\Carbon;

class PedidoController extends Controller
{
    public function storePedido()
    {
        $pedido = \request()->input('pedido');

        $ordenMallas = \request()->input('ordenMallas');
        $ordenGaviones = \request()->input('ordenGaviones');
        $ordenAlambres = \request()->input('ordenAlambres');
        $ordenCajaclavos = \request()->input('ordenCajaclavos');

        $pedido = Pedido::create([
            'fecha' => Carbon::now()->toDateString(),
            'total' => $pedido['total'],
            'cancelado' => $pedido['cancelado'],
            'entregado' => $pedido['entregado'],
            'cliente_id' => $pedido['cliente_id'],
        ]);

        if ($pedido['cancelado'] > 0) {
            ImportePedido::create([
                'importe' => $pedido['cancelado'],
                'pedido_id' => (int)$pedido['id']
            ]);
        }

        foreach ($ordenMallas as $ordenMalla) {
            OrdenMalla::create([
                'cantidad' => $ordenMalla['cantidadSolicitada'],
                'subTotal' => $ordenMalla['cantidadSolicitada'] * $ordenMalla['precio'],
                'malla_id' => (int)$ordenMalla['id'],
                'pedido_id' => (int)$pedido['id']
            ]);
            if ($pedido['entregado']) {
                $malla = Malla::find($ordenMalla['id']);
                $malla['cantidad'] = $malla['cantidad'] - $ordenMalla['cantidadSolicitada'];
                $malla->save();
            }
        }

        foreach ($ordenGaviones as $ordenGavion) {
            OrdenGavion::create([
                'cantidad' => $ordenGavion['cantidadSolicitada'],
                'subTotal' => $ordenGavion['cantidadSolicitada'] * $ordenGavion['precio'],
                'gavion_id' => (int)$ordenGavion['id'],
                'pedido_id' => (int)$pedido['id']
            ]);
            if ($pedido['entregado']) {
                $gavion = Gavion::find($ordenGavion['id']);
                $gavion['cantidad'] = $gavion['cantidad'] - $ordenGavion['cantidadSolicitada'];
                $gavion->save();
            }
        }

        foreach ($ordenAlambres as $ordenAlambre) {
            OrdenAlambre::create([
                'cantidad' => $ordenAlambre['cantidadSolicitada'],
                'subTotal' => $ordenAlambre['cantidadSolicitada'] * $ordenAlambre['precio'],
                'alambre_id' => (int)$ordenAlambre['id'],
                'pedido_id' => (int)$pedido['id']
            ]);
            if ($pedido['entregado']) {
                $alambre = Alambre::find($ordenAlambre['id']);
                $alambre['cantidad'] = $alambre['cantidad'] - $ordenAlambre['cantidadSolicitada'];
                $alambre->save();
            }
        }

        foreach ($ordenCajaclavos as $ordenCajaclavo) {
            OrdenCajaclavo::create([
                'cantidad' => $ordenCajaclavo['cantidadSolicitada'],
                'subTotal' => $ordenCajaclavo['cantidadSolicitada'] * $ordenCajaclavo['precio'],
                'cajaclavo_id' => (int)$ordenCajaclavo['id'],
                'pedido_id' => (int)$pedido['id']
            ]);
            if ($pedido['entregado']) {
                $cajaclavos = Cajaclavo::find($ordenCajaclavo['id']);
                $cajaclavos['cantidad'] = $cajaclavos['cantidad'] - $ordenCajaclavo['cantidadSolicitada'];
                $cajaclavos->save();
            }
        }

        $pedido = Pedido::find($pedido['id']);

        return response()->json($pedido, 201);
    }

    private function existeAlmacen($ordenMallas, $ordenGaviones, $ordenAlambres, $ordenCajaclavos) {
        foreach ($ordenMallas as $ordenMalla) {
            $malla = Malla::find($ordenMalla['malla_id']);
            if($malla['cantidad'] < $ordenMalla['cantidad']) {
                return false;
            }
        }
        foreach ($ordenGaviones as $ordenGavion) {
            $gavion = Gavion::find($ordenGavion['gavion_id']);
            if($gavion['cantidad'] < $ordenGavion['cantidad']) {
                return false;
            }
        }
        foreach ($ordenAlambres as $ordenAlambre) {
            $alambre = Alambre::find($ordenAlambre['alambre_id']);
            if($alambre['cantidad'] < $ordenAlambre['cantidad']) {
                return false;
            }
        }
        foreach ($ordenCajaclavos as $ordenCajaclavo) {
            $cajaclavo = Cajaclavo::find($ordenCajaclavo['cajaclavo_id']);
            if($cajaclavo['cantidad'] < $ordenCajaclavo['cantidad']) {
                return false;
            }
        }

        return true;
    }

    public function updatePedido()
    {
        $pedidoRequest = \request()->all();

        $pedido = Pedido::find($pedidoRequest['id']);

        if (!$pedido['entregado'] && $pedidoRequest['entregado']) {

            $ordenMallas = OrdenMalla::where('pedido_id', $pedido['id'])->get();
            $ordenGaviones = OrdenGavion::where('pedido_id', $pedido['id'])->get();
            $ordenAlambres = OrdenAlambre::where('pedido_id', $pedido['id'])->get();
            $ordenCajaclavos = OrdenCajaclavo::where('pedido_id', $pedido['id'])->get();

            if ($this->existeAlmacen($ordenMallas,$ordenGaviones, $ordenAlambres, $ordenCajaclavos)) {

                foreach ($ordenMallas as $ordenMalla) {
                    $malla = Malla::find($ordenMalla['malla_id']);
                    $malla['cantidad'] -= $ordenMalla['cantidad'];
                    $malla->save();
                }

                foreach ($ordenGaviones as $ordenGavion) {
                    $gavion = Gavion::find($ordenGavion['gavion_id']);
                    $gavion['cantidad'] -= $ordenGavion['cantidad'];
                    $gavion->save();
                }

                foreach ($ordenAlambres as $ordenAlambre) {
                    $alambre = Alambre::find($ordenAlambre['alambre_id']);
                    $alambre['cantidad'] -= $ordenAlambre['cantidad'];
                    $alambre->save();
                }

                foreach ($ordenCajaclavos as $ordenCajaclavo) {
                    $cajaclavo = Cajaclavo::find($ordenCajaclavo['cajaclavo_id']);
                    $cajaclavo['cantidad'] -= $ordenCajaclavo['cantidad'];
                    $cajaclavo->save();
                }
            } else {
                return response()->json(['message' => 'Falta de productos en almacen'], 500);
            }
        }

        $pedido->update($pedidoRequest);
        return response()->json($pedido, 201);
    }

    public function updateImportePedido()
    {
        $importePedidoRequest = \request()->all();

        $pedido = Pedido::find($importePedidoRequest['pedido_id']);
        $pedido['cancelado'] += $importePedidoRequest['importe'];
        $pedido->save();

        ImportePedido::create($importePedidoRequest);

        return response()->json($pedido, 201);
    }

    public function getPedidos()
    {
        $pedidos = Pedido::orderBy('fecha')->get();
        return response()->json($pedidos, 200);
    }

    public function paginatePedidos()
    {
        $items = \request()->input('items');
        $pedidos = Pedido::orderBy('entregado', 'asc')->orderBy('fecha', 'desc')->paginate($items);
        return response()->json($pedidos, 200);
    }

    public function destroyPedido($id)
    {
        $pedido = Pedido::find($id);
        $pedido->delete();

        return response()->json($pedido['id'], 200);
    }
}
