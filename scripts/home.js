'use strict';
const logOutModal = document.getElementById('main-content');
const logInModal = document.getElementById('login-modal');
const welcomeMsg = document.getElementById('welcome-message');

const logOutBtn = document.getElementById('btn-logout');
//////////////////////////////////////////
// 4. Home Page
//hidden Logout button
logOutModal.style.display = 'none';

// check account ->After login: curentUser is true
if (currentUser) {
  logIn();
}
// 5. Chức năng Logout
// Click LOGOUT button
logOutBtn.addEventListener('click', function () {
  if (!confirm('Bạn muốn đăng xuất ?')) return;
  localStorage.removeItem('currentUser');
  logOut();
});

///////////////////////////////////////////
function logIn() {
  logInModal.style.display = 'none';

  //Show Logout button and Welcome message
  welcomeMsg.innerHTML = `Welcome ${currentUser.firstName}`;
  logOutModal.style.display = 'block';
}
function logOut() {
  logInModal.style.display = 'block';
  //hidden Logout button and Welcome message
  logOutModal.style.display = 'none';
}
