'use strict';
// Select element
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');

const submitBtn = document.getElementById('btn-submit');

//////////////////////////////////////////
// Click LOGIN BUTTON
submitBtn.addEventListener('click', function () {
  if (!validate()) return;
  // check in array based on : username and password
  const result = userArr.find(el => {
    return (
      el.username === usernameInput.value && el.password === passwordInput.value
    );
  });

  // Check result
  if (result) {
    alert('Bạn đã đăng nhập thành công 🎉');
    saveToStorage('currentUser', result); //update localStorage
    window.location.href = '../index.html';
  } else {
    alert('Thông tin bạn nhập chưa đúng. Vui lòng kiểm tra lại.');
  }
});
///////////////////////////////////////////
// Validate input
function validate() {
  let isValidate = true;
  if (usernameInput.value.trim() === '') {
    alert('User name không được để trống');
    isValidate = false;
  }
  if (passwordInput.value === '') {
    alert('Password không được để trống');
    isValidate = false;
  }
  return isValidate;
}
