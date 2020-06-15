export default (text) => {
	var notificationEl = document.querySelector('#notification');
	var notificationTextEl = document.querySelector('#notification .text');

	notificationTextEl.textContent = text;

	notificationEl.classList.add('is-success');
	notificationEl.classList.remove('hide-transform');

	setTimeout(() => {
		notificationEl.classList.add('hide-transform');
		setTimeout(() => {
			notificationEl.classList.remove('is-success');
			notificationTextEl.textContent = '';
		}, 500);
	}, 1000);
};
