<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alambre extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'alambres';
    protected $primaryKey = 'id';
    protected $fillable = [
        'tipoAlambre',
        'awg',
        'peso',
        'precio',
        'foto',
        'cantidad',
        'descripcion',
    ];
    protected $appends = [
      'tipo_awg'
    ];

    public function getTipoAwgAttribute() {
        if ($this->tipoAlambre !== 'galvanizado') {
            return 'Alambre de ' . $this->tipoAlambre . ' | ' . $this->awg;
        }
        return 'Alambre ' . $this->tipoAlambre . ' | ' . $this->awg;
    }
}
