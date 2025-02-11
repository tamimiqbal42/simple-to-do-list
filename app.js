document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
  let textInput = document.getElementById('taskInput');
  let taskText = textInput.value.trim();

  // Input validation
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Add task to DOM
  addTaskToDOM(taskText);

  // Save task to localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear input field
  textInput.value = "";
}

function addTaskToDOM(taskText) {
  let ul = document.getElementById('taskList');
  let li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <span>
      <span class="delete" onclick="deleteTask(this)">Delete</span>
    </span>
  `;
  ul.appendChild(li);
}

function deleteTask(element) {
  let li = element.parentElement.parentElement;
  let taskText = li.firstElementChild.innerText;

  // Remove task from DOM
  li.remove();

  // Remove task from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}