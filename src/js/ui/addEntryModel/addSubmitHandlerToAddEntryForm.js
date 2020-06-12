import { addEntry } from '../../store/actionCreators/entry.js';

export default function addSubmitHandlerToAddEntryForm() {
	document.querySelector('#addEntryModel form').addEventListener('submit', function (e) {
		e.preventDefault();
		addEntry();
	});
}
