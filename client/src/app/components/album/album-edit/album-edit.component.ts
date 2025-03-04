import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

// Modelos
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';

// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { AlbumService } from 'src/app/services/album.service';
import { UploadService } from 'src/app/services/upload.service';
import { Artist } from 'src/app/models/artist.model';


@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css'],
  providers: [UserService, AlbumService, UploadService]
})
export class AlbumEditComponent {

  public titulo: string;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: any;
  public filesToUpload: Array<File>;
  public artist: Artist;
  public album : Album;
  public albumId: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _uploadService: UploadService
  ){
    this.titulo = "Editar álbum";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.alertMessage = {type: "", message: ""};
    this.albumId = this.router.url;
    this.albumId = this.albumId.split("/")[2];
    this.filesToUpload = [];
    this.artist = new Artist("", "", "", "");
    this.album = new Album("","","",0,"",this.artist);

  }

  ngOnInit(): void {
    this._albumService.getAlbum(this.albumId, this.token).subscribe(
      response =>{
        this.album = response.album
      }
    )
  }


  public onSubmit(){
    this._albumService.editAlbum(this.token,this.albumId, this.album).subscribe( 
      (response) => {        
        if(response.success){
          this.alertMessage.type = "success";
          this.alertMessage.message = "Se actualizó el álbum con éxito."
          
          if(this.filesToUpload.length != 0){
            // Subir imagen del album
            this._uploadService.makeFileRequest(this.url + "/upload-image-album/" + this.albumId,[],this.filesToUpload, this.token, "image")
            .then(
              (result)=>{
                this.album = result.album;
              },
              (error)=>{
                console.log("Error al intentar actualizar la imagen del album");
                console.log(error);
              }
            )
          }
          
          
        }else{
          this.alertMessage.type = "error";
          this.alertMessage.message = "Error al actualizar el álbum."
        }
      });

      document.getElementById("router-outlet-container")?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  public fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}


