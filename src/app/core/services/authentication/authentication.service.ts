import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private api:ApiService) { }

  logIn(data:any){
   return this.api
    .Post('/UserAuthentication/login', null, data);
  }
  adminLogIn(data:any){
    return this.api
     .Post('/AdminAuthentication/login', null, data);
   }
 


}
