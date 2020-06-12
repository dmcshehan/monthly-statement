import store from '../../store/index.js';
export default function setAddEntryModelValues() {
	const allInputs = document.querySelectorAll('#addEntryModel form input:not([type=submit])');
	const selectElement = document.querySelector('#addEntryModel form select');

	[...allInputs, selectElement].forEach((item) => {
		item.value = store.getState().entry.currentlyBeignAdded[item.name];
	});
}
