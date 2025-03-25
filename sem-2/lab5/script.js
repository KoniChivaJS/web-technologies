const lamp = document.getElementById("lamp");
let timeoutId;

function toggleLamp() {
  lamp.style.boxShadow = "";

  lamp.classList.toggle("on");
  resetInactivityTimer();
}

function changeLampType() {
  lamp.classList.remove("type-default", "type-energy", "type-led");
  const type = document.getElementById("lampType").value;
  lamp.classList.add(`type-${type}`);
  resetInactivityTimer();
}

function setBrightness() {
  const brightness = prompt("Введіть яскравість від 0 до 100");
  const level = Math.max(0, Math.min(100, Number(brightness)));
  lamp.style.boxShadow = lamp.classList.contains("on")
    ? `0 0 ${level}px ${level / 10}px yellow`
    : "none";
  resetInactivityTimer();
}

function resetInactivityTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    lamp.classList.remove("on");
    lamp.style.boxShadow = "none";
    alert("Auto lamp off");
  }, 1000 * 60 * 5);
}

changeLampType();
