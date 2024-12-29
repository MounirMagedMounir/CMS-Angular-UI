import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class userAuthenticationApiService {

  constructor(private api:ApiService) { }

  logIn(data:any){
   return this.api
    .Post('/UserAuthentication/login', null, data);
  }
  register(data:any){
   return this.api
    .Post('/UserAuthentication/register', null, data);
  }
  emailVerification(data:any){
   return this.api
    .Post('/UserAuthentication/EmailVerification', null, data);
  }
  signOut(data:any){
   return this.api
    .Post('/UserAuthentication/SignOut', null, data);
  }
  refreshToken(data:any){
   return this.api
    .Post('/UserAuthentication/RefreshToken', null, data);
  }
  forgetPassword(data:any){
   return this.api
    .Post('/UserAuthentication/ForgetPassword', null, data);
  }



}
