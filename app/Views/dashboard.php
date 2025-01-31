<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/dashboard.css">
</head>

<body>
    <div class="dashboard-container">
        <aside class="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li><a href="#" id="usersLink">Usuarios</a></li>
                <li><a href="#" id="rolesLink">Roles</a></li>
                <li><a href="/logout">Cerrar sesión</a></li>
            </ul>
        </aside>

        <main class="content">
            <h1 id="sectionTitle">Bienvenido al Dashboard</h1>
            <div id="contentArea">
            </div>
        </main>
    </div>

    <div id="editUserModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>ADD/EDIT Usuario</h2>
            <form id="editUserForm">
                <div class="form-group">
                    <label for="editUserName">Name:</label>
                    <input type="text" id="editUserName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="editUserEmail">Email:</label>
                    <input type="email" id="editUserEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="editUserPassword">Password:</label>
                    <input type="password" id="editUserPassword" name="password" required>
                </div>
                <div class="form-group">
                    <label for="editUserRole">Rol:</label>
                    <select id="editUserRole" name="role_id" required>
                    </select>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>

    <div id="editRolModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>ADD/EDIT ROL</h2>
            <form id="editRolForm">
                <div class="form-group">
                    <label for="editRolName">Name:</label>
                    <input type="text" id="editRolName" name="role_name" required>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>

    <script src="/assets/js/dashboard.js"></script>
</body>

</html>