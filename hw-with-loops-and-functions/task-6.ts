/*
6. Дорога і світлофор
Якщо зелений — переходьте.
Якщо жовтий — підготуйтеся.
Якщо червоний — зачекайте.
Вхід: Колір світлофора (наприклад, "жовтий")
*/

function verifyColorOfTrafficLight(trafficLightColor: string) {
  if (trafficLightColor === "yellow") {
  console.log("Підготуйтесь");
} else if (trafficLightColor === "green") {
  console.log("Переходьте");
} else if (trafficLightColor === "red") {
  console.log("Зачекайте");
} else {
  console.log("Світлофор зламався, будьте обережні");
}
};

verifyColorOfTrafficLight("yellow");


