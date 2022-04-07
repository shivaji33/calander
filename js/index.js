const grid = document.querySelector(".grid");
const days = ["సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని", "ఆది"];
const monthNames = [
  "జనవరి",
  "ఫిబ్రవరి",
  "మార్చి",
  "ఏప్రిల్",
  "మే",
  "జూన్",
  "జూలై",
  "ఆగస్టు",
  "సెప్టెంబర్",
  "అక్టోబర్",
  "నవంబర్",
  "డిసెంబర్",
];

const dayWrapper = document.createElement("div");
dayWrapper.className = "cell-group";

const datesWrapper = document.createElement("div");
datesWrapper.className = "dates-wrapper";

for (let i = 0; i <= 6; i++) {
  const day = document.createElement("div");
  day.className = "cell";
  day.innerHTML = days[i];
  dayWrapper.appendChild(day);
}

grid.appendChild(dayWrapper);
grid.appendChild(datesWrapper);

let today = new Date();

function lastDateOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function viewCalender() {
  // for sunday first day will be zero so we are replacing zero with seven i.e (firstDay || 7)
  const firstDay = firstDayOfMonth(today.getFullYear(), today.getMonth()) || 7;
  const lastDate = lastDateOfMonth(today.getFullYear(), today.getMonth());
  let prevMonthCells = 0;
  let nextMonthCells = 0;

  document.querySelector(".date-display").innerHTML =
    today.getDate() +
    "-" +
    monthNames[today.getMonth()] +
    "-" +
    today.getFullYear();
  let k = 1;
  let isValidCell = false;
  for (let i = 1; i <= 6; ) {
    const dayRow = document.createElement("div");
    dayRow.className = "cell-group";
    for (let j = 1; j <= 7; j++) {
      const day = document.createElement("div");
      day.className = "date-cell";
      day.tabIndex = 0;
      if (i + "" + j === 1 + "" + firstDay || isValidCell) {
        if (!isValidCell) {
          isValidCell = true;
        }
        if (k <= lastDate) {
          day.id = (today.getMonth() + 1) + '-' + k;
          day.innerHTML = k;
          if (k === today.getDate()) {
            day.classList.add("today");
          }
          k++;
        } else {
          nextMonthCells++;
          day.innerHTML = nextMonthCells;
          day.id = (today.getMonth() + 2) + '-' + nextMonthCells;
          day.style.color = 'rgb(194 184 184)';
        }
      } else {
        const lastMonthLastDate = lastDateOfMonth(today.getFullYear(), today.getMonth() - 1);
        const prevMonthDate = lastMonthLastDate - (firstDay - 2) + prevMonthCells;
        prevMonthCells++;
        day.innerHTML = prevMonthDate;
        day.id = today.getMonth() + '-' + prevMonthDate;
        day.style.color = 'rgb(194 184 184)';
      }
      dayRow.appendChild(day);
    }
    datesWrapper.appendChild(dayRow);
    if (k <= lastDate) {
      i++;
    } else {
      break;
    }
  }
}

viewCalender();

// prev button action

document.querySelector(".btn-prev").addEventListener("click", () => {
  today.setMonth(today.getMonth() - 1);
  document.querySelector(".dates-wrapper").innerHTML = "";
  viewCalender();
});

// next button

document.querySelector(".btn-next").addEventListener("click", () => {
  today.setMonth(today.getMonth() + 1);

  document.querySelector(".dates-wrapper").innerHTML = "";
  viewCalender();
});

document.querySelector(".back-to-today").addEventListener("click", () => {
  today = new Date();
  document.querySelector(".dates-wrapper").innerHTML = "";
  viewCalender();
});

const dateCells = [...document.querySelectorAll('.date-cell')]

dateCells.forEach(date => {
  date.addEventListener('click', () => {
    dateCells.forEach(d => {
       if (date.id === d.id) {
        date.classList.add('selected-date');
      } else {
        d.classList.remove('selected-date');
      }
    })
  });
})
