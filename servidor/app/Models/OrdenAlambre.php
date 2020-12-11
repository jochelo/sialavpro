<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrdenAlambre extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'orden_alambres';
    protected $primaryKey = 'id';
    protected $fillable = [
        'cantidad',
        'subTotal',
        'alambre_id',
        'pedido_id'
    ];
}
