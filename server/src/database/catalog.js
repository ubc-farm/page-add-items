import * as Joi from 'joi';
import knex from '../knexinit.js';

const columns = [
	'class', 'product',
	'unit', 'valuePerUnit', 'salvageValue',
	'lifeSpan', 'barcode', 'supplier', 'sku',
];

const catalogQuery = knex('inventory')
	.distinct('product')
	.whereNotNull('product');

const response = {
	payload: Joi.array().single().items(Joi.object().keys({
		class: Joi.any().only('Variable', 'Fixed'),
		product: Joi.string(),
		description: Joi.string(),
		unit: Joi.string().only('kg', 'each'),
		lifeSpan: Joi.string().regex(
			/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/,
			'ISO 8601 Duration',
		),
		salvageValue: Joi.number().integer().allow(null),
		barcode: Joi.string(),
		supplier: Joi.string().allow(null),
		sku: Joi.string().allow(null),
	})),
};

const getCatalog = {
	method: 'GET',
	path: '/catalog/{name?}',
	handler({ params: { name } }, reply) {
		let query;
		if (name) {
			query = catalogQuery.clone()
				.where('product', name)
				.first(...columns);
		} else {
			query = catalogQuery.clone().select(...columns);
		}

		return reply(query).type('application/json');
	},
	config: { response },
};

const searchCatalog = {
	method: 'POST',
	path: '/catalog',
	handler({ payload: name }, reply) {
		const item = catalogQuery.clone().where('product', name).first(...columns);
		return reply(item).type('application/json');
	},
	config: {
		response,
		validate: { payload: Joi.string() },
	},
};

export default [getCatalog, searchCatalog];
