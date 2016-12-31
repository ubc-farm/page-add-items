import { createElement } from 'react'; /** @jsx createElement */
import AddButton from './add/AddButton.jsx';

const Header = props => (
	<header className="inv-eqpl-header" {...props}>
		Equipment List
		<AddButton />
	</header>
);

export default Header;
