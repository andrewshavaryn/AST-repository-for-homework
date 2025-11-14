const product = {
  name: "Ноутбук",
  brand: "Dell",
  price: 1200,
  inStock: true,
  obj: {
    a: 1251,
    b: 125121251,
  },
};

const extended = {
  active: true,
  promotion: "20%",
};

// Object.keys() - повертає масив ключів
console.log(Object.keys(product));
// ["name", "brand", "price", "inStock", "obj"]

// Object.values() - повертає масив значень
console.log(Object.values(product));
// ["Ноутбук", "Dell", 1200, true, {a: 1251, b: 125121251}]

// Object.entries() - повертає масив пар [ключ, значення]
console.log(Object.entries(product));
// [["name", "Ноутбук"], ["brand", "Dell"], ...]

// Spread operator - створює нову копію (поверхневе копіювання)
const concatObj = { ...product, ...extended };
console.log(concatObj);


// Object.assign() - створює копію з декількох об'єктів
const objCopy = Object.assign({}, product, extended);


// Object.assign() - об'єднує об'єкти (модифікує перший аргумент!)
const objAssign = Object.assign(product, extended);

console.log(objAssign);
console.log(product); // product тепер має властивості з extended!
console.log(extended);


// Демонстрація поверхневого копіювання (shallow copy)
objCopy.obj.a = "test";

console.log(objCopy);   // obj.a = "test"
console.log(product);   // obj.a = "test" (також змінився!)

// Object.hasOwn() - перевіряє наявність власної властивості
console.log(Object.hasOwn(product, "price")); // true
console.log(Object.hasOwn(product, "color")); // false


// Якщо потрібно глибоке копіювання вкладених об'єктів:
const deepCopy = structuredClone(product);
deepCopy.obj.a = "new value";
console.log(product.obj.a); // залишиться 1251 (не зміниться!)