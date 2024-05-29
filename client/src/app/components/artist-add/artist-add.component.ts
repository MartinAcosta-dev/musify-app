import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';

import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';

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

  constructor(
    private _userService: UserService,
    private _artistService: ArtistService
  ){
    this.titulo = "Crear nuevo artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artist = new Artist("","","");
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    alert(this._artistService.addArtist());
  }

  public onSubmit(){
    console.log("Hola desde onSubmit");
  }
}
