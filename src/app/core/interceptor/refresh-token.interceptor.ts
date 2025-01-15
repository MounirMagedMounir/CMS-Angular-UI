import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { userAuthenticationApiService } from '../services/api/userAuthentication/userauthenticationApi.service';
import { ApiResponse } from '../interface/api-response';
import { AuthResponse } from '../interface/auth-response';
import {  throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';


export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthApi = inject(userAuthenticationApiService);
  const auth = inject(AuthenticationService);
  const token = localStorage.getItem('token') ?? '';
  const refreshToken = localStorage.getItem('refreshToken') ?? '';
  if (token && refreshToken && isTokenExpired(token)&&!req.url.includes('/UserAuthentication/RefreshToken')) {
    // console.log('Token expired, attempting refresh...');
    
    return userAuthApi.refreshToken(JSON.stringify(refreshToken)).pipe(
      switchMap(
        (response:any) => {
          // console.log('Token refresh response:', response);
          const res = response as ApiResponse<Array<AuthResponse>>;
          if (res.status === 200) {
            const newToken = res.data[0].token;
            const newRefreshToken = res.data[0].refreshToken;
            // console.log('Token refreshed successfully', newToken);

            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(clonedReq);
          } else {
            console.error('Token refresh failed:', res.status);
            clearSessionAndRedirect(auth);
            return throwError(() => new Error('Token refresh failed.'));
          }   
     
      }),
      catchError((error) => {
        console.error('Refresh token API error:', error.message);
        clearSessionAndRedirect(auth);
        return throwError(() => new Error('Token refresh failed.'));
      })
    );
  }
// console.log('Token is not expired or no token found');
  // If no refresh is needed, forward the request as is
  return next(req);
};

function decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`) 
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function getTokenExpiry(token: string): number {
  const decoded = decodeToken(token);
  return decoded ? decoded.exp * 1000 : 0; // Convert to milliseconds
}

function isTokenExpired(token: string): boolean {
  const expiry = getTokenExpiry(token);
  // console.log('Token expiry:', expiry);
  return !expiry || Date.now() >= expiry;
}

function clearSessionAndRedirect(auth:AuthenticationService): void {

  auth.signout();
  window.location.href = '/login'; // Adjust the path as needed
}
