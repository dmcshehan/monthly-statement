import {
	getEntriesForASpecificMonth,
	toggleCurrentMonth,
} from '../../store/actionCreators/entry.js';

export default () => {
	var toggler = document.querySelector('#month-toggler input');
	toggler.addEventListener('change', function handleTogglerOnChange(e) {
		toggleCurrentMonth(e.target.value);
	});
};
