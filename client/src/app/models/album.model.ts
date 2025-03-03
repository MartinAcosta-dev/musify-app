import { Artist } from "./artist.model";

export class Album {
    constructor(
        public _id: any,
        public title: any,
        public description: any,
        public year: any,
        public image: any,
        public artist: any
    ){}
}