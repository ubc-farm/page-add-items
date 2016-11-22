exports.up = knex => knex.schema
	.createTable('inventory', (table) => {
		table.string('id').increments();
		table.enum('class', ['Variable', 'Fixed']);
		table.string('product').index();
		table.text('description');
		table.number('quantity');
		table.string('unit');
		table.number('valuePerUnit');
		table.date('entryDate');
		table.string('lifeSpan');
		table.string('location').index();
		table.number('salvageValue');
		table.string('barcode');
		table.string('supplier').index();
		table.string('sku');
	});

exports.down = knex => knex.schema
	.dropTable('fields');
