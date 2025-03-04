import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title = 'MUSIFY';
  public user: User = new User('','','','','','ROLE_USER','');
  public userRegister: User = new User('','','','','','ROLE_USER','');;
  public apiUrl: string = GLOBAL.url;;

  public identity: any = {};
  public token: string = "";
  public errorMessage: any = '';
  public alertMessage: any = '';

  public alertRegister: string = "";

  constructor(
    private _userService: UserService, private router: Router
  ){
    //Ni bien carga la app le asignamos valor a identity y a token
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.identity != null){
      this.router.navigate(['/'])
    }
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
                
                this.router.navigate(['/']);
              }
            });
          }
        },
        (error) => {
          if(error.status == 404){
            this.alertMessage = "No se encontró al usuario"
          }
        }
    );

  }

  public onLoginSubmit2() {
    this._userService.signUp(this.user).subscribe(
      (res) => {
        if (res && res.user) {
          // Si la autenticación es exitosa, redirigir a la página de inicio
          this.router.navigate(['/']);
        } else {
          alert('No se pudo autenticar el usuario');
        }
      }
    );
  }

}
