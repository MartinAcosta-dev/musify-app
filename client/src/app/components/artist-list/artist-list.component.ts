import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';

import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService]
})
export class ArtistListComponent implements OnInit{
  public titulo: string;
  public artists: Artist[];
  public identity: User;
  public token: string;
  public url: string; 

  constructor(
    private _userService: UserService
  ){
    this.titulo = "Artistas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artists = [];
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    // Conseguir listado de artistas y asignarlo al listado artists
  }
}
