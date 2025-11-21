//promise, async await, event loop

//асинхронність / синхронність

// -> 1 -> 2 -> 3 -> 4 (це синхроність, наступна дія може початись тільки тоді, коли завершилась попередня)

//асинхронність (коли дії можна виконувати паралельно, не чекаючи завершення попередньої дії)

// 1 -> поставити чайник кип'ятитись))
//2 -> взяти чашку і поставити в неї пакетик)
//3 -> поцілувати дружину

//JS - однопоточна мова програмування, але щоб боротися з цим придумали Event Loop (цикл подій);

/* Promise - це об'єкт
Promise — це об'єкт, який представляє результат асинхронної операції. 
Він може бути успішно виконаний (fulfilled), відхилений (rejected) або залишатися в стані очікування (pending), 
і дозволяє обробляти асинхронний код в зручний і структурований спосіб.

### Основні стани промісу:
1. Pending (Очікування): Початковий стан, коли проміс ще не завершився.
2. Fulfilled (Виконано): Операція завершилася успішно, і проміс передає результат.
3. Rejected (Відхилено): Операція завершилася з помилкою, і проміс передає причину відхилення.

### Створення промісу:
Проміси створюються через конструктор new Promise(), який приймає функцію з двома аргументами: resolve (для успіху) і reject (для помилки). */
/* const myPromise = new Promise((resolve, reject) => {
  Асинхронна операція
  if (успіх) {
    resolve('Операція завершена успішно');
  } else {
    reject('Сталася помилка');
  }
}); */

//let res = "";
//const o = prom.then((value) => value); //promise без await завжди повертає promise, а не value;
//console.log(o);
//console.log(res);

//Методи об'єкта Promise:
/* 1. `then(onFulfilled)`
   - Викликається, коли проміс переходить у стан "fulfilled".
   - Параметр onFulfilled — це функція, яка виконується з результатом промісу.

   myPromise.then((result) => {
     console.log(result);  // Виконається при успіху
   }); */

/* 2. catch(onRejected)`
   - Викликається, коли проміс переходить у стан "rejected".
   - Параметр onRejected — це функція, яка виконується у випадку помилки. */

/* myPromise.catch((error) => {
  console.log(error); // Виконається при помилці
}); */

/* 3. finally(onFinally)`
   - Викликається незалежно від результату (успіх або помилка). */

/* myPromise.finally(() => {
  console.log("Операція завершена");
}); */

//Вбудовані методи для роботи з промісами:
//Promise.resolve(value)
// Створює проміс, який негайно переходить у стан "fulfilled" з переданим значенням.
//const chelsea = Promise.resolve('Успіх').then(console.log);  // Виведе "Успіх"
//console.log(chelsea);

//`Promise.reject(reason)`
// Створює проміс, який негайно переходить у стан "rejected" з переданою причиною.
// manutd = Promise.reject('Помилка').catch(console.error);  // Виведе "Помилка"
//console.log(manutd);

function promFast() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Швидкий сервер відповів");
    }, 1000);
  });
}

function promSlow() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Повільна відповідь");
    }, 5000);
  });
}

function promMid() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Cередня відповідь");
    }, 3000);
  });
}

/* promSlow().then((value) => console.log(value));
promMid().then((value) => console.log(value));
promFast().then((value) => console.log(value)); */

//Promise.all(promises)
// Повертає проміс, який виконається, коли всі проміси в масиві завершаться.
// Якщо хоча б один із промісів буде відхилено, весь Promise.all буде відхилено.
/* const result = Promise.all([
    promSlow(), 
    promMid(), 
    promFast(),
]); */
//console.log(result);

//Promise.allSettled(promises)
//Повертає проміс, який виконається, коли всі проміси в масиві завершаться незалежно від результату.
// Повертає масив об'єктів із статусом кожного промісу.
//const result = Promise.allSettled([promSlow, promMid, promFast]).then(console.log);

//Promise.race(promises)
//Повертає проміс, який завершиться з результатом першого виконаного (не важливо чи успішного) промісу з масиву.
/* const result = Promise.race([
    promSlow(), 
    promMid(), 
    promFast(),
    Promise.reject("rejected"),
]); */

//Promise.any(promises)
// Повертає проміс, який завершиться з результатом першого успішного (лише успішного!) промісу.
// Якщо всі проміси будуть відхилені, повертає помилку AggregateError.
/* const result = Promise.any([
    promSlow(), 
    promMid(), 
    promFast(),
    Promise.reject("rejected"),
]);

result.then((value) => console.log(result)); */

//Приклад послідовного ланцюжка промісів:
new Promise((resolve, reject) => {
  resolve("Крок 1");
})
  .then((result) => {
    console.log(result); // Виведе "Крок 1"
    return "Крок 2";
  })
  .then((result) => {
    console.log(result); // Виведе "Крок 2"
    throw new Error("Помилка на Кроці 3");
  })
  .catch((error) => {
    console.error(error); // Виведе помилку
  })
  .finally(() => {
    console.log("Процес завершено");
  });
