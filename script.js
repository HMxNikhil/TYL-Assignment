// Task data and state
let tasks = [];
let editingTaskId = null;

// DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const currentDate = document.getElementById("currentDate");
const taskStats = document.getElementById("taskStats");

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  updateStats();
  updateUI();

  // Event listeners
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", handleKeyPress);
  taskInput.addEventListener("input", handleInputChange);
});

// Update current date
function updateDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDate.textContent = now.toLocaleDateString("en-US", options);
}

// Handle input changes
function handleInputChange() {
  const hasText = taskInput.value.trim() !== "";
  addBtn.classList.toggle("active", hasText);
}

// Handle enter key press
function handleKeyPress(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addTask();
  }
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    text: text,
    completed: false,
    createdAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  tasks.push(newTask);
  taskInput.value = "";
  handleInputChange();
  updateUI();
  updateStats();
}

// Delete task
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((task) => task.id !== id);
    updateUI();
    updateStats();
  }
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  updateUI();
  updateStats();
}

// Start editing task
function startEdit(id) {
  editingTaskId = id;
  updateUI();
}

// Save task edit
function saveEdit(id, newText) {
  const text = newText.trim();
  if (text === "") {
    alert("Task cannot be empty");
    return;
  }

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, text: text } : task
  );
  editingTaskId = null;
  updateUI();
}

// Cancel task edit
function cancelEdit() {
  editingTaskId = null;
  updateUI();
}

// Update task statistics
function updateStats() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (totalTasks === 0) {
    taskStats.textContent = "";
  } else {
    taskStats.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
  }
}

// Create task item HTML
function createTaskItem(task) {
  const isEditing = editingTaskId === task.id;
  const taskItem = document.createElement("li");
  taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

  taskItem.innerHTML = `
        <div class="task-checkbox ${task.completed ? "checked" : ""}" 
             onclick="toggleTask('${task.id}')">
            ${task.completed ? "✓" : ""}
        </div>
        <div class="task-content">
            ${
              isEditing
                ? `
                <input type="text" 
                       class="task-edit-input" 
                       value="${task.text}" 
                       id="edit-${task.id}"
                       onkeypress="handleEditKeyPress(event, '${task.id}')">
            `
                : `
                <div class="task-text ${task.completed ? "completed" : ""}">${
                    task.text
                  }</div>
                <div class="task-time">${task.createdAt}</div>
            `
            }
        </div>
        <div class="task-actions">
            ${
              isEditing
                ? `
                <button class="action-btn save-btn" onclick="saveEditFromInput('${task.id}')">✓</button>
                <button class="action-btn cancel-btn" onclick="cancelEdit()">✕</button>
            `
                : `
                <button class="action-btn edit-btn" onclick="startEdit('${task.id}')">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteTask('${task.id}')">🗑️</button>
            `
            }
        </div>
    `;

  return taskItem;
}

// Handle edit input key press
function handleEditKeyPress(e, taskId) {
  if (e.key === "Enter") {
    saveEditFromInput(taskId);
  } else if (e.key === "Escape") {
    cancelEdit();
  }
}

// Save edit from input field
function saveEditFromInput(taskId) {
  const input = document.getElementById(`edit-${taskId}`);
  saveEdit(taskId, input.value);
}

// Update UI
function updateUI() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");

    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      taskList.appendChild(taskItem);
    });

    // Focus on edit input if editing
    if (editingTaskId) {
      setTimeout(() => {
        const editInput = document.getElementById(`edit-${editingTaskId}`);
        if (editInput) {
          editInput.focus();
          editInput.select();
        }
      }, 0);
    }
  }
}
