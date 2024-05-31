import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url: string;

  constructor() { 
    this.url = GLOBAL.url;
  }

  public async makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
    
    var formData : any = new FormData();
    for(var i = 0; i < files.length; i++){
      formData.append(name, files[i], files[i].name);
    }
    
    let response: any = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token
      }
    });

    let responseData = await response.json();

    return responseData
  }

}
