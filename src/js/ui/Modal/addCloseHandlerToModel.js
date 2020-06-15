import closeModel from './closeEntryModel.js';

export default () => {
	const closes = [
		document.querySelector('#entryModel .modal-card-head button.delete'),
		document.querySelector('#entryModel .modal-background'),
	];

	closes.forEach((closeItem) => {
		closeItem.addEventListener('click', closeModel);
	});
};
