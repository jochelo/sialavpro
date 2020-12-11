<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdquisicionCajaclavo extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'adquisicion_cajaclavos';
    protected $fillable = [
        'fecha',
        'cantidad',
        'cajaclavo_id',
    ];
}
