import {
  Component,
  computed,
  Input,
  signal,
} from '@angular/core';
import { UserResponse } from '../../../../core/interface/user/user-response';
import { LoadingComponent } from '../../../../share/loading/loading.component';
import { DetailsComponent } from '../../../../share/details/details.component';

@Component({
  selector: 'app-user-details',
  imports: [LoadingComponent, DetailsComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})

export class UserDetailsComponent {
  
  // Use Angular's input signals instead of @Input with regular signals
  @Input()  isLoading = signal(true);
  @Input() userData = signal<UserResponse>({
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
  
  // Convert data to a computed signal that updates when userData changes
  data = computed(() => {
    const userData = this.userData();
    if (!userData) return undefined;

    return {
      profileImage: userData.profileImage,
      email: userData.email,
      userName: userData.userName,
      column: [
        {
          columnName: 'Personal Details',
          rows: [
            { name: 'Full Name: ', value: userData.name },
            { name: 'Display Name: ', value: userData.userName },
            { name: 'Phone Number:', value: userData.phone },
            { name: 'Email:', value: userData.email },
          ],
        },
        {
          columnName: 'Account Details',
          rows: [
            { name: 'Role: ', value: userData.role },
            { name: 'Account Active: ', value: userData.isActive },
            { name: 'Account Created: ', value: this.formatDate(userData.createdDate) },
            { name: 'Account Created By: ', value: userData.createdByName },
            { name: 'Last Update:', value: this.formatDate(userData.lastUpdatedDate) },
            { name: 'Last Update By:', value: userData.lastUpdatedByName },
          ],
        },
        {
          columnName: 'Preferences',
          rows: [],
        },
        {
          columnName: 'Settings',
          rows: [
            { name: 'Dark Mode: ', value: 'Activated' },
            { name: 'Language for Content: ', value: 'English' },
          ],
        },
      ],
    };
  });

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}