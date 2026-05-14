const calendar = document.getElementById("calendar");

const monthTitle = document.getElementById("monthTitle");

const events = [];

let currentMonth = 4;
let currentYear = 2026;

/* LOAD JSON */

fetch("cronograma.json")
  .then((response) => response.json())
  .then((data) => {
    events.push(...data);

    renderCalendar(currentYear, currentMonth);
  });

/* RENDER */

function renderCalendar(year, month) {
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = new Date(year, month, 0).getDate();

  monthTitle.innerText = new Date(year, month).toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  /* PREV DAYS */

  for (let i = firstDay - 1; i >= 0; i--) {
    createDay(prevMonthDays - i, true, year, month - 1);
  }

  /* CURRENT DAYS */

  for (let day = 1; day <= daysInMonth; day++) {
    createDay(day, false, year, month);
  }

  /* COMPLETE GRID */

  const totalCells = calendar.children.length;

  const remaining = 42 - totalCells;

  for (let i = 1; i <= remaining; i++) {
    createDay(i, true, year, month + 1);
  }
}

/* CREATE DAY */

function createDay(day, otherMonth, year, month) {
  const dayBox = document.createElement("div");

  dayBox.classList.add("day");

  if (otherMonth) {
    dayBox.classList.add("other-month");
  }

  const number = document.createElement("div");

  number.classList.add("day-number");

  number.innerText = day;

  dayBox.appendChild(number);

  const monthFixed = String(month + 1).padStart(2, "0");

  const dayFixed = String(day).padStart(2, "0");

  const fullDate = `${year}-${monthFixed}-${dayFixed}`;

  const currentDate = new Date(fullDate);

  const dayEvents = events.filter((event) => {
    const start = new Date(event.start);

    const end = new Date(event.end);

    return currentDate >= start && currentDate <= end;
  });

  dayEvents.forEach((event) => {
    const eventDiv = document.createElement("div");

    eventDiv.classList.add("event");
    eventDiv.classList.add(event.color);

    eventDiv.innerText = event.title;

    /* BORDAS */

    if (fullDate === event.start) {
      eventDiv.style.borderRadius = "8px 0 0 8px";
    } else if (fullDate === event.end) {
      eventDiv.style.borderRadius = "0 8px 8px 0";
    } else {
      eventDiv.style.borderRadius = "0";
    }

    dayBox.appendChild(eventDiv);
  });

  calendar.appendChild(dayBox);
}

/* NAVIGATION */

document.getElementById("prevBtn").addEventListener("click", () => {
  currentMonth--;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  renderCalendar(currentYear, currentMonth);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentMonth++;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  renderCalendar(currentYear, currentMonth);
});
