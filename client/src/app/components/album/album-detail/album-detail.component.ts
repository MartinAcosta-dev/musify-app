import { Component } from '@angular/core';
import { Router } from '@angular/router';


// Modelos
import { User } from 'src/app/models/user.model';
import { Album } from 'src/app/models/album.model';
import { Song } from 'src/app/models/song.model';
import { Artist } from 'src/app/models/artist.model';

// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  providers: [UserService, ArtistService, AlbumService, SongService]
})
export class AlbumDetailComponent {
  public titulo: string;
  public album: Album;
  public artist: Artist;
  public albumId: string;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: string;
  public songs: Song[];
  public confirmado: string;

  constructor(private router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService,
    private _songService: SongService
  ){
      this.titulo = "Detalles de álbum";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.artist = new Artist("","","","");
      this.album = new Album("","","",0,"",this.artist);
      this.albumId = this.router.url;
      this.albumId = this.albumId.split("/")[2];
      
      this.url = GLOBAL.url;
      this.alertMessage = "";
      this.songs = []; 
      this.confirmado = "";
  }

  ngOnInit(): void {
    this.getAlbum(this.albumId, this.token)
    // this.getArtist(this.album.artist, this.token)
    this.artist.name = this.album.artist.name;
  }


  public getAlbum(AlbumId: string, token: string): void{
    this._albumService.getAlbum(AlbumId, token).subscribe(
      response =>{
        if(!response.album){
          this.router.navigate(['/']);
          alert("No se ha podido obtener el album");
        }else{
          this.album = response.album;
          // Buscar canciones del album
          this.getSongs();
        }
      }
    );
  };

  // public getArtist(artistID: string, token: string): void{
  //   this._artistService.getArtist(this.token, this.album.artist).subscribe(
  //     res =>{
  //       if(res.name){
  //         this.artist.name = ""
  //       }else{
  //         this.artist.name = res.name
  //       }
  //     }
  //   );
  // }


  public getSongs(){
    this._songService.getSongs(this.album._id, this.token).subscribe(
      response => {
        this.songs = response;
      }
    );
  }

  public onDeleteConfirm(id: string){
    this.confirmado = id;
  }

  public onCancelSong(){
    this.confirmado = "";
  }

  public onDeleteSong(id: string){
    this._songService.deleteSong(this.token, id).subscribe(
      (response) => {
        if(response.song){
          this.getSongs();
        }
      }
    );
  }

  public startPlayer(song: Song, event: Event){
    var clicked_element = null;
    if (((event.target) as HTMLElement).tagName == "IMG"){
      clicked_element = ((event.target) as HTMLElement).parentElement
    }else{
      clicked_element = (event.target) as HTMLElement;
    }
    let songPlayer = JSON.stringify(song);
    let filePath = this.url + 'get-song-file/' + song.file;
    let album = this.album;
    let imagePath = this.url + 'get-image-album/' + album.image;

    let play_buttons = document.querySelectorAll(".play-img");

    play_buttons.forEach((e) => {
      (e as HTMLElement).style.display = "block";
    });

    let pause_buttons = document.querySelectorAll(".pause-img");
    pause_buttons.forEach((e)=>{
      (e as HTMLElement).style.display = "none";
    })


    let playingImg = (clicked_element?.querySelector(".play-img")) as HTMLElement;
    playingImg.style.display = "none"

    let playipausengImg = (clicked_element?.querySelector(".pause-img")) as HTMLElement;
    playipausengImg.style.display = "block"


    // Seteo en el local storage datos de la cancion en curso
    localStorage.setItem('playing_song', songPlayer);
    localStorage.setItem('playing_song_album_image', imagePath);

    // Actualizo los elementos del dom del player
    document.getElementById("play-image-album")?.setAttribute("src", imagePath);
    document.getElementById("mp3-source")?.setAttribute("src", filePath);
    const songTitleElement = document.getElementById("playing-song-title");
    if (songTitleElement) {
      songTitleElement.textContent = song.name;
    }

    // Nombre de artista en player + link ID
    (document.getElementById("playing-song-artist") as any).textContent = " - " + this.album.artist.name;

    (document.getElementById("player") as any).load();
    (document.getElementById("player") as any).play();

  }
}
