import { logout } from '/assets/js/api/auth.js';
import { loadUsers } from './views/usersView.js';
import { loadRoles } from './views/rolesView.js';
import { submitProfileAction, loadProfile } from './views/profileView.js';


document.addEventListener('DOMContentLoaded', () => {

  actionLogout();
  actionLinkUser();
  actionLinkRoles();
  actionLinkProfiler();
  loadUsers();
});

const actionLogout = () => {
  const logoutButton = document.getElementById('logoutLink');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    });
  }
}

const actionLinkUser = () => {
  const linkUser = document.getElementById('usersLink');
  linkUser.addEventListener('click', () => {
    loadUsers();
  });
}

const actionLinkRoles = () => {
  const linkRoles = document.getElementById('rolesLink');
  linkRoles.addEventListener('click', () => {
    loadRoles();
  });
}

const actionLinkProfiler = () => {
  const linkProfiler = document.getElementById('profileLink');
  linkProfiler.addEventListener('click', () => {
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', submitProfileAction);
    loadProfile();
  });
}