import { thousandsSeparators } from 'currency-thousand-separator';

export default (totalExpenses, totalIncomes) => {
	var exepnsesEl = document.querySelector('#total-expenses .amount');
	var incomesEl = document.querySelector('#total-incomes .amount');

	exepnsesEl.textContent = thousandsSeparators(totalExpenses);
	incomesEl.textContent = thousandsSeparators(totalIncomes);
};
