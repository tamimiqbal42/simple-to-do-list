
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskBtn').addEventListener('click', addTask);


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

// Function to add a task
function addTask() {
  let taskInput = document.getElementById('taskInput');
  let taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  addTaskToDOM(taskText);

  // Save task to localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Clear input field
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

// Function to delete a task
function deleteTask(element) {
  let li = element.parentElement;
  let taskText = li.querySelector('span').innerText;

  // Remove task from DOM
  li.remove();

  // Remove task from store
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}