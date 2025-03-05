import { Component, OnInit, signal } from '@angular/core';
import { UserDetailsComponent } from '../../../../features/users/component/user-details/user-details.component';
import { Button } from 'primeng/button';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../../core/interface/api-response';
import { UserResponse } from '../../../../core/interface/user/user-response';
import { UserApiService } from '../../../../core/services/api/user/user-api.service';
import { UserEditDialogComponent } from '../../../../features/users/component/user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-user-edit',
  imports: [UserDetailsComponent, Button, UserEditDialogComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})

export class UserEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private messageService: MessageService
  ) {}
  
  isLoading = signal(true);
  visible: boolean = false;

  protected userData = signal<UserResponse>({
    id: '',
    name: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
    profileImage: '',
    isActive: false,
    role: '',
    createdDate: new Date(),
    lastUpdatedDate: new Date(),
    createdbyId: '',
    createdByName: '',
    lastUpdatedbyId: '',
    lastUpdatedByName: '',
  });

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if(!userId){

    }else
    this.userApi.getUserById(userId).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<UserResponse>>;
        if (res.status === 200) {
          this.isLoading.set(false);
          this.userData.set(res.data[0]);
       
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
        this.isLoading.set(false);
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
  onvisibleChange(value: any): void {
    this.visible = value;
    this.messageService.messageObserver.subscribe((message) => {
      if (!Array.isArray(message)&&message.severity === 'success') {
        this.ngOnInit();
      }
      })
  }
  showDialog() {
    this.visible = true;

  }
  
}
