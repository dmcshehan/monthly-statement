import resetEntryModalValues from './resetEntryModalValues';
import makeAddForm from './makeAddForm';
export default () => {
	document.querySelector('#entryModel').classList.remove('is-active');
	resetEntryModalValues();
	makeAddForm();
};
