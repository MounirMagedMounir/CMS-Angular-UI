import { Injectable, signal } from '@angular/core';
import { UserResponse } from '../../interface/user-response';
import { UserApiService } from '../api/user/userApi.service';
import { ApiResponse } from '../../interface/api-response';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private userService: UserApiService) { }

  currentUser = signal<UserResponse | undefined | null>(undefined);
  isLoggedIn = signal<boolean>(false);
  isAdmin=  signal<boolean>(false);

  initializeAuthentication(): Promise<void> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      
      // If no token or refresh token is found, resolve with a "no authentication"
      if (!token || !refreshToken) {
        this.signout();
        resolve(); // No token found, so simply resolve and continue
      } else {
        this.userService.getcurrentUser().subscribe({
          next: (response: any) => {
            console.log("response succ" );
            const res = response as ApiResponse<Array<UserResponse>>;
            if (res.status === 200) {
              // User found, set the authentication state
              this.currentUser.set(res.data[0]);
              this.isLoggedIn.set(true);
              if (res.data[0].role.toString().includes('Admin')) {
                this.isAdmin.set(true);
              } else {
                this.isAdmin.set(false);
              }
              resolve(); // Authentication successful, resolve the promise
            } else {
              // If user data is not found, clear the state and reject
              this.signout();
              reject('User not found');
            }
          },
          error: (error) => {
            // If there's an error fetching the user, clear the state and reject
            // this.signout();
            reject('Error fetching user: ' + error.message);
          }
        });
      }
    });
  }
  
  login(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    this.userService.getcurrentUser().subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<UserResponse>>;
        if (res.status === 200) {
          console.log("res.data[0] " );
          this.currentUser.set(res.data[0]);
              this.isLoggedIn.set(true);
              if (res.data[0].role.toString().includes('Admin')) {
                this.isAdmin.set(true);
              }
              else {
                this.isAdmin.set(false);
              }
        }
        else if (res.status === 404) {
          this.signout();
        } 
      },
      error: (error) => {
        this.signout();
        console.log("server error " + error.message);
      }
    });


  }
  
  signout() {
    
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

  }
}
