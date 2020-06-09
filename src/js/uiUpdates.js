import categorizeEntries from './helpers/categorizeEntries.js';
import createEntryRow from './helpers/ui/createEntryRow.js';

function createTableEntries(entries) {
	const categorizedEntries = categorizeEntries(entries);
	let expenseRows = '';
	entries.forEach((entry) => {
		expenseRows += createEntryRow(entry);
	});

	console.log(expenseRows);
}

export { createTableEntries };
