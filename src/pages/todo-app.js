import check from "../check.svg?raw";

const del = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>`;

let viewTask = document.querySelector(".app-content__viewtask");
let allTasks = [];

const renderTask = () => {
  let sum = "";
  if (allTasks.length === 0) {
    viewTask.innerHTML = `<div class="task__details"><h2>No Task Added.</h2></div>`;
    return;
  }
  allTasks.forEach((task, index) => {
    let taskFinished = task.finished;
    sum += `<div class="task ${
      taskFinished ? "finished" : "not-finished"
    }" data-index="${index}" tabindex="0">
                <div class="task__less" title="${task.title}">
                    <div class="task__details">
                        <h2>
                            ${task.title}
                            <span class="${task.priority}">
                              ${task.priority}
                            </span>
                        </h2>
                    </div>
                    <div class="task__actions">
                      <button title="Undo Task" class="btn-undo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg>
                      </button>
                      <button title="${
                        taskFinished ? "Delete Task" : "Mark as completed"
                      }" class="btn-delete" data-index=${index}>
                        ${taskFinished ? del : check}
                      </button>
                    </div>
                </div>
              <div class="task__more"><p>${task.details}</p></div>
            </div>`;
  });
  viewTask.innerHTML = sum;

  const tasksList = document.querySelectorAll(".task");

  const openTask = (taskEl) => {
    const moreTask = taskEl.querySelector(".task__more");

    moreTask.firstChild.textContent !== "" &&
      taskEl.classList.toggle("task-open");

    if (taskEl.classList.contains("task-open")) {
      moreTask.style.maxHeight = moreTask.scrollHeight * 2.6 + "px";
    } else {
      moreTask.style.maxHeight = "0px";
    }
  };

  tasksList.forEach((taskEl) => {
    taskEl.addEventListener("keydown", (e) => {
      const task = e.target.closest(".task");

      if (!task) return;

      if (e.key === " ") {
        e.preventDefault();
        openTask(taskEl);
      }
    });

    taskEl.addEventListener("click", (e) => {
      const index = Number(taskEl.dataset.index);
      const isDeleteBtn = e.target.closest(".btn-delete");
      const isUndoBtn = e.target.closest(".btn-undo");

      // Prevent toggling when the delete button is clicked
      if (!isDeleteBtn && !isUndoBtn) {
        openTask(taskEl);
        return;
      }

      // instead to delete the task
      if (allTasks[index].finished) {
        isUndoBtn
          ? (allTasks[index].finished = false)
          : allTasks.splice(index, 1);
      } else {
        allTasks[index].finished = true;
      }
      allTasks.length === 0
        ? localStorage.removeItem("allTasks")
        : localStorage.setItem("allTasks", JSON.stringify(allTasks));
      renderTask();
    });
  });
};

const selectMarker = () => {
  const select = document.getElementById("taskpriority");
  const arrow = document.querySelector("svg.select-arrow");
  select.addEventListener("click", () => {
    arrow.classList.toggle("open");
  });
  select.addEventListener("focus", () => {
    arrow.classList.contains("open") && arrow.classList.add("open");
  });
  select.addEventListener("change", () => {
    !arrow.classList.contains("open") && arrow.classList.toggle("open");
  });
  select.addEventListener("blur", () => {
    arrow.classList.contains("open") && arrow.classList.remove("open");
  });
};

const todoApp = () => {
  const addTaskForm = document.querySelector(".app-content__addtask form");
  const taskTitle = addTaskForm.querySelector("input#input-addtask");
  const taskDetails = addTaskForm.querySelector("textarea#taskdetails");
  const taskPriority = addTaskForm.querySelector("select#taskpriority");

  selectMarker();

  localStorage.getItem("allTasks")
    ? (allTasks = JSON.parse(localStorage.getItem("allTasks")))
    : (allTasks = []);
  renderTask();

  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    allTasks.push({
      title: taskTitle.value.trim(),
      details: taskDetails.value.trim(),
      priority: taskPriority.value,
      finished: false,
    });

    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    renderTask();
    taskTitle.value = "";
    taskDetails.value = "";
    taskPriority.value = "high";
  });
};

export default todoApp;
