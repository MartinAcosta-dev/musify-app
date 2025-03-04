import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

// Modelos
import { Artist } from 'src/app/models/artist.model';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { Song } from 'src/app/models/song.model';

// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { AlbumService } from 'src/app/services/album.service';
import { UploadService } from 'src/app/services/upload.service';
import { SongService } from 'src/app/services/song.service';


@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css'],
  providers: [UserService, AlbumService, UploadService, SongService]
})
export class SongEditComponent {

  public titulo: string;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: any;
  public filesToUpload: Array<File>;
  public artist: Artist;
  public album: Album;
  public song : Song;
  public songId: string;
  public apiUrl = GLOBAL.url;

  constructor(private router: Router, private route: ActivatedRoute,
    private _userService: UserService,
    private _songService: SongService,
    private _uploadService: UploadService
  ){
    this.titulo = "Editar canción";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.alertMessage = {type: "", message: ""};
    this.songId = this.router.url;
    this.songId = this.songId.split("/")[2];
    this.filesToUpload = [];
    this.artist = new Artist("","","","");
    this.album = new Album("","","",0,"", this.artist)
    this.song = new Song("","",0,0,"", this.album);

  }

  ngOnInit(): void {
    this._songService.getSong(this.token, this.songId).subscribe(
      response =>{
        this.song = response.song
        console.log(this.song);
      }
    )
  }


  public onSubmit(){
    this._songService.editSong(this.token,this.songId, this.song).subscribe( 
      (response) => {       
        console.log(response);
        if(response.album){
          // Doy mensaje OK
          this.alertMessage.type = "success";
          this.alertMessage.message = "Se actualizó el álbum con éxito."

          // Chequeo si hay que subir otro fichero de audio
          if (this.filesToUpload && this.filesToUpload.length > 0) {
            this.makeFileRequest(this.apiUrl + "upload-song/" + this.song._id, [], this.filesToUpload)
              .then( (res) => {
                this.alertMessage = "El usuario se ha actualizado correctamente.";
              })
              .catch(makeFileError => {
                console.error('Error en la solicitud de subida de archivos:', makeFileError);
                // Manejar el error de subida de archivos aca si es necesario
              });
          } else {
            // No hay archivos para subir, solo actualizar el usuario
            this.alertMessage = "El usuario se ha actualizado correctamente.";
          }
        }else{
          this.alertMessage.type = "error";
          this.alertMessage.message = "Error al actualizar el álbum."
        }
      });
  }

  public fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

  public async makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    let token = this.token;
    var formData : any = new FormData();
    for(var i = 0; i < files.length; i++){
      formData.append('song', files[i], files[i].name);
    }
    
    let response: any = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token
      }
    });

    let responseData = await response.json();
    return responseData
  }

}


