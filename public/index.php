<?php
require_once __DIR__ . '/../vendor/autoload.php'; 

use App\Routes\Router;

// Obtener la URL solicitada
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Cargar las rutas
$router = new Router();
$router->loadRoutes();

// Procesar la solicitud
$router->dispatch($requestUri, $method);
