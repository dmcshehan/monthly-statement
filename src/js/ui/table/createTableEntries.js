import categorizeEntries from './categorizeEntries.js';
import createEntryRow from './createEntryRow.js';

export default (entries) => {
	let expenseRows = '',
		incomeRows = '';

	const { expenseEntries, incomeEntries } = categorizeEntries(entries);

	expenseEntries.forEach((entry) => {
		expenseRows += createEntryRow(entry);
	});

	incomeEntries.forEach((entry) => {
		incomeRows += createEntryRow(entry);
	});

	const expenseTbody = document.querySelector('#expensesTable tbody');
	expenseTbody.innerHTML = expenseRows;

	const incomeTbody = document.querySelector('#incomesTable tbody');
	incomeTbody.innerHTML = incomeRows;
};
