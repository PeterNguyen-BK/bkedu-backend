const obj = {
  a: "hihi",
  b: "haha",
  c: "huhu",
}

const { a, b, ...newobj } = obj;

console.log(newobj);