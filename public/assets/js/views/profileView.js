// profileView.js

import { getUserById, editUser } from '../api/users.js';
import { loadUsers } from './usersView.js';

export const loadProfile = () => {
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

  const closeButton = document.querySelector('#editProfileModal .close');

  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
}

export const submitProfileAction = (event) => {

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