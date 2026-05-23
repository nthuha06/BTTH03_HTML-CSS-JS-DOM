const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const deadlineInput = document.getElementById("deadline");
const priorityInput = document.getElementById("priority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editId = null;

openModalBtn.addEventListener("click", () => {
  taskModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  closeModal();
});

function closeModal(){
  taskModal.classList.add("hidden");
  taskForm.reset();
  editId = null;
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showMessage(text){
  message.textContent = text;

  setTimeout(() => {
    message.textContent = "";
  }, 2000);
}

function updateSummary(){

  totalTasks.textContent = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  completedTasks.textContent = completed;

  pendingTasks.textContent = tasks.length - completed;
}

function renderTasks(){

  taskList.innerHTML = "";

  if(tasks.length === 0){
    taskList.innerHTML = "<p>Chưa có công việc nào.</p>";
    return;
  }

  tasks.forEach(task => {

    const taskCard = document.createElement("div");

    taskCard.className = task.completed
      ? "task-card completed"
      : "task-card";

    taskCard.innerHTML = `
      <h3>${task.title}</h3>

      <p>${task.description}</p>

      <p>Hạn: ${task.deadline}</p>

      <p>Ưu tiên: ${task.priority}</p>

      <p>
        Trạng thái:
        ${task.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
      </p>

      <div class="actions">

        <button class="status-btn" onclick="toggleStatus(${task.id})">
          ${task.completed ? "Hoàn tác" : "Hoàn thành"}
        </button>

        <button class="edit-btn" onclick="editTask(${task.id})">
          Sửa
        </button>

        <button class="delete-btn" onclick="deleteTask(${task.id})">
          Xóa
        </button>

      </div>
    `;

    taskList.appendChild(taskCard);

  });

  updateSummary();
}

taskForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const taskData = {
    id: editId || Date.now(),
    title: titleInput.value,
    description: descriptionInput.value,
    deadline: deadlineInput.value,
    priority: priorityInput.value,
    completed: false
  };

  if(editId){

    tasks = tasks.map(task =>
      task.id === editId
        ? { ...task, ...taskData }
        : task
    );

    showMessage("Cập nhật công việc thành công");

  }else{

    tasks.push(taskData);

    showMessage("Thêm công việc thành công");
  }

  saveTasks();

  renderTasks();

  closeModal();
});

function deleteTask(id){

  const confirmDelete = confirm(
    "Bạn có chắc muốn xóa công việc này?"
  );

  if(confirmDelete){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

    showMessage("Xóa công việc thành công");
  }
}

function editTask(id){

  const task = tasks.find(task => task.id === id);

  titleInput.value = task.title;
  descriptionInput.value = task.description;
  deadlineInput.value = task.deadline;
  priorityInput.value = task.priority;

  editId = id;

  taskModal.classList.remove("hidden");
}

function toggleStatus(id){

  tasks = tasks.map(task => {

    if(task.id === id){
      task.completed = !task.completed;
    }

    return task;
  });

  saveTasks();

  renderTasks();

  showMessage("Cập nhật trạng thái thành công");
}

renderTasks();