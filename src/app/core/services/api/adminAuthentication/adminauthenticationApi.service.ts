import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthenticationApiService {

  constructor(private api:ApiService) { }
  logIn(data:any){
    return this.api
     .Post('/AdminAuthentication/login', null, data);
   }
 
}
