import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';


// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UserService]
})
export class AlbumAddComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public identity: User;
  public token: string;
  public url: string;
  public alertMessage: any;

  constructor(private _userService: UserService,
              private _albumService: AlbumService,
              private router: Router
  ){
    this.titulo = "Agregar album";
    this.artist = new Artist("", "", "", "");
    this.album = new Album("","","",0,"","");
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
    this.alertMessage = {type: "", message: ""};
  }

  ngOnInit(){
    console.log("Album cargado");
  }

  public onSubmit(){
    // Agregamos al album el id del artista actual para luego utilizar el servicio
    let artistId = this.router.url.split("/")[2];
    this.album.artist = artistId

    // Agrego imagen placeholder para la primer carga
    this.album.image = "album-placeholder.jpg";

    this._albumService.addAlbum(this.token, this.album).subscribe(
      response =>{
        if(response.success){
          this.alertMessage.type = "success";
          this.alertMessage.message = "Se guardó el álbum con éxito.";
          this.router.navigate(['edit-album', response.data._id]);
        }else{
          this.alertMessage.type = "error";
          this.alertMessage.message = "Hubo un error al guardar el álbum."
        }
      }
    )
  }


  public fileChangeEvent(fileInput: any){

  }

}
