import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector("input[name='delay']");
const inputStep = document.querySelector("input[name='step']");
const inputAmount = document.querySelector("input[name='amount']");

// console.log(inputAmount);

form.addEventListener('submit', onFormCreatePromises);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

function onFormCreatePromises(evt) {
  evt.preventDefault();
  let delay = Number(inputDelay.value);
  let amount = Number(inputAmount.value);
  let step = Number(inputStep.value);

  for (let position = 1; position <= amount; position += 1) {
    console.log(position);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfield promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Reject promise ${position} in ${delay}ms`);
      });
  }
  console.log(delay, step, amount);
}
