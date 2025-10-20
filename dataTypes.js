// 7 + 2 (7 примітивних типів даних + null + undefined) = 9

//String
console.log(typeof "This is Andrew"); // string

``; // baclticks

const i = "//*[@tag = 'test'] \n" + "test";
console.log(i);

//Number
console.log(243534543.12345); // number

//NaN - Not a Number;
console.log("Andrew" / 2); // NaN
console.log("test + 10"); // test10 //конкатенація рядків
console.log("test" * 10); // NaN
console.log("test" - 10); // NaN

//BigInt
console.log(9007199254741991n); // BigInt // найбільше ціле число, яке можна зберегти в змінній типу Number це 9007199254741991
console.log(typeof 9007199254741991n); // BigInt

console.log(-9007199254741991n); // BigInt //найменше ціле число, яке можна зберегти в змінній типу Number це -9007199254741991
console.log(typeof -9007199254741991n); // BigInt

//Boolean
console.log(true);
console.log(false);
console.log(typeof true); // boolean
console.log(typeof false); // boolean

console.log(true == 1); // true
console.log(false == 0); // true

//Null vs Undefined;
let a;
console.log(a); // undefined
console.log(typeof a); // undefined

let b = null; // присвоєння відсутнього значення;
console.log(b); // null
console.log(typeof b); // object (це баг в JS, typeof null має повертати null)

//Symbol
let sym1 = Symbol("id");
console.log(typeof sum); // symbol
console.log(sym.description); // id

//object
const obj = {
  test: "Andrew",
  12345: function () {},
  $2323423423423: 1151,
};
console.log(typeof obj); // object
console.log(obj.test); // Andrew
console.log(obj["12345"]); // function() {}
console.log(obj["$2323423423423"]); // 1151
console.log(obj.$2323423423423); // 1151

//Array
// Array is a special type of object
// Arrays are used to store multiple values in a single variable.
// Arrays are a special type of objects, which have additional methods and properties to perform traversal and mutation operations.
// In JavaScript, arrays are dynamic, meaning they can grow and shrink in size as needed.

console.log([1, {}, "test", "1151"]);

// Infinity, NaN, object, function
console.log(isNaN("12151"));
console.log(typeof function () {}); // function
