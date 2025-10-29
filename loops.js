// loop, цикл

// for
// if(){}
for (let i = 0; i < 10; i++) {
  //   console.log("тіло циклу виконується ");
  //   console.log(i);
}

//while
let i = 10;
while (i < 10) {
  console.log(i);
  i++; // i = i+1
}

// do while
do {
  console.log(i);
  i++;
} while (i < 10);




[11521, 23521, 2613, "string", 5, 6, 7].forEach((value, index, arr) => {
  console.log(value);
  console.log(index);
  console.log(arr);
});




const arr = [11521, 23521, 2613, "string", 5, 6, 7];

for (const element of arr) {
  console.log(element);
}

const obj = {
  a: 10,
  b: 100,
  c: 112515,
};

for (const key in obj) {
  console.log(obj[key]);
}

const arr1 = [2155, 215, 12451];

for (let qa = 0; qa <= 10; qa = qa + 1) {
  console.log(arr1[qa]);
}
















