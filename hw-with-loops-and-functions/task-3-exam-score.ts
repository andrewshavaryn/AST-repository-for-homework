/*
Task 3
Перевірка оцінки
Якщо бал >= 50 — "Тест складено".
Якщо < 50 — "Тест не складено".
Вхід: Бал (наприклад, 42)
*/

function verifyStudentScore (studentScore: number) { 
  if (isNaN(studentScore) || typeof studentScore !== "number" ) {
  console.log("Invalid score, please enter score as a Number");
} else if (studentScore < 0) {
  console.log("Invalid score: should be not less than 0");
} else if (studentScore >= 50) {
  console.log("Тест складено");
} else {
  console.log("Тест не складено");
}
};

verifyStudentScore(42);

