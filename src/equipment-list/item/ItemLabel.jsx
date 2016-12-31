import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

const ItemLabel = ({ onClick, title, count, open }) => (
	<header className="inv-eqpi-label" onClick={onClick}>
		{ title }
		<span className="inv-eqpi-count">
			{ `(${count})` }
		</span>

		<span
			className={cx('inv-eqpi-openicon', { 'inv-eqpi-openicon--opened': open })}
		/>
	</header>
);

ItemLabel.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.node,
	count: PropTypes.number,
	open: PropTypes.bool,
};

export default ItemLabel;
