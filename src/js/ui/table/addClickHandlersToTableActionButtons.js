import store from '../../store/index.js';
import {
	SET_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
} from '../../store/actiontypes/entry.js';

export default function addClickHandlersToTableActionButtons() {
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
		});
	});
}
