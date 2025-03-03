import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';

import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  providers: [UserService, AlbumService]
})
export class AlbumListComponent implements OnInit{
  public titulo: string;
  public albums: Album[];
  public identity: User;
  public token: string;
  public url: string; 
  public next_page: number;
  public prev_page: number;
  public confirmado: string;

  constructor(
    private _userService: UserService,
    private _albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.titulo = "Albums";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.albums = [];
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
    this.confirmado = "";
  }

  ngOnInit(): void {
    // Conseguir listado de artistas y asignarlo al listado artists
    this.getAlbums();
  }

  public async getAlbums(){
  
    this._albumService.getAlbums("", this.token).subscribe(
      response =>{
          this.albums = response;
          console.log(this.albums)
      })
    
  } ;
  
  

  public onDeleteConfirm(id: string){
    this.confirmado = id;
  }

  public onCancelAlbum(){
    this.confirmado = "";
  }

  public onDeleteAlbum(id: string){
    this._albumService.deleteAlbum(this.token, id).subscribe(
      (response) => {
        if(response){
          this.getAlbums();
        }
      }
    );
  }

}