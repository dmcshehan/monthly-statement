import moment from 'moment';

export default function createEntryRow(entry) {
	const row = `
    <tr>
        <td>${moment(entry.date).format('DD-MM-YYYY')}</td>
    </tr>
    `;

	return row;
}
