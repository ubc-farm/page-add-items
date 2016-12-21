import * as Joi from 'joi';
import Equipment from '../schema/Equipment.js';
import transformInputToRow from '../schema/transform.js';
import db from '../pouchdb.js';

const payload = Joi.array().single().items(Equipment);

export const getInventory = {
	method: 'GET',
	path: '/inventory/{id?}',
	handler({ params: { id } }, reply) {
		return reply(id ? db.get(id) : db.allDocs()).type('application/json');
	},
	config: { response: { payload } },
};

export const setInventory = {
	method: ['POST', 'PUT', 'PATCH'],
	path: '/inventory',
	handler({ payload: input }, reply) {
		const newRow = transformInputToRow(input);
		return reply(db.put(newRow)).type('application/json');
	},
	config: {
		response: { payload: Joi.string() },
		validate: { payload },
	},
};
