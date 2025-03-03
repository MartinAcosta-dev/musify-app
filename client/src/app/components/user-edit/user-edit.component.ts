import { Component , OnInit} from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService],
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{

  public titulo: string;
  public user: User;
  private identity: User;
  private token: string;
  public alertMessage: string = "";
  public apiUrl = GLOBAL.url;

  constructor(
    private _userService: UserService
  ){
    console.log("Ejecutandose el constructor de user-edit component.ts");

    // LocalStorage
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.titulo = "Datos de mi cuenta";
    this.user = this.identity;
    this.user.password = "";

  }

  ngOnInit(): void {

  }

  public onSubmit() {
    this._userService.updateUser(this.user).subscribe(
      updateUserResponse => {
        if (!updateUserResponse) {
          this.alertMessage = "El usuario no se ha actualizado.";
        } else {
          // Seteo localStorage con el nuevo usuario
          localStorage.setItem('identity', JSON.stringify(this.user));
  
          // Solución rápida para cambiar el valor del nombre en la vista luego de actualizarlo
          let identityNameElement = document.getElementById("identity_name");
          if (identityNameElement) {
            identityNameElement.innerHTML = this.user.name;
          }
  
          if (this.filesToUpload && this.filesToUpload.length > 0) {
            this.makeFileRequest(this.apiUrl + "upload-image-user/" + this.user._id, [], this.filesToUpload)
              .then(makeFileResponse => {
                this.user = makeFileResponse.user;
                localStorage.setItem('identity', JSON.stringify(this.user));
  
                this.alertMessage = "El usuario se ha actualizado correctamente.";
              })
              .catch(makeFileError => {
                console.error('Error en la solicitud de subida de archivos:', makeFileError);
                // Manejar el error de subida de archivos aca si es necesario
              });
          } else {
            // No hay archivos para subir, solo actualizar el usuario
            console.log("usuario luego de la peticion de imagen");
            console.log(this.user);
            this.alertMessage = "El usuario se ha actualizado correctamente.";
          }
        }
      },
      updateUserError => {
        let errorMessage = <any>updateUserError;
  
        if (errorMessage != null) {
          var body = JSON.parse(updateUserError._body);
          this.alertMessage = "Error al actualizar el usuario: " + body.message;
          console.log(updateUserError);
        }
      }
    );
  }
  

  public filesToUpload: Array<File> = [];

  public fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  public async makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    let token = this.token;
    var formData : any = new FormData();
    for(var i = 0; i < files.length; i++){
      formData.append('image', files[i], files[i].name);
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

