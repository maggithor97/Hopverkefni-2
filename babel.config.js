/*const presets = [
  [
    '@babel/env',
    {
      modules: false
    }
  ],
  ["@babel/preset-react"]
];

module.exports = { presets };
*/

import babel from 'rollup-plugin-babel';
module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    babel({
      sourceMaps: true,
      presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]]
    })
  ]
};