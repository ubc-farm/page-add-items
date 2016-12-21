import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteSelectedEquipment } from '../redux/equipmentDB.js';
import { anythingSelected } from '../redux/selected.js';
import { openEditor, download } from '../redux/metadata.js';
import exportCSV from './exportCSV.js';

const Toolbar = ({ addAction, delAction, exportAction, anythingSelected }) => (
	<header className="inventory-Toolbar">
		<button onClick={addAction}>
			Add Inventory Item
		</button>
		<button
			onClick={delAction}
			disabled={!anythingSelected}
		>
			Delete Item
		</button>
		<button
			onClick={exportAction}
		>
			Export CSV
		</button>
	</header>
);

Toolbar.propTypes = {
	addAction: PropTypes.func,
	delAction: PropTypes.func,
	exportAction: PropTypes.func,
	anythingSelected: PropTypes.bool,
};

export default connect(
	state => ({
		anySelected: anythingSelected(state),
	}),
	dispatch => bindActionCreators({
		addAction: openEditor,
		delAction: deleteSelectedEquipment,
		exportAction: download,
	}, dispatch),
)(Toolbar);
