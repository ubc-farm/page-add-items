import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
	sourceMap: true,
	entry: 'src/index.jsx',
	dest: 'public/index.js',
	format: 'iife',
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		nodeResolve({ browser: true, preferBuiltins: false }),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		commonjs({ namedExports: { docuri: ['route'] } }),
	],
	external: [
		'react', 'react-dom', 'tape',
	],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		tape: 'test',
	},
	paths: {
		pouchdb: './node_modules/pouchdb/dist/pouchdb.min.js',
		lodash: 'lodash-es',
	},
};
