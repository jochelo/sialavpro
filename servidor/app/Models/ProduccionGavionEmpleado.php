<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduccionGavionEmpleado extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'produccion_gavion_empleados';
    protected $primaryKey = 'id';
    protected $fillable = [
        'produccion_gavion_id',
        'empleado_id',
    ];
}
