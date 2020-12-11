<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permiso extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'permisos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'alias',
        'descripcion',
        'url',
        'habilitado',
    ];
}
