let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const activeTab = document.querySelector(".tabs button.active").id;

  tasks.forEach((task, index) => {
    if (activeTab === "completedTasksBtn" && !task.completed) return;
    if (activeTab === "pendingTasksBtn" && task.completed) return;

    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa fa-pen"></i>`;
    editBtn.className = "bg-green";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Enter the new task text:", task.text);
      if (newText !== null) {
        tasks[index].text = newText.trim();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;
    deleteBtn.className = "bg-red";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    const listDiv = document.createElement("div");
    listDiv.className = "Text_check";

    li.appendChild(listDiv);

    listDiv.appendChild(checkbox);
    listDiv.appendChild(taskText);

    const div = document.createElement("div");
    div.className = "button_div";

    li.appendChild(div);

    div.appendChild(editBtn); // Add edit button
    div.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  const tabs = document.querySelectorAll(".tabs button");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderTasks();
    });
  });
});

const add_task = document.getElementById("add_task");

add_task.addEventListener("click", addTask);
