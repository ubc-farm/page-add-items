import { createAction, handleActions } from 'redux-actions';

const OPEN_MODAL = 'inventory/addEquipmentModal/OPEN_MODAL';
const CLOSE_MODAL = 'inventory/addEquipmentModal/CLOSE_MODAL';

// Reducer
export default handleActions({
	[OPEN_MODAL]: () => ({ open: true }),
	[CLOSE_MODAL]: () => ({ open: false }),
}, { open: false });

export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
