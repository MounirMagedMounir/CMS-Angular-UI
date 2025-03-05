import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginRequest } from '../../../interface/auth/login-request';

@Injectable({
  providedIn: 'root'
})
export class AdminauthenticationApiService {

  constructor(private api:ApiService) { }
  logIn(data:LoginRequest){
    return this.api
     .Post('/AdminAuthentication/login', null, data);
   }
 
}
