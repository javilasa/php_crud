// api/users.js
export const getAllUsers = async () => {
  const response = await fetch('/api/users', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  });
  return response.json();
};

export const getUserById = async (userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    },
  });
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const editUser = async (userId, userData) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    },
  });
  return response.json();
};