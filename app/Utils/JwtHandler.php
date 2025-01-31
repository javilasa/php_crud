<?php

namespace App\Utils;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtHandler {
    private static $key;

    public static function encode($data) {
        self::$key = getenv('JWT_SECRET');
        $payload = [
            'iss' => 'mi-proyecto-php',
            'iat' => time(),
            'exp' => time() + 3600, // 1 hora de expiración
            'data' => $data
        ];
        return JWT::encode($payload, self::$key, 'HS256');
    }

    public static function decode($token) {
        self::$key = getenv('JWT_SECRET');
        return JWT::decode($token, new Key(self::$key, 'HS256'));
    }
}