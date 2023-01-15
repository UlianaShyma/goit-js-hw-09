import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  OnBtnSubmitClick(
    Number(delayInput.value),
    Number(stepInput.value),
    Number(amountInput.value)
  );
});

function OnBtnSubmitClick(firstDelay, step, amount) {
  let sumDelay = firstDelay;

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, sumDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    sumDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
