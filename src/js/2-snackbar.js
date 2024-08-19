import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const warningOptions = {
  position: 'topRight',
  messageSize: '22',
  messageColor: '#fafafa',
  icon: false,
  close: false,
  closeOnClick: false,
  timeout: '5000',
  pauseOnHover: true,
  progressBar: false,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
};

const form = document.querySelector('.form');
form.delay.min = 0;
form.step.min = 0;
form.amount.min = 1;

form.addEventListener('submit', onFormSubmitForm);

function onFormSubmitForm(event) {
  event.preventDefault();

  const {
    delay: delayEl,
    step: stepEl,
    amount: amountEl,
  } = event.currentTarget.elements;

  for (let i = 0; i < amountEl.value; i++) {
    const position = i + 1;
    const delay = Number(delayEl.value) + stepEl.value * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        notifyMessage(`✅ Fulfilled promise ${position} in ${delay}ms`, true);
      })
      .catch(({ position, delay }) => {
        notifyMessage(`❌ Rejected promise ${position} in ${delay}ms`, false);
      });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function notifyMessage(message, success) {
  warningOptions.message = message;
  if (success) {
    iziToast.success({
      ...warningOptions,
      message,
      backgroundColor: '#2bbe78',
    });
  } else {
    iziToast.success({
      ...warningOptions,
      message,
      backgroundColor: '#fd4b3f',
    });
  }
}
