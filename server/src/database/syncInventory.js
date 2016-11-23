import { differenceBy, intersectionBy, isEqual } from 'lodash';
import * as Joi from 'joi';
import { wrap } from 'boom';
import inputToRow from '../../../src/table/inputToRow.js';
import knex from '../connection.js';

const payload = Joi.array().items(Joi.object().keys({
	id: Joi.string(),
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

const getId = item => item.id;

function inputToDataRow(item) {
	const dataRow = inputToRow(item);
	dataRow.id = item.id;
	return dataRow;
}

const addNewItems = list => Promise.all(list.map(
	item => knex('inventory').insert(inputToDataRow(item)),
));

const removeOldItems = ids => knex('inventory')
	.whereIn('id', ids.map(getId))
	.delete();

const updateItems = list => Promise.all(list.map(
	async (item) => {
		const newItem = inputToDataRow(item);
		const oldItem = await knex('inventory').where('id', item.id).first();
		if (!isEqual(newItem, oldItem)) await knex('inventory').update(newItem);
	},
));

const syncInventory = {
	method: ['POST', 'PUT', 'PATCH'],
	path: '/inventory/sync',
	async handler({ payload: input }, reply) {
		try {
			const idList = await knex('inventory').select('id');

			const added = differenceBy(input, idList, getId);
			const removed = differenceBy(idList, input, getId);
			const modified = intersectionBy(idList, input, getId);

			await Promise.all([
				addNewItems(added),
				removeOldItems(removed),
				updateItems(modified),
			]);
		} catch (err) {
			return reply(wrap(err));
		}

		return reply().code(204);
	},
	config: {
		response: { payload: Joi.string() },
		validate: { payload },
	},
};

export default [syncInventory];
