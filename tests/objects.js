const _ = require("lodash");

// обʼєкт

const obj = {
  name: "Borys",
};

const arr = ["Borys"];

// індекс - 0, 1, 2 ...
// ключ

console.log(arr[0]);
console.log(obj.name);

//перебір значень для масивів;

for (const ind of arr) {
}

//перебір значень для об'єктів
for (const ind in obj) {
}


const student = {
  fullName: "Safonov Pavlo",
  age: 21,
  diplomas: [
    "Building and Architecture",
    "Physical Rehabilitation",
    "Management",
  ],
  study: () => {
    console.log("I`m studying");
  },
  getMyDiploma: () => student.diplomas,
};

const func = function () {
  return "stafsasf";
};

for (const key in student) {
  console.log(student[key]);
  console.log(student.getMyDiploma());
  student.study();
}



// forEach, find, filter, include

const coffee = [
  "Espresso",
  "Espresso_Macchiato",
  "Cappuccino",
  "Mocha",
  "Flat_White",
  "Americano",
  "Cafe_Latte",
];

const newCoffee = coffee.map((value, index, arr) => {
  return value;
});

console.log(coffee);
console.log(newCoffee);

coffee.push("vodka");

console.log(coffee);
console.log(newCoffee);

// shallow copy, deep copy

const cat = {
  color: "red",
  name: "Murzik",
  owner: {
    name: "Pavlo",
    isActive: true,
  },
};

// копіювання з використанням rest оператора (shallow copy)
// const catDog = _.cloneDeep(cat);
const catDog = JSON.parse(JSON.stringify(cat));

console.log(cat);
console.log(catDog);

// створення властивості
catDog["age"] = 2;
console.log(catDog);
console.log(cat);

//видалення властивості
delete cat.name;

// присвоєння нового значення
cat.owner.isActive = false;
console.log(cat);
console.log(catDog);

console.log(coffee);
console.log(coffee);

// value + index
cat



//відеолекція з ютуба про об'єкти

const obj1 = {
  name: "Andrew",
  age: 18
};


const obj2 = obj1;

obj1.age = 30;
obj2.name = "John";

console.log(obj1);
console.log(obj2);



const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];


console.log(arr1 === arr2);


const groupA = [
  "Chelsea London", 
  "Real Madrid", 
  "Bayern Munich",
  "FC Milan"
];

function createTeamsForCalendarPage(teams) {
  return teams.map((item) => item.split(" ")[0]);
}

console.log(createTeamsForCalendarPage(groupA));
console.log(groupA);