import { editCurrentlyBeignAdded } from '../../store/actionCreators/entry.js';

export default function addOnChangeHandlersToModelFormInputs() {
	const allInputs = document.querySelectorAll('#addEntryModel form input:not([type=submit])');
	const selectElement = document.querySelectorAll('#addEntryModel form select');

	[...allInputs, ...selectElement].forEach((element) => {
		if (element.type === 'date' || element.type === 'select-one') {
			element.addEventListener('change', function (e) {
				const key = e.target.name,
					value = e.target.value;
				editCurrentlyBeignAdded(key, value);
			});
		} else {
			element.addEventListener('keyup', function (e) {
				const key = e.target.name,
					value = e.target.value;
				editCurrentlyBeignAdded(key, value);
			});
		}
	});
}
