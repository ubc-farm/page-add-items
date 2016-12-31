import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openModal } from '../../redux/addEquipmentModal.js';

const AddButton = props => (
	<button className="inv-eqpl-addbutton" {...props}>
		+ Equipment
	</button>
);

export default connect(
	null,
	dispatch => bindActionCreators({
		onClick: openModal,
	}, dispatch),
)(AddButton);
