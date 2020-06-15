import { setCurrentlyBeignEdited, deleteEntry } from '../../store/actionCreators/entry.js';

import openEntryModel from '../modal/openEntryModel.js';
import setEntryModelValues from '../modal/setEntryModelValues.js';
import makeUpdateForm from '../modal/makeUpdateForm';

export default () => {
	const actionsButtons = document.querySelectorAll('.dashboard table tbody .action-buttons .button');

	actionsButtons.forEach((actionButton) => {
		actionButton.addEventListener('click', function (e) {
			e.preventDefault();
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
						var rconfirm = confirm(`Do you really want to delete`);
						if (rconfirm) {
							return deleteEntry(entryId);
						}
						break;
					default:
						break;
				}
			}
		});
	});
};
