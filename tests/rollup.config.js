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
      nodeResolve(), // resolve node_modules in k6 script
      babel({ // transpile non-supported ES features
        plugins: ['@babel/plugin-transform-optional-chaining'],
        babelHelpers: 'bundled',
      }),
    ],
    external: [new RegExp(/^(k6|https?\:\/\/)(\/.*)?/)],
  };
}

export default (commandLineArgs) => {
  if (commandLineArgs.input) {
    //npm run rollup -- --input samples/es-plus-test.js
    // or
    //rollup --config --input samples/es-plus-test.js
    return getConfig(commandLineArgs.input);
  }
  const tests = glob.sync('./samples/*test.js');
  return tests.map(getConfig);
};
