import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

import { GLOBAL } from 'src/app/services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'MUSIFY';
  public user: User = new User('','','','','','ROLE_USER','');
  public userRegister: User = new User('','','','','','ROLE_USER','');;
  public apiUrl: string = GLOBAL.url;;

  public identity: any = {};
  public token: string = "";
  public errorMessage: any = '';

  public alertRegister: string = "";

  constructor(
    private _userService: UserService
  ){
    
  }

  ngOnInit(){
    //Ni bien carga la app le asignamos valor a identity y a token
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onLoginSubmit(){
    // Conseguir datos de usuario identificado
    this._userService.signUp(this.user).subscribe( 
      (response) => {        
        this.identity = response.user;
        if(!this.identity){
          alert("El usuario no esta correctamente identificado");
        }else{
          // Crear sesion en el localStorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token para enviarselo a cada peticion http
          this._userService.signUp(this.user, true).subscribe( 
          (response) => {        
            this.token = response.token;
            if(this.token.length <= 0){
              alert("El token no se ha generado");
            }else{              
              // Crear elemento en el localstorage para tener token disponible
              localStorage.setItem('token', this.token);

              this.user = new User('','','','','','ROLE_USER','');
            }
          });
        }
      }
    );
  }

  public logout(){
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    this.identity = null;
    this.token = "";
    this.errorMessage = "";
    this.alertRegister = "";
  }

  public onSubmitRegister(){
    this._userService.register(this.userRegister).subscribe( 
      (response) => {        
        let message = "Te has registrado correctamente. Inicia sesion con "+this.userRegister.email;
        this.alertRegister = message;
        this.userRegister = new User('','','','','','ROLE_USER','');
      },
      (error) => {
        this.errorMessage = <any>error;
        this.errorMessage = this.errorMessage.error.error;      
      }    
      );
  }
}