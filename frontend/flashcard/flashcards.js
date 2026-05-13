const STORAGE_KEY = "english_flashcards";

let flashcards = [];

// load flashcards

async function loadFlashcards() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      flashcards = JSON.parse(saved);
    } else {
      const response = await fetch("flashcards.json");

      flashcards = await response.json();

      saveFlashcards();
    }

    // fix old datasets

    flashcards.forEach((card) => {
      if (typeof card.score !== "number") {
        card.score = 0;
      }

      if (card.lastPositive === undefined) {
        card.lastPositive = null;
      }
    });

    renderFlashcards();
  } catch (error) {
    console.error(error);
  }
}

// save localStorage

function saveFlashcards() {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(flashcards),
  );
}

// reset positive scores

function resetPositiveScores() {
  const now = Date.now();

  flashcards.forEach((card) => {
    if (Number(card.score) > 0 && card.lastPositive) {
      const diff = now - card.lastPositive;

      const oneHour = 60 * 60 * 1000;

      if (diff >= oneHour) {
        card.score = 0;

        card.lastPositive = null;
      }
    }
  });

  saveFlashcards();
}

// update stats

function updateStats() {
  const total = flashcards.length;

  const learned = flashcards.filter((card) => Number(card.score) > 0).length;

  const hard = flashcards.filter((card) => Number(card.score) < 0).length;

  document.getElementById("totalCards").innerText = total;

  document.getElementById("learnedCards").innerText = learned;

  document.getElementById("hardCards").innerText = hard;
}

// render cards

function renderFlashcards() {
  resetPositiveScores();

  updateStats();

  const grid = document.getElementById("flashcardsGrid");

  grid.innerHTML = "";

  flashcards.forEach((card) => {
    const template = document.getElementById("cardTemplate");

    const clone = template.content.cloneNode(true);

    const flashcard = clone.querySelector(".flashcard");

    const englishText = clone.querySelector(".english-text");

    const portugueseText = clone.querySelector(".portuguese-text");

    const scoreText = clone.querySelector(".score-text");

    const correctButton = clone.querySelector(".correctButton");

    const wrongButton = clone.querySelector(".wrongButton");

    englishText.innerText = card.english;

    portugueseText.innerText = card.portuguese;

    scoreText.innerText = `Score: ${Number(card.score)}`;

    // states

    if (Number(card.score) > 0) {
      flashcard.classList.add("easy");
    }

    if (Number(card.score) < 0) {
      flashcard.classList.add("hard");
    }

    // flip

    flashcard.addEventListener("click", () => {
      flashcard.classList.toggle("flipped");
    });

    // correct

    correctButton.addEventListener("click", (e) => {
      e.stopPropagation();

      card.score = Number(card.score) + 1;

      if (card.score > 0) {
        card.lastPositive = Date.now();
      }

      saveFlashcards();

      renderFlashcards();
    });

    // wrong

    wrongButton.addEventListener("click", (e) => {
      e.stopPropagation();

      card.score = Number(card.score) - 10;

      card.lastPositive = null;

      saveFlashcards();

      renderFlashcards();
    });

    grid.appendChild(clone);
  });
}

// add flashcard

document.getElementById("addCardButton").addEventListener("click", () => {
  const englishInput = document.getElementById("englishInput");

  const translationInput = document.getElementById("translationInput");

  const english = englishInput.value.trim();

  const portuguese = translationInput.value.trim();

  if (english === "" || portuguese === "") {
    alert("Fill all fields.");

    return;
  }

  flashcards.push({
    id: Date.now(),

    english,

    portuguese,

    score: 0,

    lastPositive: null,
  });

  saveFlashcards();

  renderFlashcards();

  englishInput.value = "";

  translationInput.value = "";
});

// export json

document.getElementById("exportButton").addEventListener("click", () => {
  const data = JSON.stringify(
    flashcards,

    null,

    2,
  );

  const blob = new Blob(
    [data],

    {
      type: "application/json",
    },
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "dataset.json";

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
        flashcards = importedData;

        flashcards.forEach((card) => {
          if (typeof card.score !== "number") {
            card.score = 0;
          }

          if (card.lastPositive === undefined) {
            card.lastPositive = null;
          }
        });

        saveFlashcards();

        renderFlashcards();

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

// clear all

document.getElementById("clearButton").addEventListener("click", () => {
  const confirmClear = confirm("Remove all flashcards?");

  if (!confirmClear) {
    return;
  }

  flashcards = [];

  saveFlashcards();

  renderFlashcards();
});

// init

loadFlashcards();
