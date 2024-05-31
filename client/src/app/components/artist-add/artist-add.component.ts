import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';

import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: string;

  constructor(
    private _userService: UserService,
    private _artistService: ArtistService,
    private router: Router
  ){
    this.titulo = "Crear nuevo artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artist = new Artist("","","");
    this.url = GLOBAL.url;
    this.alertMessage = "";
  }

  ngOnInit(): void {
    
  }

  public onSubmit(){
    this._artistService.addArtist(this.token, this.artist).subscribe( 
      (response) => {        

        if(!response.artist){
          this.alertMessage = "Error en la respuesta del servidor al servicio de artista";
        }else{
          this.alertMessage = "El artista se creó correctamente.";
          this.artist = response.artist;
          this.router.navigate(['edit-artist', response.artist._id])
        }

      });
  }

  public fileChangeEvent(evento: Event){

  }
}
