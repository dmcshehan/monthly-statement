import categorizeEntries from './helpers/categorizeEntries.js';
import createEntryRow from './helpers/ui/createEntryRow.js';

function createTableEntries(currentState) {
	const { entries } = currentState.entry;

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
}

export { createTableEntries };
