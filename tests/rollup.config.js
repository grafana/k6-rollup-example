import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { glob } from 'glob';

function getConfig(file) {
  return {
    input: file,
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [
      // resolve node_modules in k6 script
      nodeResolve({ resolveOnly: ['test-commons'] }),
      babel({
        // transpile non-supported ES features: https://github.com/grafana/k6/issues/3265
        plugins: [
          '@babel/plugin-transform-optional-chaining',
          '@babel/plugin-transform-object-rest-spread',
          '@babel/plugin-transform-private-property-in-object',
          '@babel/plugin-transform-private-methods',
          '@babel/plugin-transform-class-properties',
        ],
        babelHelpers: 'bundled',
      }),
    ],
    external: [new RegExp(/^(k6|https?\:\/\/)(\/.*)?/)],
  };
}

export default (commandLineArgs) => {
  if (commandLineArgs.input) {
    //npm run rollup -- --input samples/import-npm-test.js
    // or
    //rollup --config --input samples/import-npm-test.js
    return getConfig(commandLineArgs.input);
  }
  const tests = glob.sync('./samples/**/*test.js');
  return tests.map(getConfig);
};
