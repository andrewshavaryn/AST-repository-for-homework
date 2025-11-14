// Виведіть тільки name (у масиві) по одному співробітнику з кожної з існуючих position, чий досвід роботи три або більше років
let employees = [
    { name: "Олександр Петренко", experience: 5, position: "Розробник" },
    { name: "Марія Коваленко", experience: 2, position: "Дизайнер" },
    { name: "Іван Сидоренко", experience: 7, position: "Менеджер проектів" },
    { name: "Анна Мельник", experience: 5, position: "Тестувальник" },
    { name: "Сергій Бондаренко", experience: 4, position: "Аналітик" },
    { name: "Катерина Шевченко", experience: 6, position: "Архітектор" },
    { name: "Олександр Гриценко", experience: 3, position: "DevOps інженер" },
    { name: "Олександр Петрик", experience: 5, position: "Розробник" },
    { name: "Лія Ковалі", experience: 2, position: "Дизайнер" },
    { name: "Борис Сидоренко", experience: 1, position: "Менеджер проектів" },
    { name: "Ганна Мука", experience: 1, position: "Тестувальник" },
    { name: "Сергій Бонд", experience: 15, position: "Аналітик" },
    { name: "Кейт Шева", experience: 2, position: "Архітектор" },
    { name: "Яків Грицько", experience: 3, position: "DevOps інженер" },
];

const seenPositions = new Set<string>();

const result = employees
    .filter((employee) => employee.experience >= 3)
    .filter((employee) => {
        if (seenPositions.has(employee.position)) {
            return false;
        }
        seenPositions.add(employee.position);
        return true;
    })
    .map((employee) => employee.name);

console.log(result);
