import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit{
  public title = 'MUSIFY';
  public user: User = new User('','','','','','ROLE_USER','');
  public userRegister: User = new User('','','','','','ROLE_USER','');;
  public apiUrl: string = GLOBAL.url;;

  public identity: any = {};
  public token: string = "";
  public errorMessage: any = '';

  public alertRegister: string = "";

  sidebarVisible = false; // Variable para controlar la visibilidad del sidebar

  // Método para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  constructor(
    private _userService: UserService, private router: Router
  ){
    //Ni bien carga la app le asignamos valor a identity y a token
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.identity == null){
      this.router.navigate(['/login']);
    }
  }

  public logout(){
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    this.identity = null;
    this.token = "";
    this.errorMessage = "";
    this.alertRegister = "";

    window.location.reload();
  }

}