const SET = 'inventory/selected/SET';

// Reducer
export default function selectedReducer(state = null, action = {}) {
	switch (action.type) {
		case SET:	return action.payload === state
			? null
			: action.payload;

		default: return state;
	}
}


// Selectors
export const getSelected = store => store.selected;
export const isSelected = (store, id) => getSelected(store) === id;
export const anythingSelected = store => getSelected(store) !== null;

// Actions
export const setSelected = row => ({ type: SET, payload: row });
