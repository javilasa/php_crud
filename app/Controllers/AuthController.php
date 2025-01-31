<?php
// app/Controllers/AuthController.php

namespace App\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use App\Config\JwtConfig;
use Exception;


class AuthController {
    public function showLoginForm() {
        include __DIR__ . "/../Views/login.php"; 
    }

    public function login()
    {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $userModel = new User();
        $user = $userModel->findByEmail($email);

        if ($user && password_verify($password, $user['password'])) {

            $payload = [
                "iss" => "http://dominio.com",
                "aud" => "http://dominio.com",
                "iat" => time(),
                "exp" => time() + JwtConfig::$expirationTime,
                "email" => $email
            ];

            $jwt = JWT::encode($payload, JwtConfig::$secretKey, JwtConfig::$algorithm);

            echo json_encode(['token' => $jwt]);
        } else {
            echo json_encode(['error' => 'Invalid credentials']);
        }
    }

    public function validateToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key(JwtConfig::$secretKey, JwtConfig::$algorithm));
            return $decoded;
        } catch (ExpiredException $e) {
            // El token ha expirado
            error_log("Token expirado: " . $e->getMessage());
            return null;
        } catch (SignatureInvalidException $e) {
            // La firma del token es inválida
            error_log("Firma inválida: " . $e->getMessage());
            return null;
        } catch (BeforeValidException $e) {
            // El token no es válido todavía (por ejemplo, si tiene un "nbf" claim)
            error_log("Token no válido todavía: " . $e->getMessage());
            return null;
        } catch (\DomainException $e) {
            error_log("Error de dominio: " . $e->getMessage());
            return null;
        } catch (\UnexpectedValueException $e) {
            error_log("Valor inesperado en el token: " . $e->getMessage());
            return null;
        } catch (Exception $e) {
            error_log("Error al validar el token: " . $e->getMessage());
            return null;
        }
    }

    public function validateRequest()
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';

        $response = [];
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];

            $decoded = $this->validateToken($token);

            if ($decoded) {
                $response['code'] = 200;
                $response['message'] = "Success";
            } else {
                $response['code'] = 401;
                $response['message'] = "Unauthorized: Invalid token";
            }
        } else {
            $response['code'] = 401;
            $response['message'] = "Unauthorized: No token provided";
        }

        return $response;
    }
}