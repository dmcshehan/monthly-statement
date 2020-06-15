import axios from 'axios';
import closeModel from '../ui/modal/closeEntryModel';
import resetEntryModelValues from '../ui/modal/resetEntryModalValues';
import createErrorNotification from '../ui/notifications/createErrorNotification';

const instance = axios.create({
	//baseURL: 'http://localhost:5000',
	baseURL: 'https://monthlystatement.herokuapp.com/',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		closeModel();
		resetEntryModelValues();
		createErrorNotification(error.message);
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default instance;
