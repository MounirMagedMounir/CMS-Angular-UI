import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { DetailsComponent } from '../../share/details/details.component';

@Component({
  selector: 'app-profile',
  imports: [DetailsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

auth=inject(AuthenticationService);
data: any;

ngOnInit(): void {
  this.initializeLayout();}


private initializeLayout() {
  if (!this.auth.currentUser()) return;

  this.data = {
    profileImage: this.auth.currentUser()?.profileImage,
    email: this.auth.currentUser()?.email,
    userName: this.auth.currentUser()?.userName,
    culomn: [
      [
        {
          culomnName: 'Personal Details',
          rows: [
            { name: 'Full Name: ', value: this.auth.currentUser()?.name },
            { name: 'Display Name: ', value: this.auth.currentUser()?.userName },
            { name: 'Phone Number:', value: this.auth.currentUser()?.phone },
            { name: 'Email:', value: this.auth.currentUser()?.email },
          ],
        },
        {
          culomnName: 'Account Details',
          rows: [
            {
              name: 'Account Created: ',
              value: this.formatDate(this.auth.currentUser()?.createdDate??new Date()),
            },
            {
              name: 'Account Created By: ',
              value: this.auth.currentUser()?.createdByName,
            },
            {
              name: 'Last Update:',
              value: this.formatDate(this.auth.currentUser()?.lastUpdatedDate??new Date()),
            },
            {
              name: 'Last Update By:',
              value: this.auth.currentUser()?.lastUpdatedByName,
            },
          ],
        },
      ],
      [
        {
          culomnName: 'Preferences',
          rows: [
            { name: 'Role: ', value: this.auth.currentUser()?.role },
            { name: 'Account  Active: ', value: this.auth.currentUser()?.isActive },
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
