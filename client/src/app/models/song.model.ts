export class Song {
    constructor(
        public _id: string,
        public name: string,
        public number: string,
        public duration: number,
        public file: string,
        public album: string
    ){}
}