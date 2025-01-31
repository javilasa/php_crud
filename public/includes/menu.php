<?php
// public/includes/menu.php

session_start(); 

$isLoggedIn = isset($_SESSION['user']);
$userRole = $isLoggedIn ? $_SESSION['user']['role_id'] : null;
?>

<nav style="display: flex; justify-content: space-between; padding: 10px; background-color: #f4f4f4;">
    <div>
        <?php if ($isLoggedIn): ?>
            <?php if ($userRole == 1 || $userRole == 2): ?>
                <a href="roles/index.php" style="margin-right: 10px;">Roles</a>
            <?php endif; ?>
            <?php if ($userRole == 1): ?> 
                <a href="users/index.php" style="margin-right: 10px;">Users</a>
            <?php endif; ?>
        <?php endif; ?>
    </div>
    <div>
        <?php if ($isLoggedIn): ?>
            <a href="logout.php" style="margin-right: 10px;">Logout</a>
        <?php else: ?>
            <a href="login.php" style="margin-right: 10px;">Login</a>
        <?php endif; ?>
    </div>
</nav>