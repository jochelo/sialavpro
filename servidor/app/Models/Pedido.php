<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'pedidos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'fecha',
        'fecha_entrega',
        'total',
        'cancelado',
        'entregado',
        'cliente_id',
    ];

    protected $appends = [
        'nombre_cliente',
        'lista_productos'
    ];

    public function getNombreClienteAttribute() {
        $cliente = Cliente::find($this->cliente_id);
        return $cliente['nombres'] . ' ' . $cliente['apellidos'];
    }

    public function getListaProductosAttribute() {
        $idMallas = OrdenMalla::where('pedido_id', $this->getKey())->pluck('malla_id');
        $idGaviones = OrdenGavion::where('pedido_id', $this->getKey())->pluck('gavion_id');
        $idAlambres = OrdenAlambre::where('pedido_id', $this->getKey())->pluck('alambre_id');
        $idCajaclavos = OrdenCajaclavo::where('pedido_id', $this->getKey())->pluck('cajaclavo_id');

        $mallas = Malla::whereIn('id', $idMallas)->get();
        $gaviones = Gavion::whereIn('id', $idGaviones)->get();
        $alambres = Alambre::whereIn('id', $idAlambres)->get();
        $cajaclavos = Cajaclavo::whereIn('id', $idCajaclavos)->get();

        $productos = [];

        foreach ($mallas as $malla) {
            $data['producto'] = 'Malla ' . $malla['tipoMalla'] . ' Dim.: ' . $malla['alto'] . ' x ' . $malla['largo'];
            $cantidadSolicitada = OrdenMalla::where('malla_id', $malla['id'])->where('pedido_id', $this->getKey())->first()['cantidad'];
            $data['cantidadSolicitada'] = $cantidadSolicitada;
            array_push($productos, $data);
        }

        foreach ($gaviones as $gavion) {
            $data['producto'] = $gavion['tipoGavion'] . ' Dim.: ' . $gavion['alto'] . ' x ' . $gavion['largo'] . ' x ' . $gavion['ancho'];
            $cantidadSolicitada = OrdenGavion::where('gavion_id', $gavion['id'])->where('pedido_id', $this->getKey())->first()['cantidad'];
            $data['cantidadSolicitada'] = $cantidadSolicitada;
            array_push($productos, $data);
        }

        foreach ($alambres as $alambre) {
            $data['producto'] = 'Alambre ' . $alambre['tipoAlambre'] . ' AWG: ' . $alambre['awg'];
            $cantidadSolicitada = OrdenAlambre::where('alambre_id', $alambre['id'])->where('pedido_id', $this->getKey())->first()['cantidad'];
            $data['cantidadSolicitada'] = $cantidadSolicitada;
            array_push($productos, $data);
        }

        foreach ($cajaclavos as $cajaclavo) {
            $data['producto'] = 'Clavo de ' . $cajaclavo['tipoClavo'] . ' Dim.: ' . $cajaclavo['longitud'] . ' x ' . $cajaclavo['bwg'];
            $cantidadSolicitada = OrdenCajaclavo::where('cajaclavo_id', $cajaclavo['id'])->where('pedido_id', $this->getKey())->first()['cantidad'];
            $data['cantidadSolicitada'] = $cantidadSolicitada;
            array_push($productos, $data);
        }

        return $productos;
    }
}
