<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\TokenRepository;

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

    public function logout() {
        $usuario = Auth::user();
        $nombreUsuario = $usuario['nombre'];

        $tokenId = $usuario->token()->getKey();

        // dd($tokenId);

        $tokenRepository = app(TokenRepository::class);
        $tokenRepository->revokeAccessToken($tokenId);

        return response()->json(['success' => $nombreUsuario . ' finalizó sesión'], 200);
    }

    public function getUser()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], 200);
    }
}
