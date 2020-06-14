import { store } from '../../store/index.js';
import moment from 'moment';

export default () => {
	const { currentlyBeignEdited } = store.getState().entry;
	const allInputs = document.querySelectorAll('#entryModel form input:not([type=submit])');
	const selectElement = document.querySelectorAll('#entryModel form select');

	[...allInputs, ...selectElement].forEach((item) => {
		if (item.type == 'date') {
			item.value = moment(currentlyBeignEdited.date).format('YYYY-MM-DD');
		} else {
			item.value = currentlyBeignEdited[item.name];
		}
	});
};
