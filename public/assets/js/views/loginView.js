import { login } from '../api/auth.js';
import { setAuthToken } from '../utils/auth.js';

export const setupLoginForm = () => {

  const loginForm = document.getElementById('loginForm');
  console.log(loginForm);
  if (loginForm) {

    loginForm.addEventListener('submit', async (event) => {
      console.log('log submit click');
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await login(email, password);
        if (response.token) {
          setAuthToken(response.token, response.userId);
          window.location.href = '/dashboard';
        } else {
          showError(response.error || 'Login error');
        }
      } catch (error) {
        showError('Network red: ' + error.message);
      }
    });
  }
};

export const showError = (message) => {
  const errorContainer = document.getElementById('message');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
};