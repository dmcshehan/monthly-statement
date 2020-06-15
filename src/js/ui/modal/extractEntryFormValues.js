export default () => {
	const allInputs = document.querySelectorAll('#entryModel form input:not([type=submit])');
	const selectElement = document.querySelectorAll('#entryModel form select');

	const valueObj = {};

	[...allInputs, ...selectElement].forEach((element) => {
		const { value, name } = element;
		valueObj[name] = value;
	});

	return valueObj;
};
