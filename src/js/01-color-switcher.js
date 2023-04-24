function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', OnStartBtnClick);
btnStop.addEventListener('click', onBtnStopClick);

function OnStartBtnClick(evt) {
  timerId = setInterval(() => {
    console.log((bodyColor.style.backgroundColor = getRandomHexColor()));
  }, 1000);
  if (timerId) {
    btnStart.disabled = true;
  }
}
function onBtnStopClick(evt) {
  clearInterval(timerId);
  btnStart.disabled = false;
}
