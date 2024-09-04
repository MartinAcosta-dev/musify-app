import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Artist } from 'src/app/models/artist.model';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { Song } from 'src/app/models/song.model';


// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  providers: [UserService, AlbumService, SongService]
})
export class SongAddComponent {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public song: Song;
  public identity: User;
  public token: string;
  public url: string;
  public alertMessage: any;

  constructor(private _userService: UserService,
              private _albumService: AlbumService,
              private _songService: SongService,
              private router: Router
  ){
    this.titulo = "Crear nueva canción";
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;

    this.artist = new Artist("", "", "", "");
    this.album = new Album("","","",0,"","");
    this.song = new Song("","","",0,"","");


    
    
    this.alertMessage = {type: "", message: ""};
    this.getAlbumData(this.router.url.split("/")[2]);
    
  }

  public getAlbumData(albumId: string): void{
      this._albumService.getAlbum(albumId, this.token).subscribe(
        response => {
          this.album = response.album
          console.log(this.album)
        }
      )
  }

  // public onSubmit(){
  //   // Agregamos al album el id del artista actual para luego utilizar el servicio
  //   let artistId = this.router.url.split("/")[2];
  //   this.album.artist = artistId

  //   // Agrego imagen placeholder para la primer carga
  //   this.album.image = "album-placeholder.jpg";

  //   this._albumService.addAlbum(this.token, this.album).subscribe(
  //     response =>{
  //       if(response.success){
  //         this.alertMessage.type = "success";
  //         this.alertMessage.message = "Se guardó el álbum con éxito.";
  //         this.router.navigate(['edit-album', response.data._id]);
  //       }else{
  //         this.alertMessage.type = "error";
  //         this.alertMessage.message = "Hubo un error al guardar el álbum."
  //       }
  //     }
  //   )
  // }

  public onSubmitAddSong(): void{
    // Agregamos a la cancion el id del album actual para luego utilizar el servicio
    let albumId = this.router.url.split("/")[2];
    this.song.album = albumId;

    this._songService.addSong(this.song, this.token).subscribe(
      response => {
        if(response.song){
          this.alertMessage.type = "success";
          this.alertMessage.message = "Se guardó la cancion con éxito.";
          //To-Do ver lo de arriba por que por ahora navego a otra ruta:
          this.router.navigate(['edit-song', response.song._id]);
        }else{
          this.alertMessage.type = "error";
          this.alertMessage.message = "Hubo un error al guardar la cancion.";
        }
      }
    );

  }


  // public fileChangeEvent(fileInput: any){

  // }

}
