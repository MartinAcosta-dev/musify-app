import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  public addArtist(token: string, artist: Artist){
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'artist', params, {headers: headers})
                        .pipe(map(res => res));
  }
}
