import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    HomeComponent,
    ArtistListComponent,
    AlbumListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
