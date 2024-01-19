// https://github.com/grafana/k6/issues/824
// added @babel/plugin-transform-object-rest-spread to rollup config
export default function () {
  console.log(...['this', 'works']);

  console.log(...[...['this', 'also'], 'works']);

  // k6 does not support spread operator in object literals
  let a = { ...{ foo: 'bar' }, test: 'mest' };
  console.log(a);
}
