import closeModel from './closeModel.js';

export default function addCloseHandlerToModel() {
	document
		.querySelector('#addEntryModel .modal-card-head button.delete')
		.addEventListener('click', closeModel);
	document.querySelector('#addEntryModel .modal-background').addEventListener('click', closeModel);
}
