class House {
roomCount: number;
floorHeight: number;
floorCount: number;
heatingType: string;
wallMaterial: string;
isElevator: boolean;
hallwayCount: number;
buildingType: string;
address: string;

constructor() {}

isLightiningAvailable() {
    return true;
}

isGasAvailable() {
    return true;
}

getWaterPumpStatus(){}

requestCleaning(){}
}

const house = new House();