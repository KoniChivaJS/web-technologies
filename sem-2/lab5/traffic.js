const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const stateText = document.getElementById("stateText");

let currentState = 0;
let timeoutId = null;

let durations = {
  red: 5000,
  yellow: 3000,
  green: 7000,
  blinking: 500,
  blinkingCount: 3,
};

const states = ["red", "yellow", "green", "blinkingYellow"];

function changeDurations() {
  durations.red =
    +prompt("Тривалість ЧЕРВОНОГО (мс)", durations.red) || durations.red;
  durations.yellow =
    +prompt("Тривалість ЖОВТОГО (мс)", durations.yellow) || durations.yellow;
  durations.green =
    +prompt("Тривалість ЗЕЛЕНОГО (мс)", durations.green) || durations.green;
}

function setLight(state) {
  red.classList.remove("on");
  yellow.classList.remove("on");
  green.classList.remove("on");

  switch (state) {
    case "red":
      red.classList.add("on");
      stateText.textContent = "Стан: ЧЕРВОНИЙ";
      break;
    case "yellow":
      yellow.classList.add("on");
      stateText.textContent = "Стан: ЖОВТИЙ";
      break;
    case "green":
      green.classList.add("on");
      stateText.textContent = "Стан: ЗЕЛЕНИЙ";
      break;
    case "blinkingYellow":
      blinkYellow(durations.blinkingCount);
      break;
  }
}

function blinkYellow(times) {
  let count = 0;
  const blink = () => {
    yellow.classList.toggle("on");
    count++;
    if (count < times * 2) {
      timeoutId = setTimeout(blink, durations.blinking);
    } else {
      currentState = 0;
      runTrafficLight();
    }
  };
  stateText.textContent = "Стан: МИГОТЛИВИЙ ЖОВТИЙ";
  blink();
}

function runTrafficLight() {
  console.log("ASDSD");
  clearTimeout(timeoutId);

  const state = states[currentState];
  setLight(state);

  if (state === "blinkingYellow") return;

  timeoutId = setTimeout(() => {
    currentState = (currentState + 1) % states.length;
    runTrafficLight();
  }, durations[state]);
}

function nextState() {
  clearTimeout(timeoutId);
  currentState = (currentState + 1) % states.length;
  runTrafficLight();
}

runTrafficLight();
