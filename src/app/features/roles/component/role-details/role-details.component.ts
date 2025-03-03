import { Component, computed, Input, signal } from '@angular/core';
import { RoleResponse } from '../../interface/role-response';
import { DetailsComponent } from '../../../../share/details/details.component';
import { LoadingComponent } from '../../../../share/loading/loading.component';

@Component({
  selector: 'app-role-details',
  imports: [LoadingComponent, DetailsComponent],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.scss'
})

export class RoleDetailsComponent {
 
  // Use Angular's input signals instead of @Input with regular signals
  @Input()  isLoading = signal(true);
  @Input() roleData = signal<RoleResponse>({
    id: '',
    name: '',
    permissions: [{name:'', id:''}],
    createdDate: new Date(),
    lastUpdatedDate: new Date(),
    createdbyId: '',
    createdByName: '',
    lastUpdatedbyId: '',
    lastUpdatedByName: ''
  });
  
  // Convert data to a computed signal that updates when roleData changes
  data = computed(() => {
    const roleData = this.roleData();
    if (!roleData) return undefined;

    return {
      userName: roleData.name,
      column: [
        {
          columnName: 'user Permissions ',
          rows: roleData.permissions.filter((p)=>p.name?.includes('User')).map((permission) => {
            return { name: '•', value: permission.name };
          }),
        },
        {
          columnName: 'Role Permissions',
          rows: roleData.permissions.filter((p)=>p.name?.includes('Role')).map((permission) => {
            return { name: '•', value: permission.name };
          }),
        },
        {
          columnName: 'Permissions',
          rows: roleData.permissions.filter((p)=>p.name?.includes('Permission')).map((permission) => {
            return { name: '•', value: permission.name };
          }),
        },
        {
          columnName: 'Article Permissions',
          rows: roleData.permissions.filter((p)=>p.name?.includes('Article')).map((permission) => {
            return { name: '•', value: permission.name };
          }),
        }
        ,
        {
          columnName: 'Tag Permissions',
          rows: roleData.permissions.filter((p)=>p.name?.includes('Tag')).map((permission) => {
            return { name: '•', value: permission.name };
          }),
        }
        ,
        {
          columnName: 'Comment Permissions',
          rows:roleData.permissions.filter((p)=>p.name?.includes('Comment')).map((permission) => {
            return { name: '•', value: permission.name };
          }),
        }
      ]
    };
  });

}
