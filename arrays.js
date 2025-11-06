const students = ["Pavlo", "Luda", "Maryna"];

// ітерування масивів
// for, while, do while, for of
// for, for of

const colors = ["Green", "Yellow", "Black", "Green", "Red", "White"];
console.log(colors.length); // кількість елементів в середині масиву / довжина масиву

// 6
for (let i = 0; i < colors.length; i++) {
  console.log("My favorite color is " + colors[i]);
}

const coffee = [
  "Espresso",
  "Espresso_Macchiato",
  "Cappuccino",
  "Mocha",
  "Flat_White",
  "Americano",
  "Cafe_Latte",
];

const result = coffee.find((value) => {
  value === "Flat_White";
  console.log(value);
});

console.log(coffee.includes("Mocha", 4));
console.log(coffee.indexOf("Mocha"));

coffee.forEach((value, index, arr) => {
  arr[index] = value + 1;
});

coffee.forEach((value) => {
  console.log(value);
});

for (let i = coffee.length - 1; i >= 0; i--) {
  // console.log(coffee[i]);
  coffee.pop();
}

// helper / поліфіли
console.log(coffee);

//лекція з ютуба

const subscribers = [
  { name: "user1", age: 20, profession: "programmer" },
  { name: "user2", age: 30, profession: "footballer" },
  { name: "user3", age: 35, profession: "teacher" },
  { name: "user6", age: 135, profession: "cleaner" },
  { name: "user13", age: 235, profession: "president" },
  { name: "user22", age: 16, profession: "wife" },
];

const haveYouJustGotNewSubscriber = true;

if (haveYouJustGotNewSubscriber) {
  subscribers.push({ name: "user4", age: 65, profession: "doctor" }); //метод push додає елемент в масив
}

if (haveYouJustGotNewSubscriber) {
  subscribers.pop(); //метод pop видаляє останній елемент з масиву
}

if (haveYouJustGotNewSubscriber) {
  subscribers.shift(); //метод shift видаляє перший елемент з масиву
}

if (haveYouJustGotNewSubscriber) {
  subscribers.splice(0, 1, "new item"); //метод splice видаляє той елемент з масиву, на який ми вкажемо і на його місце додає необхідний нам новий елемент
}

if (haveYouJustGotNewSubscriber) {
  subscribers.unshift({ name: "user5", age: 165, profession: "actor" }); // метод unshift додає перший елемент в масив
}

console.log(subscribers);

function congratsIfMoreThan5(arr) {
  if (arr.length > 5) {
    console.log("Congrats");
  } else {
    console.log("Not enough, looser!");
  }
}

congratsIfMoreThan5(subscribers);
