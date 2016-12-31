import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import Table, { Column } from '@ubc-farm/table-base';
import moment from 'moment';
import { connect } from 'react-redux';

const ItemInstanceTable = props => (
	<Table
		className="inv-eqpi-instances"
		rowClassName="inv-eqpi-instance"
		headRowClassName="inv-eqpi-keynames"
		{...props}
		keyField="_id"
	>
		<Column field="description">Description</Column>
		<Column
			field="quantity"
			format={(quantity, { unit }) => `${quantity} ${unit}`}
		>
			Amount
		</Column>
		<Column
			field="entryDate"
			format={date => (date ? moment.unix(date).format('Y-MM-DD') : null)}
		>
			Entry Date
		</Column>
	</Table>
);

/* eslint-disable react/no-unused-prop-types */
ItemInstanceTable.propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.any,
		description: PropTypes.string,
		quantity: PropTypes.number,
		unit: PropTypes.string,
		entryDate: PropTypes.number,
	})),
};


export default connect(
	null,
	dispatch => ({
		onRowClick(equip) {
			// TODO open equipment info page
		},
	}),
)(ItemInstanceTable);
