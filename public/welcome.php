<?php
// public/welcome.php

if (!isset($_SESSION['user'])) {
    header('Location: index.php'); 
    exit;
}

$user = $_SESSION['user']; 

require __DIR__ . '/includes/menu.php'; 
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        .welcome-message {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .logout-button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="welcome-message">
        ¡Hola, <?php echo htmlspecialchars($user['user_name']); ?>!<br>
        Tu rol es: <?php echo htmlspecialchars($user['role_name']); ?>.
    </div>
    <button class="logout-button" onclick="window.location.href='logout.php'">Cerrar Sesión</button>
</body>
</html>