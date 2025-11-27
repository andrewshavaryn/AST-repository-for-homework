//Arrays
const arr1 = [1, 2, 3, 4, "test", true];
const arr2 = new Array(1, 2, 3, 4);
const arr3 = Array.from("QA Senpai");

console.log(arr1);
console.log(arr2);
console.log(arr3);

//Objects
const obj1 = {
  a: 1,
  b: 2,
};

const obj2 = new Object();
obj2.c = 3;

console.log(obj1);
console.log(obj2);

const obj3 = Object.create(null);
obj3.c = 3;

console.log(obj3);

//Map
const map1 = new Map([
  [1, "test"],
  [2, "best"],
  [3, "west"],
]);

const map2 = new Map();

console.log(map1);
console.log(map2);

//Sets
const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1);

const set2 = new Set();
set1.add(10);
console.log(set1);
set2.add(13);
console.log(set2);



