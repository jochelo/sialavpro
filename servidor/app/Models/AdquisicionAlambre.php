<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdquisicionAlambre extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'adquisicion_alambres';
    protected $fillable = [
        'fecha',
        'cantidad',
        'alambre_id',
    ];
}
