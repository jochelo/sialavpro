<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrdenCajaclavo extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'orden_cajaclavos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'cantidad',
        'subTotal',
        'cajaclavo_id',
        'pedido_id'
    ];
}
