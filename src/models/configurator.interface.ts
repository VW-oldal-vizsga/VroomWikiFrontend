export interface IConfigurator{
    id: number,
    userId:number,
    configName:string,
    engine_Id:number,
    color_Id:number,
    transmissionType_Id:number,
}

export interface IColor{
    id:number,
    name:string,
}

export interface IEngine {
    id:number,
    name:string,
    horsePower:number,
    fuelConsumption:number,
    co2Emission:number,
    fuelType:string
}

export interface ITransmissionType{
    id:number,
    name:string,
    wheelDrive:number
}