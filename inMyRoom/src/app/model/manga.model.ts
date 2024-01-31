export class Manga {
    constructor(
        public id: number,
        public title: string,
        public resume: string,
        public author: string,
        //public tomes: number,
        public collection:string[],
        public imageUrl: string) { }
}

export interface Manga {
    id: number,
    title: string,
    resume: string,
    author: string,
    //tomes: number,
    collection:string[],
    imageUrl: string
}