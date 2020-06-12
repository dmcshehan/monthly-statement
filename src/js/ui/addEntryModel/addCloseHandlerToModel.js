export default function addCloseHandlerToModel() {
	function closeModel() {
		document.querySelector('#addEntryModel').classList.remove('is-active');
	}
	document
		.querySelector('#addEntryModel .modal-card-head button.delete')
		.addEventListener('click', closeModel);
	document.querySelector('#addEntryModel .modal-background').addEventListener('click', closeModel);
}
