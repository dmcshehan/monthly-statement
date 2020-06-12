export default function setFocusOnPrevioslyChangeInput(currentState) {
	const { lastChangedProp } = currentState.entry;

	const tableInputs = document.querySelectorAll('.dashboard table tbody input');
	tableInputs.forEach((tableInput) => {
		if (tableInput.type !== 'date') {
			const valueLength = tableInput.value.length;
			if (lastChangedProp === tableInput.name) {
				tableInput.focus();
				tableInput.setSelectionRange(valueLength, valueLength);
			}
		}
	});
}
