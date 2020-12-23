<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'clientes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombres',
        'apellidos',
        'direccion',
        'celular',
    ];

    protected $appends = [
        'nombre_completo'
    ];

    public function getNombreCompletoAttribute() {
        return $this->nombres . ' ' . $this->apellidos;
    }
}
