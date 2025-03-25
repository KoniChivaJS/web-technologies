function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const secs = String(now.getSeconds()).padStart(2, "0");
  document.getElementById(
    "clock"
  ).innerHTML = `${hours}:${mins}:<span class="blink">${secs}</span>`;
}
setInterval(updateClock, 1000);
updateClock();

let countdownInterval;
function startCountdown() {
  clearInterval(countdownInterval);
  const endTime = new Date(document.getElementById("endTimeInput").value);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = endTime - now;
    if (diff <= 0) {
      document.getElementById("countdown").textContent = "Час вийшов!";
      clearInterval(countdownInterval);
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    document.getElementById(
      "countdown"
    ).textContent = `Залишилось: ${d} днів, ${h} год, ${m} хв, ${s} сек`;
  }, 1000);
}

function generateCalendar() {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = "";
  const input = document.getElementById("calendarInput").value;
  if (!input) return;

  const [year, month] = input.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = date.getDay(); // 0 - неділя

  let html = '<table border="1" style="margin:auto;"><tr>';
  const weekDays = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  weekDays.forEach((day) => (html += `<th>${day}</th>`));
  html += "</tr><tr>";

  for (let i = 0; i < startDay; i++) {
    html += "<td></td>";
  }

  for (let d = 1; d <= daysInMonth; d++) {
    html += `<td>${d}</td>`;
    if ((startDay + d) % 7 === 0) html += "</tr><tr>";
  }

  html += "</tr></table>";
  calendarDiv.innerHTML = html;
}

function calcBirthday() {
  const input = document.getElementById("birthdayInput").value;
  if (!input) return;

  const now = new Date();
  const [year, month, day] = input.split("-").map(Number);
  let nextBday = new Date(now.getFullYear(), month - 1, day);

  if (nextBday < now) {
    nextBday.setFullYear(now.getFullYear() + 1);
  }

  const diff = nextBday - now;
  const months =
    nextBday.getMonth() -
    now.getMonth() +
    (nextBday.getFullYear() - now.getFullYear()) * 12;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById(
    "birthdayResult"
  ).textContent = `До дня народження: ${months} міс, ${
    months >= 1 ? days - months * 30 : days
  } днів, ${hours} год, ${mins} хв, ${secs} сек`;
}
