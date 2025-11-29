/*В TS є такі модифікатори доступу:
- public (незахищений, будь хто може модифікувати, йде по дефолту, доступ звідусіль);
- private (захищена властивість, доступ є тільки всередині класу);
- protected (доступний лише всередині самого класу або в саб-класах);
- readonly (захищає будь-які властивості від зміни, читання звідусіль, зміна тільки в конструкторі);
*/

class DriverLicense {
  //властивості ():
  readonly birthDate: string;
  private category: string;
  readonly documentId: string;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private expirationDate: string;
  private lastUpdated: number;
  readonly authority: string;
  readonly categoryIssuingDate: string;
  private photo: string | Buffer;

  //конструктор може бути:
  //-явний (створений власноручно);
  //не явний (по дефолту створений)
  constructor(
    birthDate: string,
    category: string,
    firstName: string,
    lastName: string,
    middleName: string,
    expirationDate: string,
    authority: string,
    categoryIssuingDate: string,
    photo: string
  ) {
    this.birthDate = birthDate;
    this.category = category;
    this.documentId = "APC" + Math.random() * 1000;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.expirationDate = expirationDate;
    this.lastUpdated = new Date().getTime();
    this.authority = authority;
    this.categoryIssuingDate = categoryIssuingDate;
    this.photo = photo;
  }

  //ПРИНЦИП ІНКАПСУЛЯЦІЇ дозволяє змінювати властивості через спеціальні методи set та get

  setlastName(lastName: string, authToken: string) {
    if (authToken === "125125125") {
      this.lastName = lastName;
    } else {
      throw Error('you are not authorize');
    }
  }

  get getlastName() {
    return this.lastName;
  }

  //методи(поведінка)
  copyDocumentId() {
    return this.documentId;
  }

  showFullInformation() {
    return this;
  }

  translate() {
    console.log("Translating...");
  }

  replaceDocument() {
    console.log("Creating replace request...");
  }
}

//екземпляр класу = об'єкт
const driverLicense = new DriverLicense(
  "17-05-1990",
  "B",
  "Павло",
  "Сафонов",
  "Володимирович",
  "31.12.2050",
  "МРЕО",
  "книжечка",
  "C://photo/img.png"
);
//за допомогою ключового слова new і дужок викликаємо конструктор і створюємо екземпляр класу
//тепер ми на основ класу можемо створювати скільки завгодно об'єктів

const driverLicense1 = new DriverLicense(
  "26-10-1987",
  "С",
  "Лео",
  "Мессі",
  "Іштванович",
  "01.01.2099",
  "ЦНАП",
  "пластик",
  "Finder://photo/img.png"
);

//console.log(driverLicense.firstName); //викликаємо властивість об'єкту
console.log(driverLicense); //викликаємо об'єкт
driverLicense.replaceDocument(); //викликаємо метод обʼєкту

console.log(driverLicense1);

//driverLicense1.authority = "test";

console.log(driverLicense1.authority);

//driverLicense.documentId = "test21";

console.log(driverLicense);

driverLicense.setlastName("Шевченко", "125125125");

console.log(driverLicense.getlastName);
