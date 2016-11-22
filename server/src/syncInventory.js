import { difference, isEqual } from 'lodash';
import * as Joi from 'joi';
import { wrap } from 'boom';
import inputToRow from './../../src/table/inputToRow.js';
import knex from './knexinit.js';

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

const addNewItems = list => Promise.all(list.map(
	item => knex('inventory').insert(inputToRow(item)),
));

const removeOldItems = ids => knex('inventory').whereIn('id', [...ids]).delete();

const updateItems = list => Promise.all(list.map(
	async (item) => {
		const newItem = inputToRow(item);
		const oldItem = await knex('inventory').where('id', item.id).first();
		if (!isEqual(newItem, oldItem)) await knex('inventory').update(newItem);
	},
));

const syncInventory = {
	method: ['PUT', 'PATCH'],
	path: '/inventory',
	async handler({ payload: input }, reply) {
		try {
			const clientList = input.map(i => i.id);
			const idList = (await knex('inventory').select('id')).map(i => i.id);

			const added = new Set(difference(clientList, idList));
			const removed = new Set(difference(idList, clientList));
			const modified = new Set(
				idList.filter(id => !added.has(id) && !removed.has(id)),
			);

			const toAdd = [];
			const toModify = [];
			input.forEach((i) => {
				if (added.has(i.id)) toAdd.push(i);
				else if (modified.has(i.id)) toModify.push(i);
			});

			await Promise.all([
				addNewItems(toAdd),
				removeOldItems(removed),
				updateItems(toModify),
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
