let kanbanCards = [];

let currentEditId = null;

// load dataset

async function loadKanban() {
  try {
    const saved = localStorage.getItem("kanban_dataset");

    if (saved) {
      kanbanCards = JSON.parse(saved);
    } else {
      const response = await fetch("kanban.json");

      kanbanCards = await response.json();

      saveDataset();
    }

    renderKanban();
  } catch (error) {
    console.error("Error loading kanban:", error);
  }
}

// save dataset

function saveDataset() {
  localStorage.setItem(
    "kanban_dataset",

    JSON.stringify(kanbanCards),
  );
}

// render board

function renderKanban() {
  const todo = document.getElementById("todo");

  const doing = document.getElementById("doing");

  const done = document.getElementById("done");

  todo.innerHTML = "";

  doing.innerHTML = "";

  done.innerHTML = "";

  kanbanCards.forEach((card) => {
    const cardElement = document.createElement("div");

    cardElement.classList.add("kanban-card");

    cardElement.draggable = true;

    cardElement.dataset.id = card.id;

    cardElement.innerHTML = `

      <h3>${card.title}</h3>

      <div class="card-info">

        <span class="card-code">
          ${card.code}
        </span>

        <span>
          ⏱ ${card.hours}
        </span>

        <span class="card-points">
          ⭐ ${card.points}
        </span>

      </div>

    `;

    // open modal

    cardElement.addEventListener("click", () => {
      openModal(card);
    });

    // drag start

    cardElement.addEventListener("dragstart", () => {
      cardElement.classList.add("dragging");
    });

    // drag end

    cardElement.addEventListener("dragend", () => {
      cardElement.classList.remove("dragging");
    });

    // append

    if (card.status === "todo") {
      todo.appendChild(cardElement);
    }

    if (card.status === "doing") {
      doing.appendChild(cardElement);
    }

    if (card.status === "done") {
      done.appendChild(cardElement);
    }
  });
}

// drag/drop

document.querySelectorAll(".kanban-cards").forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    const dragging = document.querySelector(".dragging");

    if (!dragging) {
      return;
    }

    const id = Number(dragging.dataset.id);

    const card = kanbanCards.find((c) => c.id === id);

    if (card) {
      card.status = column.id;
    }

    saveDataset();

    renderKanban();
  });
});

// open modal

function openModal(card) {
  currentEditId = card.id;

  document.getElementById("modal").classList.remove("hidden");

  document.getElementById("editTitle").value = card.title;

  document.getElementById("editCode").value = card.code;

  document.getElementById("editHours").value = card.hours;

  document.getElementById("editPoints").value = card.points;

  document.getElementById("editDescription").value = card.description;

  document.getElementById("editStatus").value = card.status;
}

// close modal

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

// save card

document.getElementById("saveCardButton").addEventListener("click", () => {
  const card = kanbanCards.find((c) => c.id === currentEditId);

  if (!card) {
    return;
  }

  card.title = document.getElementById("editTitle").value;

  card.code = document.getElementById("editCode").value;

  card.hours = document.getElementById("editHours").value;

  card.points = Number(document.getElementById("editPoints").value);

  card.description = document.getElementById("editDescription").value;

  card.status = document.getElementById("editStatus").value;

  saveDataset();

  renderKanban();

  document.getElementById("modal").classList.add("hidden");
});

// export json

document.getElementById("exportButton").addEventListener("click", () => {
  const data = JSON.stringify(kanbanCards, null, 2);

  const blob = new Blob([data], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "kanban-dataset.json";

  a.click();

  URL.revokeObjectURL(url);
});

// import json

document.getElementById("importButton").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);

      if (Array.isArray(importedData)) {
        kanbanCards = importedData;

        saveDataset();

        renderKanban();

        alert("Dataset imported successfully.");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Error importing JSON.");
    }
  };

  reader.readAsText(file);
});

// clear dataset

document.getElementById("clearButton").addEventListener("click", () => {
  const confirmClear = confirm("Remove all cards?");

  if (!confirmClear) {
    return;
  }

  kanbanCards = [];

  saveDataset();

  renderKanban();
});

// init

loadKanban();
