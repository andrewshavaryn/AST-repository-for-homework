//DRY

function isExamPassed(studentScore ){  //ось такий синтаксис у функцій
    if (isNaN(studentScore) || typeof studentScore !== "number" ) {
  console.log("Invalid score, please enter score as a Number");
} else if (studentScore < 0) {
  console.log("Invalid score: should be not less than 0");
} else if (studentScore >= 50) {
  console.log("Тест складено");
} else {
  console.log("Тест не складено");
}
}

isExamPassed(99) //так викликаємо функцію і в дужках викликаємо значення яке хочемо передати у функцію;



function sayHi(){ //всередині функцій може бути тільки консоль лог тільки, взагалі без програми
    console.log("Hi")
}

sayHi();






function isExamPassed2(studentScore ){  //та сама функція, але замість консоль логів користуємось ключовим словом return
    if (isNaN(studentScore) || typeof studentScore !== "number" ) {
  return("Invalid score, please enter score as a Number");
} else if (studentScore < 0) {
  return("Invalid score: should be not less than 0");
} else if (studentScore >= 50) {
  return("Тест складено");
} else {
  return("Тест не складено");
}
}

console.log(isExamPassed2(1));







function testReturn(){
    return("Chelsea")
    console.log('this goes after return')
}

console.log(testReturn())



