<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduccionGavion extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'produccion_gavions';
    protected $fillable = [
        'fecha',
        'cupo',
        'cantidad',
        'desperdicio',
        'concluido',
        'gavion_id',
    ];

    protected $appends = [
        'tipo_gavion',
        'dimension',
        'empleados_nombre_completo'
    ];

    public function getTipoGavionAttribute()
    {
        $gavion = Gavion::find($this->gavion_id);
        return $gavion['tipoGavion'];
    }

    public function getDimensionAttribute()
    {
        $gavion = Gavion::find($this->gavion_id);
        return $gavion['alto'] . 'x' . $gavion['largo'] . 'x' . $gavion['ancho'];
    }

    public function getEmpleadosNombreCompletoAttribute()
    {
        $idproduccionGavionEmpleado = ProduccionGavionEmpleado::where('produccion_gavion_id', $this->getKey())
            ->pluck('empleado_id');
        $empleados = Empleado::whereIn('id', $idproduccionGavionEmpleado)->get();
        return $empleados;
    }
}
