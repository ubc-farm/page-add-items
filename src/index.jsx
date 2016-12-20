import { interactive } from 'document-promises';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import db from './pouchdb.js';
import configureStore from './redux/index.js';
import TableContainer from './table/TableContainer.jsx';

interactive.then(() => render(
	<Provider store={configureStore(db)}>
		<TableContainer />
	</Provider>,
	document.getElementById('reactRoot'),
));
