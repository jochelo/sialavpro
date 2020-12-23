<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImportePedido extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'importe_pedidos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'importe',
        'pedido_id'
    ];
}
