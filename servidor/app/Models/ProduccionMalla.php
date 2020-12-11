<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduccionMalla extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'produccion_mallas';
    protected $fillable = [
        'fecha',
        'cupo',
        'cantidad',
        'desperdicio',
        'concluido',
        'malla_id',
    ];

    protected $appends = [
        'tipo_malla',
        'dimension',
        'empleados_nombre_completo'
    ];

    public function getTipoMallaAttribute()
    {
        $malla = Malla::find($this->malla_id);
        return 'Malla ' . $malla['tipoMalla'];
    }

    public function getDimensionAttribute()
    {
        $malla = Malla::find($this->malla_id);
        return $malla['alto'] . 'x' . $malla['largo'];
    }

    public function getEmpleadosNombreCompletoAttribute()
    {
        $idproduccionMallaEmpleado = ProduccionMallaEmpleado::where('produccion_malla_id', $this->getKey())
            ->pluck('empleado_id');
        $empleados = Empleado::whereIn('id', $idproduccionMallaEmpleado)->get();
        return $empleados;
    }
}
