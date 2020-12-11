<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduccionGavion extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'produccion_gavions';
    protected $fillable = [
        'fecha',
        'cantidad',
        'gavion_id',
    ];
}
