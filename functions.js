//DRY

function isExamPassed(studentScore) {
  //ось такий синтаксис у функцій
  if (isNaN(studentScore) || typeof studentScore !== "number") {
    console.log("Invalid score, please enter score as a Number");
  } else if (studentScore < 0) {
    console.log("Invalid score: should be not less than 0");
  } else if (studentScore >= 50) {
    console.log("Тест складено");
  } else {
    console.log("Тест не складено");
  }
}

isExamPassed(99); //так викликаємо функцію і в дужках викликаємо значення яке хочемо передати у функцію;

function sayHi() {
  //всередині функцій може бути тільки консоль лог тільки, взагалі без програми
  console.log("Hi");
}

sayHi();

function isExamPassed2(studentScore) {
  //та сама функція, але замість консоль логів користуємось ключовим словом return
  if (isNaN(studentScore) || typeof studentScore !== "number") {
    return "Invalid score, please enter score as a Number";
  } else if (studentScore < 0) {
    return "Invalid score: should be not less than 0";
  } else if (studentScore >= 50) {
    return "Тест складено";
  } else {
    return "Тест не складено";
  }
}

console.log(isExamPassed2(1));

function testReturn() {
  return "Chelsea";
  console.log("this goes after return");
}

console.log(testReturn());








//Інфо по Fucntions з ютуб курсу

const userName = "Andrii";
const age = 20;
const gender = "male";

function sayHello(name, age, gender) {
  console.log("hello, dear user " + name);
  if (age < 18) {
    console.log("You are too young!");
  }
  if (gender === "male") {
    console.log("Welcome to the club");
  }
}

sayHello(userName, age, gender);

const userName2 = "Vitalii";

function createUsername(name2) {
  return name2.toUpperCase();
}

const updatedName2 = createUsername(userName2);
console.log(updatedName2);





//fucntion declaration

function sayHello3(greetings) {
  console.log(greetings);
}

sayHello3("bonjour");




//function expression
const sayHello4 = function (greetings2) {
  console.log(greetings2);
};

sayHello4("Ласкаво просимо");




//після "return"виконання функції припиняється

function returnSmth() {
  console.log(1);
  console.log(2);
  console.log(3);
  console.log(4);
  return "hello";
  console.log(5);
  console.log(6);
  console.log(17);
}

returnSmth();




//function with objects

const car = {
  speed: 100, 
  colour: 'red',
  drive: function() {
    console.log("Жигулька")
  }
}

car.drive();





