import { Injectable, signal } from '@angular/core';
import { UserResponse } from '../../interface/user/user-response';
import { UserApiService } from '../api/user/user-api.service';
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
    return new Promise((resolve) => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
  
      // If no token or refresh token is found, clear state and continue.
      if (!token || !refreshToken) {
        this.signout();
        resolve(); // Resolve and continue
      } else {
        this.userService.getcurrentUser().subscribe({
          next: (response: any) => {
            const res = response as ApiResponse<Array<UserResponse>>;
            if (res.status === 200) {
              // User found, update authentication state
              this.currentUser.set(res.data[0]);
              this.isLoggedIn.set(true);
              console.log("authenticating serves");
  
              if (res.data[0].role.toString().includes('Admin')) {
                this.isAdmin.set(true);
              } else {
                this.isAdmin.set(false);
              }
              resolve(); // Resolve after successful authentication
            } else {
              // User not found – clear state and resolve
              this.signout();
              resolve();
            }
          },
          error: (error) => {
            // On error, log it, clear state, and resolve so the app can continue.
            console.error('Error fetching user:', error.message);
            this.signout();
            resolve();
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
    console.log("signout");
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.isAdmin.set(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

  }
}
