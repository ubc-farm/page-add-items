import { createElement } from 'react'; /** @jsx createElement */
import Header from './Header.jsx';
import List from './List.jsx';

export default () => (
	<div className="inv-eqpl-container">
		<Header />
		<List />
	</div>
);
