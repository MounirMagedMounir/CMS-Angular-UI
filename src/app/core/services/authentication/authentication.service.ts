import { Injectable, signal } from '@angular/core';
import { User } from '../../interface/user';
import { UserApiService } from '../api/user/userApi.service';
import { ApiResponse } from '../../interface/api-response';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private userService: UserApiService) { }

  currentUser = signal<User | undefined | null>(undefined);
  IsLoggedIn = signal<boolean>(false);


  login(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    this.userService.getcurrentUser().subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<User>>;
        if (res.status === 200) {
          this.currentUser.set(res.data[0]);
        }
        else if (res.status === 404) {
          this.logout();
          res.message.forEach((element: any) => { console.log("eelementrror " + element); });
        } 
      },
      error: (error) => {
        this.logout();
        console.log("server error " + error.message);
      }
    });
    this.IsLoggedIn.set(true);

  }
  logout() {
    
    this.currentUser.set(null);
    this.IsLoggedIn.set(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

  }
}
