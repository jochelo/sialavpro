<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rol extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'rols';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre',
        'descripcion',
    ];
}
