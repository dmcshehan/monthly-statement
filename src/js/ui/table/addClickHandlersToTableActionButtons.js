import {
	setCurrentlyBeignEdited,
	clearCurrentlyBeignEdited,
	deleteEntry,
} from '../../store/actionCreators/entry.js';

export default function addClickHandlersToTableActionButtons() {
	const actionsButtons = document.querySelectorAll('.dashboard table tbody .action-buttons .button');

	actionsButtons.forEach((actionButton) => {
		actionButton.addEventListener('click', function () {
			const entryId = this.parentNode.getAttribute('id');
			const { buttonType } = this.dataset;

			if (entryId) {
				switch (buttonType) {
					case 'edit':
						setCurrentlyBeignEdited(entryId);
						break;
					case 'cancel':
						clearCurrentlyBeignEdited();
						break;
					case 'delete':
						deleteEntry(entryId);
						break;
					default:
						break;
				}
			}
		});
	});
}
