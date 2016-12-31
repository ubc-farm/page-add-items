import { createElement, PropTypes, PureComponent } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';
import { getItemInstances } from '../../redux/equipmentDB.js';
import ItemInstanceTable from './ItemInstanceTable.jsx';
import ItemLabel from './ItemLabel.jsx';
/** @jsx createElement */

class Item extends PureComponent {
	constructor(props) {
		super(props);

		this.state = { open: false };
		this.toggleOpen = () => this.setState({ open: !this.state.open });
	}

	render() {
		const { state: { open }, props: { title, tableData } } = this;

		return (
			<li className="inv-eqpi-container">
				<ItemLabel
					open={open}
					title={startCase(title)}
					count={tableData.length}
					onClick={this.toggleOpen}
				/>
				{open
					? <ItemInstanceTable tableData={tableData} />
					: null}
			</li>
		);
	}
}

Item.propTypes = {
	title: PropTypes.node.isRequired,
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default connect(
	(state, { product }) => ({
		title: startCase(product),
		tableData: getItemInstances(state, product),
	}),
)(Item);
