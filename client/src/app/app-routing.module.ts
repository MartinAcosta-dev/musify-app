import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistListComponent } from './components/artist/artist-list/artist-list.component';
import { AlbumListComponent } from './components/album/album-list/album-list.component';
import { ArtistAddComponent } from './components/artist/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist/artist-detail/artist-detail.component';
import { AlbumAddComponent } from './components/album/album-add/album-add.component';
import { AlbumEditComponent } from './components/album/album-edit/album-edit.component';
import { AlbumDetailComponent } from './components/album/album-detail/album-detail.component';
import { SongAddComponent } from './components/song/song-add/song-add.component';
import { SongEditComponent } from './components/song/song-edit/song-edit.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el AuthGuard
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';


const routes: Routes = [
  {path:'', component: LayoutComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full' },
      {path: 'home', component: HomeComponent },  // Ruta '/home' carga el componente Home
      {path: 'artists/:page', component: ArtistListComponent },
      {path: 'albums/:page', component: AlbumListComponent},
      {path: 'user-profile-data', component: UserEditComponent},
      {path: 'add-artist', component: ArtistAddComponent}, 
      {path: 'edit-artist/:id', component: ArtistEditComponent },
      {path: 'artist/:id', component: ArtistDetailComponent  },
      {path: 'add-album/:id', component: AlbumAddComponent  },
      {path: 'edit-album/:id', component: AlbumEditComponent  },
      {path: 'album/:id', component: AlbumDetailComponent},
      {path: 'add-song/:id', component: SongAddComponent  },
      {path: 'edit-song/:id', component: SongEditComponent  },
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige a login si no hay ruta
  { path: '**', redirectTo: '/login' }  // Ruta no encontrada redirige al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
