// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskBtn').addEventListener('click', addTask);


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let taskText = taskInput.value.trim();


  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  addTaskToDOM(taskText);

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = '';
}

function addTaskToDOM(taskText) {
  let taskList = document.getElementById('taskList');
  let li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <span class="delete" onclick="deleteTask(this)">Delete</span>
  `;
  taskList.appendChild(li);
}

function deleteTask(element) {
  let li = element.parentElement;
  let taskText = li.querySelector('span').innerText;

  li.remove();

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}