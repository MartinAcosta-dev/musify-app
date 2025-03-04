import { Album } from "./album.model";

export class Song {
    constructor(
        public _id: string,
        public name: string,
        public number: number,
        public duration: number,
        public file: string,
        public album: Album
    ){}
}