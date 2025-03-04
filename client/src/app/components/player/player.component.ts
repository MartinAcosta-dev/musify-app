import { Component, OnInit } from '@angular/core';

// Modelos
import { Song } from 'src/app/models/song.model';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';

// Servicios
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [UserService, AlbumService, SongService, ArtistService]
})
export class PlayerComponent implements OnInit {
  public url: string;
  public identity: string;
  public token: string;
  public song: Song;
  public artist: Artist;
  public album: Album;
  public albumImage: string;
  public artistID: string;
  public artistName: String;

  constructor( private _userService: UserService, private _albumService: AlbumService, private _artistService: ArtistService){
    this.url = GLOBAL.url
    this.token = _userService.getToken();
    this.identity = _userService.getIdentity();
    this.artist = new Artist("", "", "", "");
    this.album = new Album("", "", "", 0,"", this.artist);
    this.song = new Song("","", 0, 0,"", this.album)
    this.albumImage = "";
    this.artistName = "";
    this.artistID = "";
  }

  ngOnInit(){
    let storedSong = localStorage.getItem("playing_song");

    // Persistir cancion que se estaba escuchando antes
    if (storedSong !== null){
      this.song = JSON.parse(storedSong); 

      let artistID = this.song.album.artist._id;

      this._artistService.getArtist(this.token, artistID).subscribe(
        (res) => {
          this.artist = res;
          this.artistName = this.artist.name;
          this.artistID = this.artist._id;
        }
      )

      let storedAlbumImage = localStorage.getItem("playing_song_album_image");

      if(storedAlbumImage !== null){
        this.albumImage = storedAlbumImage;
        (document.getElementById("player") as any).load();
        (document.getElementById("player") as any).play();
      }

    }else{
      this.song = new Song("","", 0, 0,"", this.album)
    }
  }
}
