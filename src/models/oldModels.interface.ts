export interface ICard {
    id:number,
    name:string,
    descriptionHU:string,
    descriptionEN:string,
    descriptionDE:string,
    imageBase64: string
    releaseDate:number,
    designHU:string,
    designEN:string,
    designDE:string,
    designer:string,
    assembly:string[],
    production: string[],
    engine:string,
    horsepower: string,
}