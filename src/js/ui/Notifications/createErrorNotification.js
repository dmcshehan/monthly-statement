export default (error) => {
	var notificationEl = document.querySelector('#notification');
	var notificationTextEl = document.querySelector('#notification .text');

	notificationTextEl.textContent = error;

	notificationEl.classList.add('is-danger');
	notificationEl.classList.remove('hide-transform');

	setTimeout(() => {
		notificationEl.classList.add('hide-transform');
		setTimeout(() => {
			notificationEl.classList.remove('is-danger');
			notificationTextEl.textContent = '';
		}, 1000);
	}, 3000);
};
