export default function categorizeEntries(entries) {
	const expenseEntries = entries.filter((entry) => entry.type === 'expense');
	const incomeEntries = entries.filter((entry) => entry.type === 'income');

	return {
		expenseEntries,
		incomeEntries,
	};
}
