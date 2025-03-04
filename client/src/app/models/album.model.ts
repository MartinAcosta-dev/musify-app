import { Artist } from "./artist.model";

export class Album {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public year: Number,
        public image: string,
        public artist: Artist
    ){}
}