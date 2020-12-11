<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrdenGavion extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'orden_gavions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'cantidad',
        'subTotal',
        'gavion_id',
        'pedido_id'
    ];
}
