
export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  external: [new RegExp(/^(k6|https?\:\/\/)(\/.*)?/)],
};
