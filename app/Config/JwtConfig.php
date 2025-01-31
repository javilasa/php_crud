<?php

namespace App\Config;

class JwtConfig {
    public static $secretKey = 'clave_jwt'; 
    public static $algorithm = 'HS256'; 
    public static $expirationTime = 3600; 
}