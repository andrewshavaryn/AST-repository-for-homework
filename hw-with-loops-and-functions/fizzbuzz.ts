/*
Правила гри/задачі
Якщо число ділиться на 3, виведіть "Fizz".
Якщо число ділиться на 5, виведіть "Buzz".
Якщо число ділиться і на 3, і на 5, виведіть "FizzBuzz".
В іншому випадку, виведіть саме число. 

Приклад для чисел від 1 до 15
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
*/


export function isNumberCanDivideOnThreeOrFive (number: number) {
  if (isNaN(number) || typeof number !== "number") {
    console.log("Будь ласка, введи коректне число!");
  } else if (number % 3 === 0 && number % 5 === 0) {
    console.log("FizzBuzz");
  } else if (number % 5 === 0) {
    console.log("Buzz");
  } else if (number % 3 === 0) {
    console.log("Fizz")
  } else {
    console.log(number)
  }
};

isNumberCanDivideOnThreeOrFive(30);