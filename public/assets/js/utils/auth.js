// utils/auth.js
export const setAuthToken = (token, userId) => {
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('userId', userId);
};

export const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

const decodeTokenPayload = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    if (!payload) {
      return null;
    }

    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token && !isTokenExpired(token);
};