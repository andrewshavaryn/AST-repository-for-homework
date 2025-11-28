//methods of arrays
const arr = [1, 2, 3, 4];

//adding to arrays
arr.push(6); //додає елемент в кінець масиву
arr.unshift(22); //додає елемент на початок масиву
arr[3] = "this is 3rd index"; //перезаписує елемент на вказаному індексі, зараз це 3 індекс

console.log(arr);

//get from arrays
console.log(arr[5]);
console.log(arr.at(5));

//check existence for arrays
console.log(arr.includes("this is 3rd index"));
console.log(arr.indexOf(6)); //вказує на індекс елементу в масиві

//delete from arrays
arr.pop(); //не приймає аргументів, видаляє останній елемент в масиві;
console.log(arr);

arr.shift(); //не приймає аргументів, видаляє перший елемент в масиві;
console.log(arr);

arr.splice(1, 2); //перший агрумент вказує з якого індексу починажмо видаляти, другий - скільки елементів поспіль необхідно видалити
console.log(arr);

//size of arrays (використовуємо ключове слово length)
console.log(arr.length);

//iteration for arrays
// Variant 1: for...of
for (const num of arr) {
  console.log(num);
}

// Variant 2: forEach
arr.forEach(num => console.log(num));










//methods of objects
const obj = {
  a: 1,
  b: 2,
};

//adding to objects
obj["c"] = "test";
obj.d = "test-d";
Object.assign(obj, { e: "test-e" });

console.log(obj);

//get from objects
console.log(obj["c"]);
console.log(obj.d);

//check existence for objects
console.log(obj.hasOwnProperty("b"));
console.log("w" in obj);

//delete from objects
delete obj.d;
console.log(obj.d);
console.log(obj);

//useful methods for objects
// Отримати всі ключі
console.log(Object.keys(obj));

// Отримати всі значення
console.log(Object.values(obj)); 

// Отримати пари [ключ, значення]
console.log(Object.entries(obj));

//size for objects
Object.entries(obj).length;
console.log(Object.entries(obj).length);

//iteration for objects
for (const key in obj) {
  console.log(key, obj[key]);
}




//methods of Map
//adding to Map
const map = new Map();
map.set("test", "test2");
map.set("chelsea", "best");
map.set(1, 22);

console.log(map);
console.log(map.size);

//get from Map
console.log(map.get("chelsea"));

//check existence for Map
console.log(map.has("test"));

//delete from Map
map.delete("test");
console.log(map);

//size for Map
map.size;
console.log(map.size);

//iteration for Map
// Варіант 1: for...of з entries() (найзручніший)
for (const [key, value] of map.entries()) {
  console.log(key, value);
}

// Варіант 2: for...of без entries() (коротший запис)
for (const [key, value] of map) {
  console.log(key, value);
}

// Варіант 3: forEach
map.forEach((value, key) => {
  console.log(key, value);
});

// Варіант 4: тільки ключі
for (const key of map.keys()) {
  console.log(key);
}

// Варіант 5: тільки значення
for (const value of map.values()) {
  console.log(value);
}





//methods of Set (add додає тільки одне значення за раз, тому для кожного елемента викликаємо окремо)
//adding to Set
const set = new Set();
set.add("1");
set.add(true);
set.add(null);
set.add(undefined);

console.log(set);

//get from Set
console.log(set.keys());
console.log(set.entries());

//check existence for Set
console.log(set.has(null));

//Delete from Set
set.delete("1"); //видаляє елемент за значенням
console.log(set);

set.clear(); //очищує весь Set
console.log(set);

//size for Set
set.size;
console.log(set.size);

//iteration for Set
// Потрібно заново заповнити Set після clear()
set.add("1");
set.add(true);
set.add(null);
set.add(undefined);

// Варіант 1: for...of (найпростіший і найпопулярніший)
for (const value of set) {
  console.log(value);
}

// Варіант 2: forEach
set.forEach(value => {
  console.log(value);
});

// Варіант 3: через values()
for (const value of set.values()) {
  console.log(value);
}

// Варіант 4: через keys() (те саме, що values())
for (const value of set.keys()) {
  console.log(value);
}

// Варіант 5: через entries() (повертає [value, value])
for (const [value1, value2] of set.entries()) {
  console.log(value1, value2);
}
