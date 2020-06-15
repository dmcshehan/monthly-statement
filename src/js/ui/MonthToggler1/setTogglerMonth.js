import moment from 'moment';
import { store } from '../../store/index.js';

export default () => {
	var { currentMonth } = store.getState().entry;

	var toggler = document.querySelector('#month-toggler input');

	if (currentMonth) {
		return (toggler.value = moment(currentMonth).format('YYYY-MM'));
	}

	toggler.value = moment().format('YYYY-MM');
};
