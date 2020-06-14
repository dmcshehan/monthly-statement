import { getEntriesForASpecificMonth } from '../../store/actionCreators/entry.js';

export default function handleMonthTogglerEvents() {
	var toggler = document.querySelector('#month-toggler input');
	toggler.addEventListener('change', function handleTogglerOnChange(e) {
		getEntriesForASpecificMonth(e.target.value);
	});
}
