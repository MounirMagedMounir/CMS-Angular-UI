import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginRequest } from '../../../interface/auth/login-request';
import { EmailVerificationRequest } from '../../../interface/auth/email-verification-request';
import { RegisterRequest } from '../../../interface/auth/register-request';

@Injectable({
  providedIn: 'root'
})
export class userAuthenticationApiService {

  constructor(private api:ApiService) { }

  logIn(data:LoginRequest){
    
   return this.api
    .Post('/UserAuthentication/login', null, data);
  }
  register(data:RegisterRequest){
   return this.api
    .Post('/UserAuthentication/register', null, data);
  }
  emailVerification(data:EmailVerificationRequest){
   return this.api
    .Post('/UserAuthentication/EmailVerification', null, data);
  }
  signOut(){
   return this.api
    .Post('/UserAuthentication/SignOut', null, null);
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
