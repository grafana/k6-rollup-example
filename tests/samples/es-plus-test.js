
export default function () {

  const person = {
    name: 'Thomas',
    mother: {
      name: 'Alice',
    },
  };

  // k6 JS engine does not support the optional chaining operator
  console.log(person.mother?.name);
}
