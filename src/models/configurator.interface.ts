
export interface IConfigurator {
    id: number;
    configName: string;
    engine_Id: number;        
    transmissionType_Id: number; 
    price: number;            
  }
  
  export interface IPopularConfigs {
    id: number;
    configName: string;
    engine_Id: number;
    color_Id: number;
    transmissionType_Id: number;
    price: number;
  }
  
  export interface ISelectConfigurator {
    configName: string;
    color_Id: number;
    engine_Id: number;
    transmissionType_Id: number;
    price: number;
  }
  
  export interface IColor {
    id: number;
    name: string;
    colorCode:string;
    price: number;
  }
  
  export interface IEngine {
    id: number;
    name: string;
    horsepower: number;
    fuelType: string;
    co2Emission: number;
    price: number;
  }
  
  export interface ITransmissionType {
    id: number;
    name: string;
    wheelDrive:string;
    price: string;
  }