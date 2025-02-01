// rolesView.js
import { getAllRoles, getRolById, createRole, updateRole, deleteRole } from '../api/roles.js';
import { showError } from '../utils/helpers.js';

export const loadRoles = async () => {
  try {
    const roles = await getAllRoles();
    if (roles.code) {
      showError('Error loading roles: ' + roles.message);
    } else {
      renderRoles(roles);
    }
  } catch (error) {
    showError('Error de red: ' + error.message);
  }
}

export const renderRoles = (roles) => {
  const rolesList = document.getElementById('contentArea');
  if (rolesList) {
    let html = `
        <button id="add-rol-button">ADD ROLE</button>
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
                    <button class="edit-rol" data-rol-id=${role.id}>Edit</button>
                    <button class="delete-rol" data-rol-id=${role.id}>Delete</button>
                </td>
            </tr>
        `;
    });
    html += `
            </tbody>
        </table>
    `;
    rolesList.innerHTML = html;

    setupRolesActions();
  }
};

const setupRolesActions = () => {
  const addButton = document.getElementById('add-rol-button');
  const editButtons = document.querySelectorAll('.edit-rol');
  const deleteButtons = document.querySelectorAll('.delete-rol');
  const closeButton = document.querySelector('#editRolModal .close');
  const modal = document.getElementById('editRolModal');
  const editRolForm = document.getElementById('editRolForm');

  // Closing modal
  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Add event - open form
  addButton.addEventListener('click', () => {
    console.log("ADD button click");
    resetRolForm();
    openRolForm();
  });

  // Edit event - open form
  editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      console.log("Edit button click");
      const rolId = event.target.getAttribute('data-rol-id');
      editFormRol(rolId);
    });
  });

  // Edit event - submit form
  editRolForm.addEventListener('submit', submitRolAction);

  // Delete event
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const rolId = event.target.getAttribute('data-rol-id');
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        try {
          const result = await deleteRole(rolId);
          console.log(result);
          if (result.code == 200) {
            const roles = await getAllRoles();
            renderRoles(roles);
          } else {
            showError('Error deleting rol');
          }
        } catch (error) {
          showError('Network error: ' + error.message);
        }
      }
    });
  });
};


const editFormRol = (id) => {
  console.log('Edit Rol:' + id);
  const editRolForm = document.getElementById('editRolForm');

  getRolById(id).then(rol => {
    console.log(rol);
    editRolForm.dataset.rolId = rol.id;
    document.getElementById('editRolName').value = rol.role_name;
    document.querySelector('.modal-content h2').textContent = 'Edit Rol';
    openRolForm();
  });
};

const submitRolAction = async (event) => {
  event.preventDefault();

  const editRolForm = document.getElementById('editRolForm');
  const modal = document.getElementById('editRolModal');

  const rolId = editRolForm.dataset.rolId;
  const formData = new FormData(editRolForm);
  const data = Object.fromEntries(formData.entries());

  if (rolId) {
    const result = await updateRole(rolId, data);
    closeRolForm();
    loadRoles();
  } else {
    const result = await createRole(data);
    closeRolForm();
    loadRoles();
  }
}

const resetRolForm = async () => {
  const form = document.getElementById('editRolForm');
  delete form.dataset.rolId;
  form.reset();
}

const closeRolForm = async () => {
  const modal = document.getElementById('editRolModal');
  modal.style.display = 'none';
}

const openRolForm = async () => {
  const modal = document.getElementById('editRolModal');
  modal.style.display = 'block';
}