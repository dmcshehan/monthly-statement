export default function categorizeEntries(entries) {
	const expenses = entries.filter((entry) => entry.type === 'expense');
	const incomes = entries.filter((entry) => entry.type === 'income');

	return {
		expenses,
		incomes,
	};
}
