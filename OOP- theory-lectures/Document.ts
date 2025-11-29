//Приклад ПРИНЦИПУ АБСТРАКЦІЇ
abstract class Document1 {
  readonly birthDate: string;
  readonly documentId: string;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private lastUpdated: number;
  photo: Photo;
  authority: Authority;

  constructor(
    birthDate: string,
    firstName: string,
    lastName: string,
    middleName: string,
    photo: Photo,
    authority: Authority
  ) {
    this.birthDate = birthDate;
    this.documentId = "APC" + Math.random() * 1000;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.lastUpdated = new Date().getTime();
    this.photo = photo;
    this.authority = authority;
  }
}

//Приклад ПРИНЦИПУ УСПАДКУВАННЯ (НАСЛІДУВАННЯ)
// Дочірній клас:
//Співвідношення IS-A (Є ЧИОМСЬ)
class Passport extends Document1 {
  constructor(
    birthDate: string,
    firstName: string,
    lastName: string,
    middleName: string,
    photo: Photo,
    authority: Authority
  ) {
    super(birthDate, firstName, lastName, middleName, photo, authority); //super - це ключове слово для роботи з батьківським класом
  }
}

//Також є співвідношення HAS-A (є частиною чогось)
class Photo {
  path: string;
  size: number;

  constructor(path: string, size: number) {
    this.path = path;
    this.size = size;
  }

  display(): void {
    console.log(`Показуємо фото: ${this.path}`);
  }
}

class Authority {
  name: string;
  location: string;

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }
}

// СПОЧАТКУ створюємо photo та authority:
const photo = new Photo("C://photo/andrii.png", 2048);
const authority = new Authority("МРЕО", "Київ");

// Тепер можна створювати паспорт з ним:
const myPassport = new Passport(
  "17-05-1990",
  "Ендрю",
  "Шева",
  "Олександрович",
  photo,
  authority
);

console.log(myPassport);
