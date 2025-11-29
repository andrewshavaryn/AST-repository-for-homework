//Приклад ПРИНЦИПУ АБСТРАКЦІЇ
abstract class Document1 {
  readonly birthDate: string;
  readonly documentId: string;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private lastUpdated: number;

  constructor(
    birthDate: string,
    firstName: string,
    lastName: string,
    middleName: string
  ) {
    this.birthDate = birthDate;
    this.documentId = "APC" + Math.random() * 1000;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.lastUpdated = new Date().getTime();
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
    middleName: string
  ) {
    super(birthDate, firstName, lastName, middleName);
  }
}

// Тепер можна створювати екземпляри:
const myPassport = new Passport(
  "17-05-1990",
  "Ендрю",
  "Шева",
  "Олександрович"
);

console.log(myPassport);

//Також є співвідношення HAS-A (є частиною чогось)