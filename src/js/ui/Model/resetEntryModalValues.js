import moment from 'moment';
export default () => {
	const allInputs = document.querySelectorAll('#entryModel form input:not([type=submit])');
	const selectElement = document.querySelectorAll('#entryModel form select');

	[...allInputs, ...selectElement].forEach((element) => {
		const { name } = element;

		switch (name) {
			case 'date':
				element.value = moment().format('YYYY-MM-DD');
				break;
			case 'amount':
				element.value = '';
				break;
			case 'reason':
				element.value = '';
				break;
			case 'type':
				element.value = 'expense';
				break;
			case 'currency':
				element.value = 'LKR';
				break;
			default:
				break;
		}
	});
};
