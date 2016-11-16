export default [
	{
		method: 'GET',
		path: '/{param}',
		handler: { directory: { path: 'server/public' } },
		//config: { files: { relativeTo: __dirname } },
	},
];
