In this example, we are using [Rollup](https://rollupjs.org/) to bundle k6 tests for demo purposes.

Check out the [`rollup.config.js`](./tests/rollup.config.js) file. It is set up to:

- Bundle up test modules located in `node_modules`.
- Polyfill ES+ features that k6 doesn't natively support.

## Content

The [tests](./tests/) folder is our testing project. It includes all tests, test dependencies, and project dependencies like `Rollup`. 

The [test-commons](./test-commons) folder is a library imported in the testing project. It is distributed as a npm-based project and configured as a dependency in [tests/package.json](./tests/package.json).

## Installation

First, ensure you've got [k6 installed](https://grafana.com/docs/k6/latest/get-started/installation/). Then, set up the dependencies of the testing project:

```bash
cd tests
npm install
```

## Usage

Attempting to run the tests in [samples](./tests/samples/) will fail because:

-  k6 does not know how to resolve the `test-commons` module.
-  k6 does not recognize the optional chaining ( `?.` ) operator. 

To address this, we'll use `Rollup` to bundle the dependency and polyfill the `?.` operator. 

```bash
cd tests

## To bundle all the tests
npm run rollup

# Or just one test
npm run rollup -- --input samples/es-plus-test.js
```

You should see rollup bundling tests into the `dist` folder, like this:

```bash
samples/import-common-test.js → dist...
created dist in 76ms

samples/es-plus-test.js → dist...
created dist in 11ms
```

Now we're all set! Check out the `dist` folder. We can now run the tests as usual:

```bash
k6 run dist/es-plus-tests.js
```

