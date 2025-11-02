/*
Task 1
Парне чи непарне число
Напишіть програму, яка визначає, чи число парне або непарне.
Вхід: Число (наприклад, 4)
Вихід:
- "Число парне."
- "Число непарне."
*/

export function isEvenNumber(number: number) {
  if (isNaN(number) || typeof number !== "number") {
    return("Будь ласка, введи коректне число!");
  } else if (number % 2 === 0) {
    return("Число парне");
  } else {
    return("Число непарне");
  }
}

isEvenNumber(4);
