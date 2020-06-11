import store from './store/index.js';
import {
	SET_CURRENTLY_BEIGN_EDITED,
	CHANGE_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
} from './store/actiontypes/entry.js';

function addClickHandlersToTableActionButtons() {
	const actionsButtons = document.querySelectorAll('.dashboard table tbody .action-buttons .button');

	actionsButtons.forEach((actionButton) => {
		actionButton.addEventListener('click', function () {
			const entryId = this.parentNode.getAttribute('id');
			const { buttonType } = this.dataset;

			if (entryId) {
				switch (buttonType) {
					case 'edit':
						return store.dispatch({
							type: SET_CURRENTLY_BEIGN_EDITED,
							payload: {
								entryId,
							},
						});
						break;

					case 'cancel':
						store.dispatch({
							type: CLEAR_CURRENTLY_BEIGN_EDITED,
						});
						break;

					default:
						break;
				}
			}

			console.log(entryId, buttonType);
		});
	});
}

function addOnChangeHandlersToTableInputs() {
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

function setFocusOnPrevioslyChangeInput(currentState) {
	const { lastChangedProp } = currentState.entry;

	const tableInputs = document.querySelectorAll('.dashboard table tbody input');
	tableInputs.forEach((tableInput) => {
		if (tableInput.type !== 'date') {
			const valueLength = tableInput.value.length;
			if (lastChangedProp === tableInput.name) {
				tableInput.focus();
				tableInput.setSelectionRange(valueLength, valueLength);
			}
		}
	});
}

export {
	addClickHandlersToTableActionButtons,
	addOnChangeHandlersToTableInputs,
	setFocusOnPrevioslyChangeInput,
};
