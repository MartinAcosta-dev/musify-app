import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { map } from "rxjs/operators";
import { Artist } from '../models/artist.model';

@Injectable()
export class ArtistService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public addArtist(token: string, artist: Artist):Observable<any>{
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'artist', params, {headers: headers})
                        .pipe(map(res => res));
  }

  public getArtists(token: string, page: number): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.get(this.url+'artists/'+page, {headers})
                        .pipe(map(res => res));
  }

  public getArtist(token: string, id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.get(this.url+'artist/'+id, {headers})
                        .pipe(map(res => res));
  }

  public editArtist(token: string, id: string, artist: Artist): Observable<any>{
    let params = JSON.stringify(artist);

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.put(this.url+'artist/'+id, params , {headers})
                        .pipe(map(res => res));
  }

  public deleteArtist(token: string, id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });
  
    return this._http.delete(this.url+'artist/'+id, {headers})
                        .pipe(map(res => res));
  }
}
