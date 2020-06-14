export default () => {
	const addFiel = document.querySelector('#entryModel form .add-field');
	const updateField = document.querySelector('#entryModel form .update-field');

	addFiel.classList.remove('hide');
	updateField.classList.add('hide');
};
