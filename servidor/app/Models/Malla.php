<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Malla extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'mallas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'tipoMalla',
        'celda',
        'alambre',
        'alto',
        'largo',
        'precio',
        'foto',
        'm2',
        'cantidad',
        'descripcion',
    ];
    protected $appends = [
      'tipo_dimension'
    ];

    public function getTipoDimensionAttribute() {
        return 'Malla ' . $this->tipoMalla . ' | ' . $this->alto . ' x ' . $this->largo;
    }
}
