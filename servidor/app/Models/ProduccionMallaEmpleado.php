<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduccionMallaEmpleado extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'produccion_malla_empleados';
    protected $primaryKey = 'id';
    protected $fillable = [
      'produccion_malla_id',
      'empleado_id'
    ];
}
