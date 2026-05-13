// fake database

const tasks = [
  {
    id: 1,
    title: "HTML5",
    code: "HTML-01",
    hours: "10h / 80h",
    points: 400,
    description: "Learn semantic HTML5 tags and forms.",
    status: "todo",
  },

  {
    id: 2,
    title: "CSS3 Grid",
    code: "CSS-02",
    hours: "25h / 80h",
    points: 650,
    description: "Practice CSS Grid and responsive layouts.",
    status: "doing",
  },

  {
    id: 3,
    title: "JavaScript",
    code: "JS-03",
    hours: "60h / 80h",
    points: 1200,
    description: "Study DOM manipulation and events.",
    status: "done",
  },

  {
    id: 4,
    title: "Drag Drop",
    code: "JS-04",
    hours: "12h / 80h",
    points: 500,
    description: "Learn Drag and Drop API in HTML5.",
    status: "todo",
  },
];

// render tasks

function renderTasks() {
  document.getElementById("todo").innerHTML = "";

  document.getElementById("doing").innerHTML = "";

  document.getElementById("done").innerHTML = "";

  tasks.forEach((task) => {
    const card = document.createElement("div");

    card.classList.add("task");

    card.classList.add("card-hover");

    card.draggable = true;

    card.dataset.id = task.id;

    card.innerHTML = `

      <h3>${task.title}</h3>

      <div class="task-code">
        ${task.code}
      </div>

      <div class="task-info">

        <span>${task.hours}</span>

        <span class="points">
          ${task.points} pts
        </span>

      </div>

    `;

    addDragEvents(card);

    addClickEvent(card, task);

    document.getElementById(task.status).appendChild(card);
  });
}

// drag events

function addDragEvents(element) {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });
}

// drop columns

const columns = document.querySelectorAll(".task-list");

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", () => {
    const dragged = document.querySelector(".dragging");

    const taskId = Number(dragged.dataset.id);

    const task = tasks.find((t) => t.id === taskId);

    task.status = column.id;

    renderTasks();
  });
});

// click card

function addClickEvent(card, task) {
  card.addEventListener("click", () => {
    document.getElementById("modal").style.display = "flex";

    document.getElementById("modalTitle").innerText = task.title;

    document.getElementById("modalCode").innerText = task.code;

    document.getElementById("modalHours").innerText = task.hours;

    document.getElementById("modalPoints").innerText = task.points + " pts";

    document.getElementById("modalStatus").innerText = task.status;

    document.getElementById("modalDescription").innerText = task.description;
  });
}

// close modal

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// click outside modal

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");

  if (e.target === modal) {
    modal.style.display = "none";
  }
});

renderTasks();
