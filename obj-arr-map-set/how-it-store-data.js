const arr1 = [1, 2, 3, 4, "test", true];

const obj1 = {
  1: "test",
  2: "best",
};
console.log(obj1);

const map1 = new Map([
  [null, "test"],
  [true, "best"],
  [obj1, "dest"],
]);

console.log(map1.get(obj1));
console.log(map1.get(true));
console.log(map1.get(null));

const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1.has(4));