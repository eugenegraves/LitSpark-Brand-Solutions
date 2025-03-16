/**
 * Babel Configuration
 * 
 * This configuration allows Jest to transform JSX and modern JavaScript features
 * when running tests.
 */

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      },
      modules: 'commonjs'
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};
