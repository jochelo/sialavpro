<?php

namespace Database\Seeders;

use App\Models\Rol;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $rol = Rol::create([
            'nombre' => 'Administrador',
            'descripcion' => 'Administrador del sistema',
        ]);
        User::create([
            'nombre' => 'root',
            'email' => 'root@gmail.com',
            'cuenta' => 'root',
            'foto' => 'https://prodag-images.s3.sa-east-1.amazonaws.com/imgUsuarios/usuario-sin-imagen.png',
            'password' => Hash::make('root'),
            'rol_id' => (int) $rol->id
        ]);
    }
}
