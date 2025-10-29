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


let age = 17;

if (age < 18) {
    console.log("Вхід тобі заборонено")
};

if (age >= 18 && age <21) {
    console.log(age)
    console.log("Проходь, але алко не продамо")
}

if (age >= 21) {
    console.log("Проходь на бар і замовляй, що хочеш")
}







const temperature = 11;

if (temperature <= 10) {
    console.log("Одягай куртку")
}

if (temperature > 10) {
    console.log("одягай светр")
}