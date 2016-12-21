import * as Joi from 'joi';
import Item from './Item.js';

/**
 * Represents a paticular instance of an item, with additional properties
 * such as quantity and location.
 */
export default Item.keys({
	quantity: Joi.number(),
	unit: Joi.string().only('kg', 'each'),
	entryDate: Joi.date(),
	location: Joi.string(),
});