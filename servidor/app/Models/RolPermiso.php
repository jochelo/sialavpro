<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RolPermiso extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'rol_permisos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'rol_id',
        'permiso_id'
    ];
}
