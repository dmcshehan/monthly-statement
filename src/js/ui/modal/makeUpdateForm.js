export default () => {
	const addFiel = document.querySelector('#entryModel form .add-field');
	const updateField = document.querySelector('#entryModel form .update-field');

	addFiel.classList.add('hide');
	updateField.classList.remove('hide');
};
