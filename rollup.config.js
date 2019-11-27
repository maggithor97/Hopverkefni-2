import babel from 'rollup-plugin-babel';

/*export default [
  {
    input: 'src/index.mjs',
    output: {
      name: 'reusable',
      file: 'dist/index.mjs',
      format: 'cjs'
    },
    external: ['react'],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
];
*/
//From Andri
module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      sourceMaps: true,
      presets: [
        ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
      ],
    }),
  ],
};

