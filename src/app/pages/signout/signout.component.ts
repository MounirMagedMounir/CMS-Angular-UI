import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userAuthenticationApiService } from '../../core/services/api/userAuthentication/user-authentication-api.service';
import { ApiResponse } from '../../core/interface/api-response';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signout',
  imports: [ProgressSpinner],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss',
})
export class SignoutComponent implements OnInit {
  constructor(
    private router: Router,
    private userAuthApi: userAuthenticationApiService,
    private auth: AuthenticationService,
    private messageService: MessageService
  ) {}



  ngOnInit(): void {
    this.userAuthApi.signOut(null).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<null>;
        if (res.status === 200) {
          this.auth.signout();
          this.router.navigate(['/']);
        } else if (res.status === 404) {
      
          this.messageService.add({
            key: 'toast',
            sticky: true,
            severity: 'error',
            summary: res.message.toString(),
          });
          this.auth.signout();
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          sticky: true,
          severity: 'error',
          summary: 'some thing went wrong',
          detail: 'please try again later.',
        });
        this.router.navigate(['/']);
        console.log('server error ' + error);
      },
    });
  }
}
