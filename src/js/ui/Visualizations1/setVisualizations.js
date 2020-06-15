import categorizeEntries from '../Table/categorizeEntries.js';

import setTotalAmounts from './setTotalamounts.js';

export default (entries) => {
	const { expenseEntries, incomeEntries } = categorizeEntries(entries);

	var totalExpenses = expenseEntries.reduce((accumilator, currentValue) => {
		return accumilator + +currentValue.amount;
	}, 0);

	var totalIncomes = incomeEntries.reduce((accumilator, currentValue) => {
		return accumilator + +currentValue.amount;
	}, 0);

	setTotalAmounts(totalExpenses, totalIncomes);
};
