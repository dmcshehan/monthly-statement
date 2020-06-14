import moment from 'moment';
import { store } from '../../store/index.js';

export default function createEntryRow({ date, reason, amount, _id, currency }) {
	const { currentlyBeignEdited } = store.getState().entry;

	const row =
		currentlyBeignEdited && currentlyBeignEdited._id === _id
			? `<tr>
            <td>
                <input 
                    class="input is-small date" 
                    type="date" 
                    name="date"
                    placeholder="Text input" 
                    value="${moment(currentlyBeignEdited.date).format('YYYY-MM-DD')}"
                />
            </td>
            <td>
                <input 
                    class="input is-small" 
                    type="text" 
                    name="reason"
                    placeholder="Text input" 
                    value="${currentlyBeignEdited.reason}"
                />
            </td>
            <td>
                <div class="select is-small">
                    <select name="currency" required>
                        <option value="LKR">LKR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </td>
            <td>
                <input 
                    class="input is-small amount" 
                    type="text" 
                    name="amount"
                    placeholder="Text input" 
                    value="${currentlyBeignEdited.amount}"
                />
            
            </td>
            <td>
                <div class="buttons action-buttons" id="${_id}">
                    <button class="button is-danger is-small" data-button-type="cancel">
                        Cancel
                    </button>
                    <button class="button is-success is-small" data-button-type="save">
                        Save
                    </button>
                </div>
            </td>
        </tr>`
			: `<tr>
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
}
