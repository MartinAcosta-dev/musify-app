import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { PlayerComponent } from './components/player/player.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    HomeComponent,
    ArtistListComponent,
    AlbumListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LeftSidebarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
