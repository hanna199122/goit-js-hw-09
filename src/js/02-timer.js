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
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', chooseDateStartOnClick);

function chooseDateStartOnClick() {
  const timerId = setInterval(() => {
    let countdown = null;

    const delta = fp.selectedDates[0].getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(delta);
    const currentTime = new Date();

    daysEl.textContent = `${days}`;
    minsEl.textContent = `${minutes}`;
    secsEl.textContent = `${seconds}`;
    hoursEl.textContent = `${hours}`;

    countdown = `${days}:${hours}:${minutes}:${seconds}`;
    console.log(countdown);

    if (countdown === 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
