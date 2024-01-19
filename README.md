In this example, we are using [Rollup](https://rollupjs.org/) to bundle k6 tests and an internal library for demo purposes.

## Content

### Test project

The [tests](./tests/) folder is our testing project. It includes all tests, test dependencies, and project dependencies like `Rollup`. Its [`rollup.config.js`](./tests/rollup.config.js) is set up to:

- Bundle up test modules located in `node_modules`.
- Polyfill ES+ features that k6 doesn't natively support.

### Shared library

The [test-commons](./test-commons) folder contains a library that's imported in the test project. It's [`rollup.config.js`](./test-commons/rollup.config.js) bundles the library as ES modules.

This project includes a [GH action](./github/workflows/release.yml) that bundles and releases the library as assets in the [project release](https://github.com/grafana/k6-rollup-example/releases). Then, you can import this version from the k6 tests as remote modules, just like in [import-remote-test.js](./tests/remotes/import-remote-test.js).

```js
import { WorkloadConfig, sayHello } from 'https://github.com/grafana/k6-rollup-example/releases/download/v0.0.1/index.js';
```

Alternatively, `test-commons` could be distributed as a npm-based project and configured as a dependency like in [tests/package.json](./tests/package.json). Then, you can import it as in [import-npm-test.js](./tests/samples/import-npm-test.js).

```js
import { WorkloadConfig, sayHello } from 'test-commons';
```



## Installation

First, ensure you've got [k6 installed](https://grafana.com/docs/k6/latest/get-started/installation/). Then, set up the dependencies of the testing project:

```bash
cd tests
npm install
```

## Usage

To confirm the usage of remote modules, visit [import-remote-test.js](./tests/remotes/import-remote-test.js) and run the test.

However, attempting to run the tests in [samples](./tests/samples/) will fail because:

-  k6 does not know how to resolve the `test-commons` module.
-  k6 does not recognize some ES+ features like the optional chaining ( `?.` ) operator. 

To address this, we'll use `Rollup` to bundle the dependency and polyfill ES+ features. 

```bash
cd tests

## To bundle all the tests
npm run rollup

# Or just one test
npm run rollup -- --input samples/babel/optional-chaining-test.js
```

You should see rollup bundling tests into the `dist` folder, like this:

```bash
samples/import-npm-test.js → dist...
created dist in 76ms

...
```

Now we're all set! Check out the `dist` folder. We can now run the tests as usual:

```bash
k6 run dist/optional-chaining-test.js
```