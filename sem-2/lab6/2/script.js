const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(input.value.trim());
  input.value = "";
});

function addTodo(text) {
  if (!text) return;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todos.push(todo);
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

function toggleComplete(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date() } : t
  );
  renderTodos();
}

function editTodo(id) {
  const newText = prompt(
    "Редагувати завдання:",
    todos.find((t) => t.id === id).text
  );
  if (newText && newText.trim() !== "") {
    todos = todos.map((t) =>
      t.id === id ? { ...t, text: newText.trim(), updatedAt: new Date() } : t
    );
    renderTodos();
  }
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    const span = document.createElement("span");
    span.className = "todo-content";
    span.textContent = todo.text;
    span.onclick = () => toggleComplete(todo.id);

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.classList.add("edit");
    editBtn.onclick = () => editTodo(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => deleteTodo(todo.id);

    actions.append(editBtn, deleteBtn);
    li.append(span, actions);
    list.appendChild(li);
  });
}

function sortBy(type) {
  if (type === "created") {
    todos.sort((a, b) => a.createdAt - b.createdAt);
  } else if (type === "updated") {
    todos.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (type === "completed") {
    todos.sort((a, b) => a.completed - b.completed);
  }
  renderTodos();
}

function resetSort() {
  todos.sort((a, b) => a.id - b.id);
  renderTodos();
}
