import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { Album } from 'src/app/models/album.model';

// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})
export class ArtistDetailComponent {
  public titulo: string;
  public artist: Artist;
  public artistId: string;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: string;
  public albums: Album[];
  public confirmado: string;

  constructor(
    private router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService
  ){
    this.titulo = "Detalles de artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artist = new Artist("","","","");
    this.artistId = this.router.url;
    this.artistId = this.artistId.split("/")[2];
    this.url = GLOBAL.url;
    this.alertMessage = "";
    this.albums = []; 
    this.confirmado = "";
  }

  ngOnInit(): void {
    this.getArtist(this.token, this.artistId);
  }

  public getArtist(token: string, id: string): void{
    this._artistService.getArtist(token, id).subscribe(
      response =>{
        if(!response.name){
          this.router.navigate(['/']);
        }else{
          this.artist = response;
          // Buscar albums del artista
          this.getAlbums();
        }
      }
    );
  };

  public getAlbums(){
    this._albumService.getAlbums(this.artistId, this.token).subscribe(
      response =>{
        this.albums = response
      })
  }

  public onDeleteConfirm(id: string){
    this.confirmado = id;
  }

  public onCancelAlbum(){
    this.confirmado = "";
  }

  public onDeleteAlbum(id: string){
    this._albumService.deleteAlbum(this.token, id).subscribe(
      (response) => {
        if(response.message){
          this.getAlbums();
        }
      }
    );
  }
}
