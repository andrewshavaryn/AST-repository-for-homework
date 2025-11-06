import { log } from "console";

// function declaration
export function sayHiDeclaration() {
  console.log("Hi");
}

// arrow function
// різниця в синтаксисі
// нема хоістінгу
// arrow function не мають свого this
// якщо в один рядок і без {} повертає автоматично значення
export const sayHiArrow = () => {
  console.log("Hi");
};

// якщо в один рядок і без {} повертає автоматично значення
export const sumArrow = (a, b) => a + b;
sum(1, 2); // 3

let name = "";
let age = 18;
let job = "Worker";

export const sayHiByName = () => {
  name, age, (title = "Support");
  console.log("Hi, " + name + `I'm ${age} years old, and working on ${title}`);
};

// функціональний вираз / functional expression
// є свій this
// нема hoisting
const functionalExpression = function () {
  console.log("I`am Expression");
};

functionalExpression();

// анонімна функція
/*
function(){
  console.log("I`am Anonymous");
}
*/


// arrow function in object
const cat = {
  meaw: () => {
    console.log("Meaw");
  },
  walk: () => {
    console.log("I`m walking");
  },
  eat: function () {
    console.log("I`m eating");
  },
};

cat.meaw();
cat.eat();

// Anonymous function
sayHiArrow();

// виклик функції як аргумента
function sum(a, b) {
  return a + b;
}

function logSum(sum) {
  console.log(sum);
}

logSum(sum(1, 2));

// передача функції як аргумента і виклик її в середині іншої
function sum1(a, b) {
  return a + b;
}

const sum2 = (a, b) => a + b;

console.log(sum1(1, 1));
console.log(sum2(1, 233));
