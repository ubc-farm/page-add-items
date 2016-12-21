import { interactive } from 'document-promises';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import db from './pouchdb.js';
import configureStore from './redux/index.js';
import TableContainer from './table/TableContainer.jsx';
import watchForDownloads from './table/exportCSV.js';

const store = configureStore(db);

interactive.then(() => render(
	<Provider store={store}>
		<TableContainer />
	</Provider>,
	document.getElementById('reactRoot'),
));

watchForDownloads(store);
