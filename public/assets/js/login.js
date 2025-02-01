// login.js
import { setupLoginForm } from './views/loginView.js';
import { isAuthenticated } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    if (isAuthenticated()) {
        window.location.href = '/dashboard';
    }

    setupLoginForm();
});