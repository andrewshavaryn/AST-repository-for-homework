//methods in arrays

// (value, index, arr) =>

// map не змінює довжину масиву
// map
const arrWithUndefined = [1, 2, undefined, 4, undefined].map((value) => {
  if (typeof value !== "undefined") {
    return value;
  }
});

const arr1 = [1, 2, undefined, 4, undefined].filter((value) => {
  if (typeof value !== "undefined") {
    return value;
  }
});

console.log(arr1);
console.log(arrWithUndefined);

const response = {
  articles: [
    {
      slug: "article-32-1762964854687-7766x7",
      title: "Article-32-1762964854687",
      description: "Description-32",
      body: "Body content 32",
      createdAt: "2025-11-12T16:28:16.172Z",
      updatedAt: "2025-11-12T16:28:16.172Z",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-31-1762964854686-f4spir",
      title: "Article-31-1762964854686",
      description: "Description-31",
      body: "Body content 31",
      createdAt: "2025-11-12T16:28:14.978Z",
      updatedAt: "2025-11-12T16:28:14.978Z",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-30-1762964854685-38dhmt",
      title: "Article-30-1762964854685",
      description: "Description-30",
      body: "Body content 30",
      createdAt: "2025-11-12T16:28:13.785Z",
      updatedAt: "2025-11-12T16:28:13.785Z",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-25-1762964854680-zb06r8",
      title: "Article-29",
      description: "Description-29",
      body: "Body content 29",
      createdAt: "2025-11-12T16:28:12.611Z",
      updatedAt: "2025-11-12T16:28:12.611Z",
      tagList: [],
      favorited: true,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-28-1762964854683-37ku51",
      title: "Article-28-1762964854683",
      description: "Description-28",
      body: "Body content 28",
      createdAt: "2025-11-12T16:28:11.336Z",
      updatedAt: "2025-11-12T16:28:11.336Z",
      tagList: [],
      favorited: true,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-27-1762964854682-84ai28",
      title: "Article-27-1762964854682",
      description: "Description-27",
      body: "Body content 27",
      createdAt: "2025-11-12T16:28:10.180Z",
      updatedAt: "2025-11-12T16:28:10.180Z",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-26-1762964854681-988asl",
      title: "Article-26-1762964854681",
      description: "Description-26",
      body: "Body content 26",
      createdAt: "2025-11-12T16:28:08.984Z",
      updatedAt: "2025-11-12T16:28:08.984Z",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
    {
      slug: "article-25-1762964854680-zb06r8",
      title: "Article-25",
      description: "Description-25",
      body: "Body content 25",
      createdAt: "2025-11-12T16:28:07.755Z",
      updatedAt: "2025-11-12T16:28:07.755Z",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "testg3pcll7r",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    }
]
    };


const arr = response.articles;

// map - отримуємо масив тільки з назвами
const titles = arr.map((value) => {
  return value.title;
});


// filter - отримуємо тільки обрані статті
const favorites = arr.filter((value) => {
  return value.favorited === true;
});


// chaining - комбінуємо filter та map
const onlyFavoritesTitles = arr
  .filter((value) => {
    return value.favorited === true;
  })
  .map((value) => {
    return value.title;
  });

console.log(titles);
console.log(favorites);
console.log(onlyFavoritesTitles);

// find - знаходимо об'єкт за умовою
const objToFind = {
  slug: "article-23-1762964854678-i88kwz",
  title: "Article-23-1762964854678",
  description: "Description-23",
  body: "Body content 23",
  createdAt: "2025-11-12T16:28:05.387Z",
  updatedAt: "2025-11-12T16:28:05.387Z",
  tagList: [],
  favorited: false,
  favoritesCount: 0,
  author: {
    username: "testg3pcll7r",
    image: "https://static.productionready.io/images/smiley-cyrus.jpg",
    following: false,
  },
};

const result = arr.find(
  (value) => JSON.stringify(value) === JSON.stringify(objToFind)
);
console.log(result);

// findIndex - знаходимо індекс елемента
const index = arr.findIndex(
  (value) => value.slug === "article-25-1762964854680-zb06r8"
);
console.log(index);

// some - перевіряємо, чи є хоча б один елемент, що відповідає умові
const resSome = arr.some((value) => {
  return value.favorited === true;
});
console.log(resSome);

// every - перевіряємо, чи всі елементи відповідають умові
const resEvery = arr.every((value) => {
  return value.title.length > 0;
});
console.log(resEvery);

// includes - перевіряємо наявність елемента в масиві
const simpleArr = ["test", true, 124145, [], { a: 1 }];
console.log(simpleArr.includes(124145)); // завжди false для об'єктів

// Рекурсія
let i = 0;

function recursion() {
  if (i === 1000) return;
  i++;
  recursion();
}

recursion();

// flatMap - фільтруємо та вирівнюємо масив
const arrEntry = [1, 2, undefined, 5, undefined];

const arrFlatMap = arrEntry.flatMap((element) => {
  if (element !== undefined) {
    return element;
  } else {
    return [];
  }
});

console.log(arrFlatMap);