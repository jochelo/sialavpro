<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login() {
        $request = \request()->all();
        if (Auth::attempt([
            'cuenta' => $request['cuenta'],
            'password' => $request['password']
        ])) {
            $usuario = Auth::user();
            $success['usuario'] = $usuario;
            $success['token'] = $usuario->createToken('Prodag')->accessToken;
            return response()->json($success, 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getUser()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], 200);
    }
}
