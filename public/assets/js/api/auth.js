
export const login = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const logout = async () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/login';
};
