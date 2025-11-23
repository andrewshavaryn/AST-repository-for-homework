//лекція з ютуба (міні курса)

//Event Loop  //Цикл подій

/* function showNumber(number) {
    console.log(number);
}

console.log(1);
console.log(2);

showNumber(3);

console.log(4);

for(let i = 5; i < 9; i++) {
    console.log(i);
}

showNumber(9);

console.log(10); */


/* function one() {
    console.log(1);
}

function two() {
    console.log(2);
}

function three() {
    console.log(3);
}

function four(number) {
    console.log(number);
}

setTimeout(one, 0); // --> moved to WebAPI

two();

setTimeout(three, 1000); // --> moved to WebAPI

console.log(4);

Promise.resolve(5).then(four); */

console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);