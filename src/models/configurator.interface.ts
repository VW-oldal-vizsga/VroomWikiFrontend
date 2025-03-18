export interface IConfigurator{
    id: number,
    userId:number,
    configName:string,
    EngineId:number,
    ColorId:number,
    TransmissionTypeId:number,
}

export interface IColor{
    id:number,
    name:string,
}

export interface IEngine {
    id:number,
    name:string,
    horsePower:number,
    fuelConsumption:Float32Array,
    co2Emission:Float32Array,
    fuelType:string
}

export interface ITransmissionType{
    id:number,
    name:string,
    wheelDrive:number
}