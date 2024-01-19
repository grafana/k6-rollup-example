// https://github.com/grafana/k6/issues/2887
// added to rollup config:
// - @babel/plugin-transform-private-property-in-object
// - @babel/plugin-transform-private-methods
// - @babel/plugin-transform-class-properties
class Foo {
  #bar = 'bar';

  test(obj) {
    return #bar in obj;
  }
}
export default function () {
  const foo = new Foo(5);

  // k6 does not support private properties
  console.log(foo.test({ bar: 5 }));
}
