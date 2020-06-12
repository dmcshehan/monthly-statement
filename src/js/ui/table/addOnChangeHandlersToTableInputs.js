import { editCurrentlyBeignEdited } from '../../store/actionCreators/entry.js';

export default function addOnChangeHandlersToTableInputs() {
	const tableInputs = document.querySelectorAll('.dashboard table tbody input');
	tableInputs.forEach((tableInput) => {
		if (tableInput.type == 'date') {
			tableInput.addEventListener('change', function () {
				const prop = this.name,
					value = this.value;
				editCurrentlyBeignEdited(prop, value);
			});
		} else {
			tableInput.addEventListener('keyup', function () {
				const prop = this.name,
					value = this.value;
				editCurrentlyBeignEdited(prop, value);
			});
		}
	});
}
