import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from "rxjs";
import { Album } from '../models/album.model';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url: string;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  public addAlbum(token: string, album: Album):Observable<any>{
    let params = JSON.stringify(album);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'album', params, {headers: headers})
                        .pipe(map(res => res));
  }

  public getAlbum(id: string, token: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.get(this.url+'album/'+id, {headers})
                        .pipe(map(res => res));
  }

  public getAlbums(id: string = "", token: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.get(this.url+'albums/'+id, {headers})
                        .pipe(map(res => res));
  }

  public editAlbum(token: string, id: string , album: Album): Observable<any>{
    let params = JSON.stringify(album);

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.put(this.url+'album/'+id, params, {headers})
                        .pipe(map(res => res));
  }

  public deleteAlbum(token: string, id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.delete(this.url+'album/'+id, {headers})
                        .pipe(map(res => res));
  }
}
