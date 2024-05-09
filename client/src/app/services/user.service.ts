import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { map } from "rxjs/operators";

// Este servicio se encarga de consultar a la API por cualquier peticion de usuarios
@Injectable()
export class UserService{
    private url: string;
    private identity: any = null;
    private token: any = null;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    public signUp(user_to_login: any, gethash: any = null,): Observable<any>{
        if(gethash != null){
            user_to_login.gethash = gethash;
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post(this.url + 'login', params, {headers: headers})
                        .pipe(map(res => res));
    }

    public register(user_to_register: any): Observable<any>{
        let json = JSON.stringify(user_to_register);
        let params = json;

        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post(this.url + 'register', params, {headers: headers})
                        .pipe(map(res => res));
    }

    public getIdentity(){
        let localStorageIdentity = localStorage.getItem("identity");
        if (localStorageIdentity != null){
            let identity = JSON.parse(localStorageIdentity);
            this.identity = identity;
        }

        return this.identity;
    }

    public getToken(): string{
        let localStorageToken = localStorage.getItem("token");

        if (localStorageToken != null){
            let token = localStorageToken;
            this.token = token;
        }

        return this.token;
    }

    public updateUser(user_to_update: any): Observable<any>{
        let json = JSON.stringify(user_to_update);
        let params = json;

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put(this.url + 'users/'+user_to_update._id, params, {headers: headers})
                        .pipe(map(res => res));
    }

}