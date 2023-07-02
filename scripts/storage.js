'use strict';
//////////////////////////////////////////
// Save to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Get from localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
///////////////////////////////////////////
// convert from JS Object to Class Instance
function parseUser(data) {
  let user = new User(
    data.firstName,
    data.lastName,
    data.username,
    data.password,
    data.pageSize,
    data.category
  );
  return user;
}
function parseTask(data) {
  let task = new Task(data.task, data.owner, data.isDone);
  return task;
}
//////////////////////////////////////////
// 1. get data from localStorage
// 2. then : convert to Class
const userLocal = getFromStorage('userArr') ? getFromStorage('userArr') : [];
const userArr = userLocal.map(user => parseUser(user));

const todoLocal = getFromStorage('todoArr') ? getFromStorage('todoArr') : [];
const todoArr = todoLocal.map(todo => parseTask(todo));

const currentUserLocal = getFromStorage('currentUser')
  ? getFromStorage('currentUser')
  : null;
const currentUser = currentUserLocal ? parseUser(currentUserLocal) : null;

// apiKey to use API
const apiKey = '0da1f335c60d44b99fd2acc2c6d7cd66';
