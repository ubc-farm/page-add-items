import * as Joi from 'joi';
import { snakeCase } from 'lodash-es';
import Item from '../schema/Item.js';
import itemAsset from '../schema/itemURI.js';
import db from '../pouchdb.js';

const columns = [
	'class', 'product',
	'unit', 'valuePerUnit', 'salvageValue',
	'lifeSpan', 'barcode', 'supplier', 'sku',
];

const response = {
	schema: Joi.array().single().items(Item),
};

export const getCatalog = {
	method: 'GET',
	path: '/catalog',
	handler({ params: { name } }, reply) {
		const query = Promise.reject(); // TODO

		return reply(query).type('application/json');
	},
	config: { response },
};

export const getCatalogItem = {
	method: 'GET',
	path: '/catalog/{name}',
	handler({ params: { name } }, reply) {
		const prefix = itemAsset({ product: snakeCase(name) });

		return reply(db.find({
			selector: {
				$gte: prefix,
				$le: `${prefix}\uffff`,
			},
			fields: columns,
			limit: 1,
		})).type('application/json');
	},
	config: { response },
};
