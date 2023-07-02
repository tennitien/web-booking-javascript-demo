'use strict';
const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

const contentContainer = document.getElementById('content');

///////////////////////////////////////////
// If the user is not logged in : hidden INPUT FORM
taskInput.parentNode.style.display = 'none';
///////////////////////////////////////////
if (currentUser) {
  taskInput.parentNode.removeAttribute('style');
  renderTodoList();
}
///////////////////////////////////////////
// Click ADD button
addBtn.addEventListener('click', () => {
  //Validate input task
  if (!taskInput.value.trim()) {
    alert('Mời bạn nhập thông tin');
    return;
  }
  // Create new task
  const newTask = new Task(taskInput.value, currentUser.username, false);
  todoArr.push(newTask); //add todoArr
  saveToStorage('todoArr', todoArr); //update localStorage

  taskInput.value = '';

  //  display Task list
  renderTodoList();
});

///////////////////////////////////////////
// Function used to display information
function renderTodoList() {
  let html = '';
  todoArr
    .filter(el => el.owner === currentUser.username) //filter new arr have same username
    .forEach(el => {
      html += `
    <li class=${el.isDone ? 'checked' : ''}>${
        el.task
      }<span class="close">×</span></li>
    `;
    });
  todoList.innerHTML = html;

  toggleTasks();
  deletedTask();
}
// Toggle Task
function toggleTasks() {
  document.querySelectorAll('#todo-list li').forEach(liElement => {
    liElement.addEventListener('click', function (e) {
      const liEl = e.target;
      // remove the case of clicking Close(child element of li Element)
      if (liEl.classList.contains('close')) return;

      // remove 'x' in <span>x</span>
      //<li class=${el.isDone ? 'checked' : ''}>${el.task}<span class="close">×</span></li>
      let todo = liEl.textContent.slice(0, -1);

      // find index : based on todo && username
      const index = todoArr.findIndex(el => {
        return el.task === todo && el.owner === currentUser.username;
      });

      // toggle class 'checked'
      liEl.classList.toggle('checked');
      // update  'isDone'  -> todoArr && localStorage
      todoArr[index].isDone = todoArr[index].isDone ? false : true;
      saveToStorage('todoArr', todoArr);
    });
  });
}
//  Delete Task
function deletedTask() {
  document.querySelectorAll('#todo-list .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function (e) {
      if (!confirm('Bạn muốn xóa task?')) return;
      const closeEl = e.target;
      // Remove 'x' in Content__ parent Element
      let todo = closeEl.parentNode.textContent.slice(0, -1);

      // find index : based on todo && username
      const index = todoArr.findIndex(el => {
        return el.task === todo && el.owner === currentUser.username;
      });
      // delete based on index
      todoArr.splice(index, 1);
      // update  'isDone'  -> todoArr && localStorage
      saveToStorage('todoArr', todoArr);
      renderTodoList();
    });
  });
}
