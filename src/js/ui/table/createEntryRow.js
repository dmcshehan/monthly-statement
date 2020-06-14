import moment from 'moment';
import { store } from '../../store/index.js';

export default ({ date, reason, amount, _id, currency }) => {
	const { currentlyBeignEdited } = store.getState().entry;

	const row = `<tr>
            <td>${moment(date).format('YY-MM-DD')}</td>
            <td>${reason}</td>
            <td>${currency}</td>
            <td>${amount}</td>
            <td>
                <div class="buttons action-buttons" id="${_id}">
                    <button class="button is-warning is-small" data-button-type="edit">
                        Edit  
                    </button>
                    <button class="button is-danger is-small" data-button-type="delete">
                        Delete
                    </button>
                </div>
            </td>
        </tr>`;

	return row;
};
