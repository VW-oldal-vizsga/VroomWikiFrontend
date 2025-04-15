
export interface IConfigurator {
    id: number;
    configName: string;
    engine_Id: number;        
    transmissionType_Id: number; 
    price: number;            
  }
  
  export interface IPopularConfigs {
    id: number;
    user_id:number |null;
    configName: string;
    engine_Id: number;
    color_Id: number;
    transmissionType_Id: number;
    price: number;
    imageUrl?:string,
  }
  
  export interface ISelectConfigurator {
    id?: number | null;
    configName: string;
    user_id:number | null,
    color_Id: number;
    engine_Id: number;
    transmissionType_Id: number;
    price: number;
  }
  
  export interface IColor {
colorName: any;
    id: number;
    name: string;
    colorCode:string;
    price: number;
  }
  
  export interface IEngine {
    id: number;
    name: string;
    horsepower: number;
    fuelConsumption: number;
    fuelType: string;
    co2Emission: number;
    price: number;
  }
  
  export interface ITransmissionType {
    id: number;
    name: string;
    wheelDrive:string;
    price: number;
  }
  export interface IConfiguratorPut {
    id?: number | null;
    user_Id: number| null,
    configName:string,
    engine_Id:number,
    color_Id:number,
    transmissionType_Id:number,
    price:number,
    imageUrl?:string,
  }