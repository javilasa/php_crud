// usersView.js
import { getAllUsers, deleteUser, getUserById, editUser, createUser } from '../api/users.js';
import { showError } from '../utils/helpers.js';
import { getRolesList } from '../api/roles.js';

export const loadUsers = async () => {
    try {
        console.log("loading users");
        const users = await getAllUsers();
        if (users.code) {
            showError('Error loading users: ' + users.message);
        } else {
            renderUsers(users);
        }
    } catch (error) {
        showError('Error de red: ' + error.message);
    }
}

export const renderUsers = (users) => {
    const userList = document.getElementById('contentArea');
    if (userList) {
        let html = `
            <button id="add-user-button">ADD USER</button>
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
                    <button class="edit-user" data-user-id="${user.id}">Edit</button>
                    <button class="delete-user" data-user-id="${user.id}">Delete</button>
                </td>
            </tr>
        `;
        });
        html += `
            </tbody>
        </table>
    `;
        userList.innerHTML = html;

        setupUserActions();
    }
};

const setupUserActions = () => {
    const addButton = document.getElementById('add-user-button');
    const editButtons = document.querySelectorAll('.edit-user');
    const deleteButtons = document.querySelectorAll('.delete-user');
    const closeButton = document.querySelector('#editUserModal .close');
    const modal = document.getElementById('editUserModal');
    const editUserForm = document.getElementById('editUserForm');

    // Closing modal
    if (closeButton && modal) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Add event - open form
    addButton.addEventListener('click', () => {
        console.log("ADD button click");
        resetUserForm();
        loadRolesList();
        openUserForm();
    });

    // Edit event - open form
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log("Edit button click");
            const userId = event.target.getAttribute('data-user-id');
            editFormUser(userId);
        });
    });

    // Edit event - submit form
    editUserForm.addEventListener('submit', submitUserAction);

    // Delete event
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const userId = event.target.getAttribute('data-user-id');
            if (confirm('¿Estás seguro de eliminar este usuario?')) {
                try {
                    const result = await deleteUser(userId);
                    console.log(result);
                    if (result.code == 200) {
                        const users = await getAllUsers();
                        renderUsers(users);
                    } else {
                        showError('Error deleting user');
                    }
                } catch (error) {
                    showError('Network error: ' + error.message);
                }
            }
        });
    });
};


const editFormUser = (id) => {
    console.log('Edit User:', id);
    const editUserForm = document.getElementById('editUserForm');

    loadRolesList();

    getUserById(id).then(user => {
        editUserForm.dataset.userId = user.id;
        document.getElementById('editUserName').value = user.name;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserPassword').value = '';
        document.querySelector('.modal-content h2').textContent = 'Edit User';
        if (user) {
            selectRolesListItem(user.role_id);
        }
        openUserForm();
    });
};

const submitUserAction = async (event) => {
    event.preventDefault();

    const editUserForm = document.getElementById('editUserForm');
    const modal = document.getElementById('editUserModal');

    const userId = editUserForm.dataset.userId;
    const formData = new FormData(editUserForm);
    const data = Object.fromEntries(formData.entries());

    if (userId) {
        const result = await editUser(userId, data);
        closeUserForm();
        loadUsers();
    } else {

        const result = await createUser(data);
        closeUserForm();
        loadUsers();
    }
}

const selectRolesListItem = async (id) => {
    const roleSelect = document.getElementById('editUserRole');
    roleSelect.value = id;
}

const loadRolesList = async () => {
    const roleSelect = document.getElementById('editUserRole');

    getRolesList().then(roles => {
        roleSelect.innerHTML = roles.map(role => `
            <option value="${role.id}">${role.role_name}</option>
        `).join('');
    });
}

const resetUserForm = async () => {
    const form = document.getElementById('editUserForm');
    delete form.dataset.userId;
    form.reset();
}

const closeUserForm = async () => {
    const modal = document.getElementById('editUserModal');
    modal.style.display = 'none';
}

const openUserForm = async () => {
    const modal = document.getElementById('editUserModal');
    modal.style.display = 'block';
}