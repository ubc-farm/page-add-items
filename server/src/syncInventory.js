import * as Joi from 'joi';
import { wrap } from 'boom';
import inputToRow from '../../../src/table/inputToRow.js';
import knex from '../knexinit.js';

const payload = Joi.array().single().items(Joi.object().keys({
	class: Joi.any().only('Variable', 'Fixed'),
	product: Joi.string(),
	description: Joi.string(),
	quantity: Joi.number(),
	unit: Joi.string().only('kg', 'each'),
	entryDate: Joi.date(),
	lifeSpan: Joi.string().regex(
		/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/,
		'ISO 8601 Duration',
	),
	location: Joi.string(),
	salvageValue: Joi.number().integer().allow(null),
	barcode: Joi.string(),
	supplier: Joi.string().allow(null),
	sku: Joi.string().allow(null),
}));

const getInventory = {
	method: 'GET',
	path: '/inventory/{id?}',
	async handler({ params: { id } }, reply) {
		try {
			const inventoryList = id
				? await knex('inventory').where('id', id).first()
				: await knex('inventory').select();

			return reply(inventoryList).type('application/json');
		} catch (err) {
			return reply(wrap(err));
		}
	},
	config: { response: { payload } },
};

const addInventory = {
	method: 'POST',
	path: '/inventory',
	async handler({ payload: input }, reply) {
		try {
			const newRow = inputToRow(input);
			Reflect.deleteProperty(newRow, 'id');

			return reply(knex('inventory').insert(newRow, 'id'));
		} catch (err) {
			return reply(wrap(err));
		}
	},
	config: {
		response: { payload: Joi.string() },
		validate: { payload },
	},
};

const setInventory = {
	method: ['PUT', 'PATCH'],
	path: '/inventory',
	async handler({ payload: input }, reply) {
		try {
			const replacementRow = inputToRow(input);
			replacementRow.id = input.id;

			return reply(knex('inventory').update(replacementRow, 'id'));
		} catch (err) {
			return reply(wrap(err));
		}
	},
	config: {
		response: { payload: Joi.string() },
		validate: { payload },
	},
};

export default [getInventory, addInventory, setInventory];
