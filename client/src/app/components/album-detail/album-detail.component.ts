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
      this.album = new Album("","","",0,"","");
      this.albumId = this.router.url;
      this.albumId = this.albumId.split("/")[2];
      this.artist = new Artist("","","","");
      this.url = GLOBAL.url;
      this.alertMessage = "";
      this.songs = []; 
      this.confirmado = "";
  }

  ngOnInit(): void {
    this.getAlbum(this.albumId, this.token)
    console.log("hola desde ngOnInit de albumDetails");
    console.log(this.album)
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
          console.log(this.album);
        }
      }
    );
  };

  public getSongs(){
    console.log("to do getSongs")
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
        if(response.message){
          this.getSongs();
        }
      }
    );
  }

}
