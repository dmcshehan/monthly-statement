import { addEntry, updateEntry } from '../../store/actionCreators/entry';
import extractEntryFormValues from './extractEntryFormValues';
import { store } from '../../store';

import { clearCurrentlyBeignEdited } from '../../store/actionCreators/entry';
import closeEntryModal from './closeEntryModel';

export default () => {
	document.querySelector('#entryModel form').addEventListener('submit', function (e) {
		e.preventDefault();
		const { currentlyBeignEdited } = store.getState().entry;

		if (currentlyBeignEdited) {
			return updateEntry({ ...currentlyBeignEdited, ...extractEntryFormValues() });
		}

		addEntry(extractEntryFormValues());
	});

	document.querySelector('#cancelButton').addEventListener('click', function cancelButton() {
		closeEntryModal();
		clearCurrentlyBeignEdited();
	});
};
