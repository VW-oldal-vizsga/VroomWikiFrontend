export interface ICard {
    id:number,
    name:string,
    description:string,
    imageBase64: string
    releaseDate:number,
    design:string,
    designer:string,
    assembly:string[],
    production: string[],
    engine:string,
    horsepower: string,
}