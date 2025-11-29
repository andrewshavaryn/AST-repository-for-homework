//Приклад використання ПРИНЦИПУ ПОЛІФОРМІЗМУ
//Створюємо батьківський клас
class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    work() {
        return `${this.name} working...`;
    }
    greet() {
        return `Hey, it's me ${this.name}`;
    }
}

//Розширюємо батьківський клас, але для саб-класів змінюємо одну з властивостей
class Developer extends Employee{
     work() {
        return `${this.name} working on code writing...`;
    }
}

class Tester extends Employee {
     work() {
        return `${this.name} working on test cases...`;
    }
}

class Designer extends Employee {
     work() {
        return `${this.name} working on design document...`;
    }
}

//Створюємо змінні для саб-класів
const dev = new Developer("Alex");
const qa = new Tester("Paul");
const designer = new Designer ("Jane");

//Перевіряємо результат
console.log(dev.work());
console.log(qa.work());
console.log(designer.work());

console.log(dev.greet());
console.log(qa.greet());
console.log(designer.greet());

