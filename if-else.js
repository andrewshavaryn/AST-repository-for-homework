//if else

//boolean: true / false

/*
> -більше
>= більше або дорівнює
< - менше
<= - менше або дорівнює
== - дорівнює (без врахування типу)
=== - дорівнює (з врахуванням типу)
&& - і (ще одна умова)
*/


let age = 12;

// перший варіант написання (більш простий і читабельний, але не досконалий);

if (age < 18) {
    console.log("Вхід тобі заборонено")
}

if (age >= 18 && age <21) {
    console.log(age)
    console.log("Проходь, але алко не продамо")
}

if (age >= 21) {
    console.log("Проходь на бар і замовляй, що хочеш")
} 



//другий варіант (складніший, з else, але більш правильний);
let age2 =34;
if(typeof age2 != "number") {
    throw Error("Pls provide correct data");
}

if (age2 < 18) {
    console.log("Вхід тобі заборонено")
} else if (age2 >= 18 && age2 <21) {
    console.log("Проходь, але алко не продамо")
} else if (age2 >= 21) {
    console.log("Проходь на бар і замовляй, що хочеш")
} else {
    throw Error("Некоректне значення віку");
}



const temperature = 9;

if (temperature < 8) {
    console.log("Одягай куртку")
} else if (temperature > 10) {
    console.log("одягай светр")
} else {
    console.log("Сиди вдома голий")
};




const studentScore = 76

if (typeof studentScore !== 'number') {
    throw new Error('Invalid score: not a valid number');
} else if (studentScore < 0 || studentScore > 100) {
    console.log('Invalid score: should be between 0 and 100');
} else if (studentScore >= 75) {
    console.log('Здав');
} else {
    console.log('Не здав');
}