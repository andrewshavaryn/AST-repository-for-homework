const playwrightConfig = {
    timeout: 120 * 1000,
    testDir: "./tests",
    expect: { timeout: 30_000 },
    fullyParallel: true, 
    workers: "80%",
    retries: process.env.CI ? 2 : 0,
};

const extendedConfig = Object.create(playwrightConfig);
extendedConfig["selfHealing"] = true;

console.log(extendedConfig);

console.log(playwrightConfig.hasOwnProperty("testDir"));
console.log(playwrightConfig.hasOwnProperty("toString"));

console.log(playwrightConfig.toString());

const result = playwrightConfig.isPrototypeOf(extendedConfig);

console.log(result);

/* const objWithoutProto = Object.create(null);
objWithoutProto["selfHealing"] = true;
console.log(objWithoutProto.hasOwnProperty("toString")); */

console.log("constructor" in playwrightConfig);

/*Список методів, які ідуть по дефолту, хоча юзер їх і не створює:
constructor
hasOwnProperty
isPrototypeOf
propertyIsEnumarable
toString
toLocalesString
valueOf
_proto_
*/






