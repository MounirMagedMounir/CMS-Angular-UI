import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { DetailsComponent } from '../../share/details/details.component';

@Component({
  selector: 'app-profile',
  imports: [DetailsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent   {

auth=inject(AuthenticationService);
data = computed(() => {
    const userData = this.auth.currentUser();
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
