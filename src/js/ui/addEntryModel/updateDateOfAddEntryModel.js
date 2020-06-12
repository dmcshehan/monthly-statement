import moment from 'moment';

export default function updateDateOfAddEntryModel() {
	const dateInput = document.querySelector('#addEntryModel form .field .control #entry-date');
	dateInput.value = moment().format('YYYY-MM-DD');
}
