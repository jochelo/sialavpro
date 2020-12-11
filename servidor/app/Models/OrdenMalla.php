<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrdenMalla extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'orden_mallas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'alto',
        'largo',
        'cantidad',
        'subTotal',
        'malla_id',
        'pedido_id'
    ];
}
