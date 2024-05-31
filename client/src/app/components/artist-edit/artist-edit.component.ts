import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [UserService, ArtistService, UploadService]
})
export class ArtistEditComponent implements OnInit {

  public titulo: string;
  public artist: Artist;
  public identity: User;
  public token: string;
  public url: string; 
  public alertMessage: string;
  public isEdit: any = "";
  public artistId: string;
  public filesToUpload: Array<File>;

  constructor(private router: Router, private route: ActivatedRoute,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadService: UploadService
  ){
    this.titulo = "Editar artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artist = new Artist("","","");
    this.url = GLOBAL.url;
    this.alertMessage = "";
    this.artistId = this.router.url;
    this.artistId = this.artistId.split("/")[2];
    this.filesToUpload = [];
  }

  ngOnInit(): void {
    this.getArtist(this.token, this.artistId); 
  }

  public getArtist(token: string, id: string): void{
      this._artistService.getArtist(this.token, id).subscribe(
        response =>{
          if(!response.name){
            this.router.navigate(['/']);
          }else{
            this.artist = response;
          }
        }
      );
    };

  public onSubmit(){
    this._artistService.editArtist(this.token,this.artistId, this.artist).subscribe( 
      (response) => {        
        if(!response.artist){
          this.alertMessage = "Error en la respuesta del servidor al servicio de artista";
        }else{
          this.alertMessage = "El artista se editó correctamente.";
          this.artist = response.artist;

          // Subir la imagen del artista
          this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+this.artistId,[],this.filesToUpload, this.token, 'image' )
            .then(
              (result)=>{
                console.log("se subio la imagen del artista")
              },
              (error)=>{
                alert("error");
              }
            )
        }

      });
  }

  public fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
