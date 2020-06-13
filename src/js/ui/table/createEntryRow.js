import moment from 'moment';
import { store } from '../../store/index.js';

export default function createEntryRow({ date, reason, amount, _id }) {
	const { currentlyBeignEdited } = store.getState().entry;

	const row =
		currentlyBeignEdited && currentlyBeignEdited._id === _id
			? `<tr>
            <td>
                <input 
                    class="input is-small" 
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
                <input 
                    class="input is-small" 
                    type="text" 
                    name="amount"
                    placeholder="Text input" 
                    value="${currentlyBeignEdited.amount}"
                />
            
            </td>
            <td>
                <div class="buttons action-buttons" id="${_id}">
                    <button class="button is-danger is-small" data-button-type="cancel">
                        <span class="icon">
                            <i class="fas fa-times"></i>
                        </span>
                    </button>
                    <button class="button is-success is-small" data-button-type="save">
                        <span class="icon">
                            <i class="far fa-save"></i>
                        </span>
                    </button>
                </div>
            </td>
        </tr>`
			: `<tr>
            <td>${moment(date).format('YYYY-MM-DD')}</td>
            <td>${reason}</td>
            <td>${amount}</td>
            <td>
                <div class="buttons action-buttons" id="${_id}">
                    <button class="button is-warning is-small" data-button-type="edit">
                        <span class="icon">
                            <i class="far fa-edit"></i>
                        </span>
                    </button>
                    <button class="button is-danger is-small" data-button-type="delete">
                        <span class="icon">
                            <i class="far fa-trash-alt"></i>
                        </span>
                    </button>
                </div>
            </td>
        </tr>`;

	return row;
}
