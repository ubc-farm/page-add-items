import * as Joi from 'joi';

const duration = Joi.string().regex(
	/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/,
	'ISO 8601 Duration',
);

const id = Joi.string().regex(/^item\/[^\/]+\/\w+$/, 'Item docURI ID');

/**
 * Represents a type of item in the catalog
 */
export default Joi.object({
	_id: id,
	class: Joi.any().only('Variable', 'Fixed'),
	product: Joi.string(),
	description: Joi.string(),
	unit: Joi.string().only('kg', 'each'),
	lifeSpan: duration,
	salvageValue: Joi.number().integer().allow(null),
	barcode: Joi.string(),
	supplier: Joi.string().allow(null),
	sku: Joi.string().allow(null),
});
