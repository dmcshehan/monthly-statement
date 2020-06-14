import {
	setCurrentlyBeignEdited,
	clearCurrentlyBeignEdited,
	deleteEntry,
	updateEntry,
} from '../../store/actionCreators/entry.js';

import openEntryModel from '../Model/openEntryModel.js';
import setEntryModelValues from '../Model/setEntryModelValues.js';
import makeUpdateForm from '../Model/makeUpdateForm';

export default () => {
	const actionsButtons = document.querySelectorAll('.dashboard table tbody .action-buttons .button');

	actionsButtons.forEach((actionButton) => {
		actionButton.addEventListener('click', function () {
			const entryId = this.parentNode.getAttribute('id');
			const { buttonType } = this.dataset;

			if (entryId) {
				switch (buttonType) {
					case 'edit':
						makeUpdateForm();
						setCurrentlyBeignEdited(entryId);
						setEntryModelValues();
						openEntryModel();
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
};
