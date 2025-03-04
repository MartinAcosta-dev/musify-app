import { Component } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {
  isCollapsed = false;
  public title : string = "MUSIFY"

  constructor(private router: Router){

  }

  // Método para alternar entre expandir y contraer el sidebar
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Método para cerrar sesión
  public logout(){
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    this.router.navigate(['/']);
    window.location.reload();
  }
}
