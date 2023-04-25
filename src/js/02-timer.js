import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const btnStart = document.querySelector('button');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minsEl = document.querySelector('span[data-minutes]');
const secsEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const futureDate = selectedDates[0].getTime();
    const currentDate = Date.now();

    if (futureDate - options.defaultDate.getTime() > 0) {
      btnStart.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }

    const deltaDays = futureDate - currentDate;
    console.log(deltaDays.toString());
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// const { days, hours, minutes, seconds } = convertMs();

btnStart.addEventListener('click', chooseDateStartOnClick);

function chooseDateStartOnClick() {
  const timerId = setInterval(() => {
    const currentTime = new Date();

    daysEl.textContent = currentTime.getMinutes().toString().padStart(2, '0');
    minsEl.textContent = currentTime.getMinutes().toString().padStart(2, '0');
    secsEl.textContent = currentTime.getSeconds().toString().padStart(2, '0');
    hoursEl.textContent = currentTime.getHours().toString().padStart(2, '0');
  }, 1000);
}

// function addLeadingZero(value) {
//   padStart();
// }
