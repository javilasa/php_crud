// api/roles.js


export const getAllRoles = async () => {
  const response = await fetch('/api/roles', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  });
  return response.json();
};

export const getRolById = async (roleId) => {
  const response = await fetch(`/api/roles/${roleId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  });
  return response.json();
};

export const getRolesList = async () => {
  const response = await fetch('/api/roles/list', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  });
  return response.json();
};


export const createRole = async (roleData) => {
  const response = await fetch('/api/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    },
    body: JSON.stringify(roleData)
  });
  return response.json();
};


export const updateRole = async (roleId, roleData) => {
  const response = await fetch(`/api/roles/${roleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    },
    body: JSON.stringify(roleData)
  });
  return response.json();
};

/**
 * Eliminar un rol.
 * @param {number} roleId - ID del rol a eliminar.
 * @returns {Promise<Object>} Respuesta de la API.
 */
export const deleteRole = async (roleId) => {
  const response = await fetch(`/api/roles/${roleId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  });
  return response.json();
};
