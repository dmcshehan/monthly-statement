import store from '../../store/index.js';

import { CHANGE_CURRENTLY_BEIGN_EDITED } from '../../store/actiontypes/entry.js';

export default function addOnChangeHandlersToTableInputs() {
	const tableInputs = document.querySelectorAll('.dashboard table tbody input');
	tableInputs.forEach((tableInput) => {
		if (tableInput.type == 'date') {
			tableInput.addEventListener('change', function () {
				console.log(this.value);

				store.dispatch({
					type: CHANGE_CURRENTLY_BEIGN_EDITED,
					payload: {
						prop: this.name,
						value: this.value,
					},
				});
			});
		} else {
			tableInput.addEventListener('keyup', function () {
				console.log(this.value);

				store.dispatch({
					type: CHANGE_CURRENTLY_BEIGN_EDITED,
					payload: {
						prop: this.name,
						value: this.value,
					},
				});
			});
		}
	});
}
