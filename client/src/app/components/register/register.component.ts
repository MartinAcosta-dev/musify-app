import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GLOBAL } from 'src/app/services/global';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user: User = new User("", "", "", "","", "ROLE_USER", "");

  public apiUrl: string = GLOBAL.url;;
  
  public identity: any = {};
  public token: string = "";
  public alertMessage: string = "";
  public errorMessage: string = "";

  public alertRegister: string = "";

  constructor(
      private _userService: UserService, private router: Router
    ){
      //Ni bien carga la app le asignamos valor a identity y a token
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

  public onRegisterSubmit(){
    this._userService.registerUser(this.user).subscribe(
      (res) => {
        if (res.error) {
          this.errorMessage = res.error.message;
        }else{
          this.alertMessage = "El usuario se ha registradoooo"
        }
      }
    )
  }

}
