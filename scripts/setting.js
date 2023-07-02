'use strict';
const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const mainContainer = document.querySelector('#main');
const submitBtn = document.getElementById('btn-submit');

// Hidden or show form : Base on currentUser
mainContainer.style.display = 'none';
if (currentUser) mainContainer.style.display = 'block';
///////////////////////////////////////////
// Clich SAVE SETTING button
submitBtn.addEventListener('click', function () {
  if (validate()) {
    // find index
    let index = userArr.findIndex(
      user => user.username === currentUser.username
    );

    // update pageSize if pageSize have data
    userArr[index].pageSize = currentUser.pageSize = pageSizeInput.value;
    // ? pageSizeInput.value
    // : currentUser.pageSize;
    // update category
    userArr[index].category = currentUser.category = categoryInput.value;
    // update localStorage
    saveToStorage('userArr', userArr);
    saveToStorage('currentUser', currentUser);
    alert('Cài đặt thành công');
  }
});
renderSetting();

function renderSetting() {
  pageSizeInput.value = currentUser.pageSize;
  categoryInput.value = currentUser.category;
}
function validate() {
  //check input && number is interger
  if (!(pageSizeInput.value && Number.isInteger(Number(pageSizeInput.value)))) {
    alert('Vui lòng điền số nguyên vào News per page');
    return false;
  } else return true;
}
