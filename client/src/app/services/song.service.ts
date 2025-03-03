import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { map } from "rxjs/operators";
import { Song } from '../models/song.model';

@Injectable()
export class SongService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public addSong(song: Song, token: string ):Observable<any>{
    let params = JSON.stringify(song);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'song', params, {headers: headers})
                        .pipe(map(res => res));
  }

  public getSongs(albumId: string, token: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.get(this.url+'songs/'+albumId, {headers})
                        .pipe(map(res => res));
  }

  // Obtener cancion de la base
  public getSong(token: string, songId: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.get(this.url+'song/'+songId, {headers})
                        .pipe(map(res => res));
  }

  public editSong(token: string, id: string, song: Song): Observable<any>{
    let params = JSON.stringify(song);

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.put(this.url+'song/'+id, params , {headers})
                        .pipe(map(res => res));
  }

  public deleteSong(token: string, id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.delete(this.url+'song/'+id, {headers})
                        .pipe(map(res => res));
  }
}
