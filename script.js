let todos = [];
let updateId = null;

const todosInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addbtn");
const todoList = document.getElementById("todoList");

addBtn.addEventListener("click", addTodo);
todosInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

window.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});

function addTodo() {
  const todoText = todosInput.value.trim();
  if (todoText === "") {
    alert("Hech narsa kiritilmadi!");
    return;
  }

  if (updateId) {
    updated(updateId, todoText);
  } else {
    todos.push({
      id: Date.now(),
      text: todoText,
      isCompleted: false,
    });
  }

  renderTodos();
  todosInput.value = "";
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function editTodo(id) {
  updateId = id;
  addBtn.innerText = "O'zgartirish";
  todosInput.value = todos.find((todo) => todo.id === id).text;
}

function updated(id, newText) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  addBtn.innerText = "Qo'shish";
  updateId = null;
}

function renderTodos() {
  if (todos.length === 0) {
    todoList.innerHTML = "<p>Hech qanday ma'lumot topilmadi!</p>";
    return;
  }

  todoList.innerHTML = todos
    .map(
      (todo) => `
          <div class="todo-item">
            <div style="display:flex;align-items:center;">
              <div class="todo-checkbox ${
                todo.isCompleted ? "checked" : ""
              }" onclick="toggleTodo(${todo.id})"></div>
              <div class="todo-text ${todo.isCompleted ? "completed" : ""}">
                ${todo.text}
              </div>
            </div>
            <div class="todo-actions">
              <button class="action-btn edit-btn" onclick="editTodo(${
                todo.id
              })">Tahrir</button>
              <button class="action-btn delete-btn" onclick="deleteTodo(${
                todo.id
              })">O'chir</button>
            </div>
          </div>
        `
    )
    .join("");
}
