<?php

namespace App\Routes;

class Router
{
  protected $routes = [];

  public function loadRoutes()
  {
    $this->routes = array_merge(
      require __DIR__ . '/web.php',
      require __DIR__ . '/api.php'
    );
  }

  public function dispatch($uri, $method)
  {

    if (strpos($uri, '/public') === 0) {
      return;
    }

    foreach ($this->routes as $route => $handler) {

      $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([0-9]+)', $route);
      $pattern = str_replace('/', '\/', $pattern);

      if (preg_match("/^$pattern$/", $uri, $matches)) {
        array_shift($matches);

        list($controller, $method) = explode('@', $handler);
        $controller = "App\\Controllers\\$controller";

        call_user_func_array([new $controller, $method], $matches);
        return;
      }
    }

    http_response_code(404);
    echo json_encode(["error" => "Path not found"]);
  }
}
