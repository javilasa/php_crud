document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close')) {
        const modal = event.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const usersLink = document.getElementById('usersLink');
    const rolesLink = document.getElementById('rolesLink');
    const profileLink = document.getElementById('profileLink');

    const editUserForm = document.getElementById('editUserForm');
    const editRolForm = document.getElementById('editRolForm');
    const editProfileForm = document.getElementById('editProfileForm');

    loadUsers();

    usersLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadUsers();
    });

    rolesLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadRoles();
    });

    profileLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadProfile();
    });

    editUserForm.addEventListener('submit', submitUserAction);
    editRolForm.addEventListener('submit', submitRoleAction);
    editProfileForm.addEventListener('submit', submitProfileAction);
});

function submitUserAction(event) {
    event.preventDefault();

    const editUserForm = document.getElementById('editUserForm');
    const modal = document.getElementById('editUserModal');

    const userId = editUserForm.dataset.userId;
    const formData = new FormData(editUserForm);
    const data = Object.fromEntries(formData.entries());

    if (userId) {

        editUser(userId, data).then(data => {
            console.log(data);
            if (data.message) {
                alert(data.message);
                modal.style.display = 'none';
                loadUsers();
            } else {
                alert('Error updating user*');
            }
        })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating user!');
            });

    } else {

        createUser(data).then(data => {
            if (data.message) {
                alert(data.message);
                modal.style.display = 'none';
                loadUsers();
            } else {
                alert('Error creating user');
            }
        })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating user*');
            });
    }
}


function submitRoleAction(event) {

    event.preventDefault();

    const editRolForm = document.getElementById('editRolForm');
    const modal = document.getElementById('editRolModal');

    const rolId = editRolForm.dataset.rolId;
    const formData = new FormData(editRolForm);
    const data = Object.fromEntries(formData.entries());

    if (rolId) {
        editRol(rolId, data).then(data => {
            if (data.message) {
                alert(data.message);
                modal.style.display = 'none';
                loadRoles();
            } else {
                alert('Error updating rol');
            }
        })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating rol*');
            });
    } else {

        createRol(data).then(data => {
            if (data.message) {
                alert(data.message);
                modal.style.display = 'none';
                loadRoles();
            } else {
                alert('Error creating rol');
            }
        })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating rol*');
            });
    }
}

function submitProfileAction(event) {
    event.preventDefault();

    const editProfileForm = document.getElementById('editProfileForm');
    const modal = document.getElementById('editProfileModal');

    const userId = editProfileForm.dataset.userId;
    const formData = new FormData(editProfileForm);
    const data = Object.fromEntries(formData.entries());

    if (userId) {

        editUser(userId, data).then(data => {
            if (data.message) {
                alert(data.message);
                modal.style.display = 'none';
                loadUsers();
            } else {
                alert('Error updating profile*');
            }
        })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating profile!');
            });
    }
}


function loadUsers() {
    const contentArea = document.getElementById('contentArea');
    const sectionTitle = document.getElementById('sectionTitle');

    sectionTitle.textContent = 'Users Administration';

    getAllUsers().then(users => {
        if (users.code !== undefined) {
            contentArea.innerHTML = users.message;
        } else {
            let html = `
            <button onclick="showAddUserForm()">ADD USER</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
            users.forEach(user => {
                html += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role_name}</td>
                    <td>
                        <button onclick="editUserForm(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                </tr>
            `;
            });
            html += `
                </tbody>
            </table>
        `;
            contentArea.innerHTML = html;
        }


    })
        .catch(error => {
            console.error('Error:', error);
            contentArea.innerHTML = '<p>Error loading users:' + error + '</p>';
        });
}


function loadRoles() {
    const contentArea = document.getElementById('contentArea');
    const sectionTitle = document.getElementById('sectionTitle');

    sectionTitle.textContent = 'Roles Administration';

    getAllRoles().then(roles => {
        if (roles.code !== undefined) {
            contentArea.innerHTML = roles.message;
        } else {
            let html = `
            <button onclick="showAddRoleForm()">ADD ROLE</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
            roles.forEach(role => {
                html += `
                <tr>
                    <td>${role.id}</td>
                    <td>${role.role_name}</td>
                    <td>
                        <button onclick="editRoleForm(${role.id})">Edit</button>
                        <button onclick="deleteRole(${role.id})">Delete</button>
                    </td>
                </tr>
            `;
            });
            html += `
                </tbody>
            </table>
        `;
            contentArea.innerHTML = html;
        }

    })
        .catch(error => {
            console.error('Error:', error);
            contentArea.innerHTML = '<p>Error loading Roles:' + error + '</p>';
        });

}

function loadProfile() {
    const modal = document.getElementById('editProfileModal');
    const editProfileForm = document.getElementById('editProfileForm');

    const userId = localStorage.getItem('userId');

    getUserById(userId).then(user => {
        editProfileForm.dataset.userId = user.id;
        document.getElementById('editProfileName').value = user.name;
        document.getElementById('editProfileEmail').value = user.email;
        document.getElementById('editProfilePassword').value = '';
        document.querySelector('.modal-content h2').textContent = 'Edit Profile';

        modal.style.display = 'block';
    });
}

function showUserForm(user = null) {
    const modal = document.getElementById('editUserModal');
    const editUserForm = document.getElementById('editUserForm');
    const roleSelect = document.getElementById('editUserRole');

    editUserForm.reset();

    getRolesList().then(roles => {
        roleSelect.innerHTML = roles.map(role => `
            <option value="${role.id}">${role.role_name}</option>
        `).join('');
        modal.style.display = 'block';
    });

}


function showAddUserForm() {
    showUserForm();
}

function editUserForm(id) {
    const modal = document.getElementById('editUserModal');
    const editUserForm = document.getElementById('editUserForm');
    const roleSelect = document.getElementById('editUserRole');

    getRolesList().then(roles => {
        roleSelect.innerHTML = roles.map(role => `
            <option value="${role.id}">${role.role_name}</option>
        `).join('');
    });

    getUserById(id).then(user => {
        editUserForm.dataset.userId = user.id;
        document.getElementById('editUserName').value = user.name;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserPassword').value = '';
        document.querySelector('.modal-content h2').textContent = 'Edit User';
        if (user) {
            roleSelect.value = user.role_id;
        }
        modal.style.display = 'block';
    });
}


function deleteUser(id) {
    if (confirm('Are you sure to delete this user?')) {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    loadUsers(); // Refrescar la lista de usuarios
                } else {
                    alert('Error deleting user');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting user*');
            });
    }
}


function showAddRoleForm() {
    const modal = document.getElementById('editRolModal');
    const editRolForm = document.getElementById('editRolForm');

    editRolForm.reset();
    delete editRolForm.dataset.rolId;
    document.querySelector('.modal-content h2').textContent = 'ADD Rol';
    modal.style.display = 'block';
}

function editRoleForm(id) {
    const modal = document.getElementById('editRolModal');
    const editRolForm = document.getElementById('editRolForm');

    getRolById(id).then(rol => {
        editRolForm.dataset.rolId = rol.id;
        document.getElementById('editRolName').value = rol.role_name;
        document.querySelector('.modal-content h2').textContent = 'Edit Rol';
        modal.style.display = 'block';
    });
}

async function editUser(userId, userData) {
    try {
        console.log(userId);
        console.log(userData);
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(userData)
        })

        //console.log("Response status:", response.status);
        //console.log("Response text:", await response.text());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en editUser:", error);
        return null;
    }
}

async function createUser(userData) {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(userData)
        });


        if (!response.ok) {
            throw new Error(`Error getting user: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in createUser:", error);
        return null;
    }

}

async function getAllUsers() {
    try {
        const response = await fetch(`/api/users`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting users: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getAllUsers:", error);
        return null;
    }
}

async function getUserById(id) {
    try {
        const response = await fetch(`/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting user: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getUserById:", error);
        return null;
    }
}

async function getAllRoles() {
    try {
        const response = await fetch('/api/roles', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting roles: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getAllRoles:", error);
        return [];
    }
}

async function getRolesList() {
    try {
        const response = await fetch('/api/roles/list', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting roles: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getAllRoles:", error);
        return [];
    }
}

async function getRolById(id) {
    try {
        const response = await fetch(`/api/roles/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting the user: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getUserById:", error);
        return null;
    }
}

async function createRol(rolData) {
    try {
        const response = await fetch('/api/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(rolData)
        });


        if (!response.ok) {
            throw new Error(`Error creating rol: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in createRol:", error);
        return null;
    }

}

async function editRol(rolId, rolData) {
    try {
        const response = await fetch(`/api/roles/${rolId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(rolData)
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in editUser:", error);
        return null;
    }
}

function deleteRole(id) {
    if (confirm('¿Are you sure to delete this rol?')) {
        fetch(`/api/roles/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    loadRoles();
                } else {
                    alert('Error deleting user');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting user*');
            });
    }
}