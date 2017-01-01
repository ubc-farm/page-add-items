import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { getItems } from '../redux/equipmentDB.js';
import Item from './item/Item.jsx';

const List = ({ products }) => (
	<ul className="inv-eqpl-list">
		{products.map(product => <Item product={product} />)}
	</ul>
);

/* eslint-disable react/no-unused-prop-types */
List.propTypes = {
	products: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default connect(
	state => ({
		products: Array.from(getItems(state)),
	}),
)(List);
