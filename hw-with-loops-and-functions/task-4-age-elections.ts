/*
Task 4
Вік для голосування
Напишіть програму, яка перевіряє, чи можна користувачу голосувати.
Вхід: Вік (наприклад, 17)
Вихід:
- Якщо >= 18: "Ви можете голосувати."
- Інакше: "Ви ще не можете голосувати."
*/

export function isAgeForElections(age: number) {
  if (isNaN(age) || typeof age !== "number") {
    return "Invalid age, please enter age as a Number";
  } else if (age < 0) {
    return "Invalid age: should be not less than 0";
  } else if (age >= 18) {
    return "Ви можете голосувати";
  } else {
    return "Ви ще не можете голосувати";
  }
}

isAgeForElections(17);
