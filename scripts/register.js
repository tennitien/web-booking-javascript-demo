'use strict';
// Select element
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmPassInput = document.getElementById('input-password-confirm');
const containerForm = document.querySelector('form');
const submitBtn = document.getElementById('btn-submit');
/////////////////////////////////////////

// 2. Chức năng Register
submitBtn.addEventListener('click', function () {
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value,
    // Set default: pageSize=5, category=gerneral. The data can be changed later
    5,
    'General'
  );

  // Initialize new user with valid user
  if (validate(user)) {
    userArr.push(user); //add userArr
    saveToStorage('userArr', userArr); // update localStorage
    alert('Đăng ký thành công tài khoản 🎉');
    containerForm.reset();
    window.location.href = '../pages/login.html'; // move to login
  }
});
///////////////////////////////////////////
// Validate input
function validate(data) {
  let isValidate = true;
  const result = function (meassage) {
    alert(meassage);
    isValidate = false;
  };
  // No fields are empty
  if (data.firstName.trim() === '') result('First name không được để trống');
  if (data.lastName.trim() === '') result('Last name không được để trống');
  if (data.username.trim() === '') result('User name không được để trống');

  //! Password must be more than 8 characters and don't empty
  if (data.password.length <= 8) result('Password phải hơn 8 kí tự.');
  if (confirmPassInput.value === '')
    result('Confirm Password không được để trống');
  // Password and Confirm Password must be the same
  else if (data.password !== confirmPassInput.value)
    result('Password và Confirm Password phải giống nhau');

  // Username cannot be the same as the Username of previous users.
  if (userArr.some(user => user.username === data.username))
    result('Username đã tồn tại');

  return isValidate;
}
