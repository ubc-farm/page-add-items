import { createStore, applyMiddleware, compose } from 'redux';
import PouchMiddleware from 'pouch-redux-middleware';

import selected from './selected.js';
import equipmentDB, {
	INSERT_EQUIPMENT, deleteEquipment, editEquipment,
} from './equipmentDB.js';
import metadata from './metadata.js';

// Custom merged reducer to pass states to other reducers
function mergedReducer(state = {}, action) {
	let hasChanged = false;
	const nextState = {};

	const lastSelected = state.selected;
	const nextSelected = selected(lastSelected, action);
	nextState.selected = nextSelected;
	hasChanged = hasChanged || nextSelected !== lastSelected;

	const lastDatabase = state.equipmentDB;
	const nextDatabase = equipmentDB(lastDatabase, action, nextSelected);
	nextState.equipmentDB = nextDatabase;
	hasChanged = hasChanged || nextDatabase !== lastDatabase;

	const lastMeta = state.metadata;
	const nextMeta = metadata(lastMeta, action, nextDatabase);
	nextState.metadata = nextMeta;
	hasChanged = hasChanged || nextMeta !== lastMeta;

	return hasChanged ? nextState : state;
}

export default function configureStore(db) {
	const pouchMiddleware = PouchMiddleware({
		path: '/equipmentDB',
		db,
		actions: {
			insert: doc => ({ type: INSERT_EQUIPMENT, payload: doc }),
			remove: doc => deleteEquipment(doc._id),
			update: doc => editEquipment(doc, doc._id),
		},
	});

	const composeEnhancers =
		(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
		|| compose;
	return createStore(
		mergedReducer,
		composeEnhancers(applyMiddleware(pouchMiddleware)),
	);
}
