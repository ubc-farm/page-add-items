export default [
	{
		method: 'GET',
		path: '/{param?}',
		handler: { directory: { path: 'public' } },
		config: { files: { relativeTo: __dirname } },
	},
];
