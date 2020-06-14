import openEntryModel from '../Model/openEntryModel';

export default () => {
	document.querySelector('#add-entry-button').addEventListener('click', openEntryModel);
};
