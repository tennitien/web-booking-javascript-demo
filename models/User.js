'use strict';
// 1. Tạo Class User
class User {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    // 9. Thay đổi thiết lập
    this.pageSize = pageSize;
    this.category = category;
  }
}
// Class Task for todo list
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
