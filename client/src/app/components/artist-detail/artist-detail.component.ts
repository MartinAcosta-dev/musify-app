import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistDetailComponent {
  public titulo: string;
  public artist: Artist;
  public artistId: string;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: string;
  public albums = [];

  constructor(
    private router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    
  ){
    this.titulo = "Detalles de artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artist = new Artist("","","","");
    this.artistId = this.router.url;
    this.artistId = this.artistId.split("/")[2];
    this.url = GLOBAL.url;
    this.alertMessage = "";
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
        }
      }
    );
  };
}
