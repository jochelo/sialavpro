<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empleado extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'empleados';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombres',
        'apellidos',
        'celular',
        'carnet',
        'foto',
        'direccion',
        'rolEmpleado'
    ];

    protected $appends = [
        'nombre_completo_ci'
    ];

    public function getNombreCompletoCiAttribute() {
        return $this->nombres . ' ' . $this->apellidos . ' | CI: ' . $this->carnet;
    }


}
