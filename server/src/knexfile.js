module.exports = {
	development: {
		client: 'sqlite',
		connection: { filename: './inventoryDB.sqlite' },
		debug: true,
	},
	production: {

	},
	test: {
		client: 'sqlite',
		connection: { filename: ':memory:' },
	},
};
