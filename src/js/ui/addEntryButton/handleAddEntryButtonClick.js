export default function handleAddEntryButtonClick() {
	document.querySelector('#add-entry-button').addEventListener('click', function showModel() {
		document.querySelector('#addEntryModel').classList.add('is-active');
	});
}
