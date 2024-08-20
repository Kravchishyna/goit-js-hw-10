import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    const delay = parseInt(event.target.delay.value);
    const state = event.target.state.value;

    createPromise(delay, state)
        .then(result => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${result}ms`,
                position: 'topRight',
            });
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${error}ms`,
                position: 'topRight',
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}