export interface IConfigurator{
    id: number,
    userId:number,
    configName:string,
    engine_Id:number,
    color_Id:number,
    transmissionType_Id:number,
    price:number,
}

export interface IColor{
    id:number,
    name:string,
    colorCode:string,
    price:number,
}

export interface IEngine {
    id:number,
    name:string,
    horsepower:number,
    fuelConsumption:number,
    co2Emission:number,
    fuelType:string,
    price:number,
}

export interface ITransmissionType{
    id:number,
    name:string,
    wheelDrive:number,
    price:number,
}

export interface ISelectConfigurator{
    userId:number,
    configName:string,
    engine_Id:number,
    color_Id:number,
    colorName:string,
    transmissionType_Id:number,
    price:number,
}
export interface IPopularConfigs{
    id: number,
    configName:string,
    engine_Id:number,
    color_Id:number,
    transmissionType_Id:number,
    price:number,
}

export interface IColorCodes {
    id:number,
    colorCode: string
}