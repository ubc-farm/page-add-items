import { createStore, applyMiddleware } from 'redux';
import PouchMiddleware from 'pouch-redux-middleware';

import selected from './selected.js';
import equipmentDB, {
	INSERT_EQUIPMENT, deleteEquipment, editEquipment,
} from './equipmentDB.js';

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

	return createStore(
		mergedReducer,
		applyMiddleware(pouchMiddleware),
	);
}
