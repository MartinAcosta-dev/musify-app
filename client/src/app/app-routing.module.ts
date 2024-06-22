import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'artists/:page', component: ArtistListComponent },
  {path: 'albums', component: AlbumListComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'add-artist', component: ArtistAddComponent}, 
  {path: 'edit-artist/:id', component: ArtistEditComponent },
  {path: 'artist/:id', component: ArtistDetailComponent  },
  {path: 'add-album', component: AlbumAddComponent  },
  {path: '**', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
