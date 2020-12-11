<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cajaclavo extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'cajaclavos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'tipoClavo',
        'longitud',
        'bwg',
        'precio',
        'numeroBolsas',
        'foto',
        'cantidad',
        'descripcion',
    ];
}
