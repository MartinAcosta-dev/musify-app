import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { map } from "rxjs/operators";

// Este servicio se encarga de consultar a la API por cualquier petición de usuarios
@Injectable()
export class UserService {
  private url: string;
  private identity: any = null;
  private token: any = null;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Método para hacer registro de usuario
  public registerUser(user_to_register: any): Observable<any> {
    let json = JSON.stringify(user_to_register);
    let params = json;
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'register', params, { headers: headers })
      .pipe(
        map((res: any) => {
          return res; // Retornamos la respuesta para usarla en el componente
        })
      );
  }

  // Método para hacer login
  public signUp(user_to_login: any, gethash: any = null): Observable<any> {
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'login', params, { headers: headers })
      .pipe(
        map((res: any) => {
          if (res && res.user) {
            this.setIdentity(res.user); // Guardamos la identidad del usuario
            localStorage.setItem('token', res.token); // Guardamos el token
          }
          return res; // Retornamos la respuesta para usarla en el componente
        })
      );
  }

  // Método para almacenar la identidad en el localStorage
  private setIdentity(user: any) {
    this.identity = user;
    localStorage.setItem('identity', JSON.stringify(user)); // Guardamos la identidad en el localStorage
  }

  // Método para obtener la identidad almacenada
  public getIdentity() {
    if (!this.identity) {
      let localStorageIdentity = localStorage.getItem('identity');
      if (localStorageIdentity != null) {
        this.identity = JSON.parse(localStorageIdentity);
      }
    }
    return this.identity;
  }

  // Método para obtener el token almacenado
  public getToken(): string {
    if (!this.token) {
      let localStorageToken = localStorage.getItem('token');
      if (localStorageToken != null) {
        this.token = localStorageToken;
      }
    }
    return this.token;
  }

  // Método para actualizar datos de usuario (requiere autenticación)
  public updateUser(user_to_update: any): Observable<any> {
    let json = JSON.stringify(user_to_update);
    let params = json;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken() // Usamos el token almacenado en el header
    });

    return this._http.put(this.url + 'users/' + user_to_update._id, params, { headers: headers })
      .pipe(map((res: any) => res));
  }

  // Método para obtener los datos de usuario de un endpoint específico
  public getUserData(user_id: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken() // Usamos el token almacenado en el header
    });

    return this._http.get(this.url + 'users/' + user_id, { headers: headers })
      .pipe(map((res: any) => res));
  }
}
