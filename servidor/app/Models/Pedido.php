<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'pedidos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'fecha',
        'total',
        'cancelado',
        'entregado',
        'cliente_id',
    ];
}
