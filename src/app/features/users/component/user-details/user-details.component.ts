import { Component, OnInit, signal } from '@angular/core';
import { UserApiService } from '../../../../core/services/api/user/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../../core/interface/api-response';
import { UserResponse } from '../../../../core/interface/user/user-response';
import { LoadingComponent } from '../../../../share/loading/loading.component';
import { DetailsComponent } from '../../../../share/details/details.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-details',
  imports: [ LoadingComponent, DetailsComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private messageService: MessageService
  ) {}
  
  protected isLoading = signal(true);
  protected userData = signal<UserResponse>({
    id: 0,
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
    createdbyId: 0,
    createdByName: '',
    lastUpdatedbyId: 0,
    lastUpdatedByName: '',
  });
  
  data: any;

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userApi.getUserById({ UserId: userId }).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<UserResponse>>;
        if (res.status === 200) {
          this.isLoading.set(false);
          this.userData.set(res.data[0]);  
          this.initializeLayout();
          console.log(res.data[0]);
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

  private initializeLayout() {
    if (!this.userData()) return;

    this.data = {
      profileImage: this.userData()?.profileImage,
      email: this.userData()?.email,
      userName: this.userData()?.userName,
      culomn: [
        [
          {
            culomnName: 'Personal Details',
            rows: [
              { name: 'Full Name: ', value: this.userData()?.name },
              { name: 'Display Name: ', value: this.userData()?.userName },
              { name: 'Phone Number:', value: this.userData()?.phone },
              { name: 'Email:', value: this.userData()?.email },
            ],
          },
          {
            culomnName: 'Account Details',
            rows: [
              {
                name: 'Account Created: ',
                value: this.formatDate(this.userData().createdDate),
              },
              {
                name: 'Account Created By: ',
                value: this.userData()?.createdByName,
              },
              {
                name: 'Last Update:',
                value: this.formatDate(this.userData().lastUpdatedDate),
              },
              {
                name: 'Last Update By:',
                value: this.userData()?.lastUpdatedByName,
              },
            ],
          },
        ],
        [
          {
            culomnName: 'Preferences',
            rows: [
              { name: 'Role: ', value: this.userData()?.role },
              { name: 'Account  Active: ', value: this.userData()?.isActive },
            ],
          },
          {
            culomnName: 'Settings',
            rows: [
              { name: 'Dark Mode: ', value: 'Activated' },
              { name: 'Language for Content: ', value: 'English' },
            ],
          },
        ],
      ],
    };
  }

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }


}
