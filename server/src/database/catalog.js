import * as Joi from 'joi';
import { snakeCase } from 'lodash';
import Item from '../../../src/schema/Item.js';
import itemAsset from '../../../src/schema/itemURI.js';
import db from '../../../src/pouchdb.js';

const columns = [
	'class', 'product',
	'unit', 'valuePerUnit', 'salvageValue',
	'lifeSpan', 'barcode', 'supplier', 'sku',
];

const response = {
	payload: Joi.array().single().items(Item),
};

export const getCatalog = {
	method: 'GET',
	path: '/catalog/{name?}',
	handler({ params: { name } }, reply) {
		let query;
		if (name) {
			const prefix = itemAsset({ product: snakeCase(name) });
			query = db.find({
				selector: {
					$gte: prefix,
					$le: `${prefix}\uffff`,
				},
				fields: columns,
				limit: 1,
			});
		} else {
			query = Promise.resolve(); // TODO
		}

		return reply(query).type('application/json');
	},
	config: { response },
};
