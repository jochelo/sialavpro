<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gavion extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'gavions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'tipoGavion',
        'alto',
        'ancho',
        'largo',
        'alambre',
        'celda',
        'numeroDiafragma',
        'precio',
        'foto',
        'cantidad',
        'descripcion',
    ];

    protected $appends = [
        'tipo_dimension'
    ];

    public function getTipoDimensionAttribute() {
        return $this->tipoGavion . ' | ' . $this->alto . ' x ' . $this->largo . ' x ' . $this->ancho;
    }
}
