'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var babyparse = require('babyparse');
var Joi = require('joi');

var name = "ubc-farm-page-add-items";
var version = "0.0.0";

const item = Joi.object().keys({
	class: Joi.any().only('Variable', 'Fixed'),
	product: Joi.string(),
	description: Joi.string(),
	quantity: Joi.number(),
	unit: Joi.string().only('kg', 'each'),
	entryDate: Joi.date(),
	lifeSpan: Joi.string().regex(/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/, 'ISO 8601 Duration'),
	location: Joi.string(),
	salvageValue: Joi.number().integer().allow(null),
	barcode: Joi.string(),
	supplier: Joi.string().allow(null),
	sku: Joi.string().allow(null)
});

var schema = Joi.array().items(item).single();

const fields = ['id', 'class', 'product', 'description', 'quantity', 'unit', 'valuePerUnit', 'entryDate', 'lifeSpan', 'location', 'salvageValue', 'barcode', 'supplier', 'sku'];

var api = [{
	method: 'GET',
	path: '/table/headers',
	handler(request, reply) {
		const response = request.query.reverse != null ? fields.reduce((obj, field, i) => {
			obj[field] = i;return obj;
		}, {}) : fields.reduce((obj, field, i) => {
			obj[i] = field;return obj;
		}, {});

		return reply(response).type('application/json');
	}
}, {
	method: 'GET',
	path: '/json',
	handler(request, reply) {},
	config: {
		response: { schema }
	}
}, {
	method: 'GET',
	path: '/table',
	handler(request, reply) {
		// TODO get data
		return reply(babyparse.unparse(data, { newline: '\n' })).type('text/csv');
	}
}, {
	method: 'POST',
	path: '/table',
	handler(request, reply) {
		// TODO parse patch to update database
	},
	config: {
		validate: {
			payload: schema
		}
	}
}];

var views = [{
	method: 'GET',
	path: '/{param}',
	handler: { directory: { path: 'server/public' } }
}];

function register(server, opts, next) {
	server.route(api);
	server.route(views);
	next();
}

register.attributes = { name, version };

exports.register = register;
//# sourceMappingURL=out.js.map
