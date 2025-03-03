import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';

import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistListComponent implements OnInit{
  public titulo: string;
  public artists: Artist[];
  public identity: User;
  public token: string;
  public url: string; 
  public next_page: number;
  public prev_page: number;
  public confirmado: string;

  constructor(
    private _userService: UserService,
    private _artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.titulo = "Artistas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artists = [];
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
    this.confirmado = "";
  }

  ngOnInit(): void {
    // Conseguir listado de artistas y asignarlo al listado artists
    this.getArtists();
  }

  public async getArtists(){
    await this.route.params.forEach((params: Params)=>{
      let page = +params['page'];
      if(!page){
        page = 1
      }else{
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page == 0){
          this.prev_page = 1;
        }
        
         this._artistService.getArtists(this.token, page).subscribe(
          response =>{
            if(!response.artists){
              alert("Error")
            }else{
              this.artists = response.artists;
            }
          }
        )
      }
    });
  }

  public onDeleteConfirm(id: string){
    this.confirmado = id;
  }

  public onCancelArtist(){
    this.confirmado = "";
  }

  public onDeleteArtist(id: string){
    this._artistService.deleteArtist(this.token, id).subscribe(
      (response) => {
        if(response.message){
          this.getArtists();
        }
      }
    );
  }

}