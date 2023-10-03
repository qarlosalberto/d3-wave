import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';

const production = false; //!process.env.ROLLUP_WATCH

export default {
	input: 'index.ts',
	external: ['@fortawesome/free-solid-svg-icons', 'd3'],
	plugins: [
		resolve({
			jsnext: true,
			module: true,
		}),
		postcss({
			extensions: ['.css'],
		}),
		typescript({ sourceMap: !production, inlineSources: !production })
	],
	output: {
		extend: true,
		file: `dist/d3-wave.js`,
		sourcemap: !production,
		format: 'umd',
		globals: {
			// lib name: name where lib exports itself on "window"
			"d3": "d3",
			'@fortawesome/free-solid-svg-icons': 'free-solid-svg-icons',
		},
		name: 'd3'
	}
}