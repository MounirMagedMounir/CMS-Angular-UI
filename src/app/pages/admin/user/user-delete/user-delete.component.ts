import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../../core/interface/api-response';
import { UserResponse } from '../../../../core/interface/user/user-response';
import { UserApiService } from '../../../../core/services/api/user/user-api.service';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-user-delete',
  imports: [ButtonModule,RouterLink],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})

export class UserDeleteComponent {

  constructor(
    protected auth:AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private messageService: MessageService
  ) {}
  user:any={
    name:'',
    email: ''
  };
  
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userApi.getUserById({ UserId: userId }).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<UserResponse>>;
        if (res.status === 200) {
         this.user.name=res.data[0].name;
          this.user.email=res.data[0].email;
        } else if (res.status === 400) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'user not found',
            detail: res.message.toString(),
          });
          console.error(res);
          setTimeout(() => {
            this.router.navigate(['/admin/user/dashboard']);
          }, 2000);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'An error occurred while fetching user user.',
          detail: error.message,
        });

        console.error(error);
      },
    });
  }

  onDeletePermanentUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userApi.DeletePermanentUser({ UserId: userId }).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<UserResponse>>;
        if (res.status === 200) {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'User deleted successfully',
            detail: res.message.toString(),
          });
          setTimeout(() => {
            this.router.navigate(['/admin/user/dashboard']);
          }, 2000);
        } else {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while deleting user.',
            detail: res.message.toString(),
          });
          console.error(res);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'An error occurred while deleting user.',
          detail: error.message,
        });
        console.error(error);
      },
    });
  }

  onDeleteUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userApi.DeleteUser({ UserId: userId }).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<UserResponse>>;
        if (res.status === 200) {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'User deleted successfully',
            detail: res.message.toString(),
          });
          setTimeout(() => {
            this.router.navigate(['/admin/user/dashboard']);
          }, 2000);
        } else {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while deleting user.',
            detail: res.message.toString(),
          });
          console.error(res);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'An error occurred while deleting user.',
          detail: error.message,
        });
        console.error(error);
      },
    });
  }
}
