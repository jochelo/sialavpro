<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reserva extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'reservas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre',
        'celular',
        'detalle',
        'recepcionado',
    ];
}
