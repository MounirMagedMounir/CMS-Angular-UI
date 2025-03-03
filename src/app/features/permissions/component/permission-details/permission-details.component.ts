import { Component, computed, Input, signal } from '@angular/core';
import { DetailsComponent } from '../../../../share/details/details.component';
import { LoadingComponent } from '../../../../share/loading/loading.component';
import { PermissionResponse } from '../../interface/permission-response';
import { RoleResponse } from '../../../roles/interface/role-response';

@Component({
  selector: 'app-permission-details',
  imports: [LoadingComponent, DetailsComponent],
  templateUrl: './permission-details.component.html',
  styleUrl: './permission-details.component.scss'
})
export class PermissionDetailsComponent {
  // Use Angular's input signals instead of @Input with regular signals
  @Input()  isLoading = signal(true);
  @Input() permissionData = signal<PermissionResponse>({
    id: '',
    name: '',
    createdDate: new Date(),
    lastUpdatedDate: new Date(),
    createdbyId: '',
    createdByName: '',
    lastUpdatedbyId: '',
    lastUpdatedByName: ''
  });
  @Input() roles = signal<Array<RoleResponse>>([
      {
        id: '',
        name: '',
        permissions: [],
        createdDate: new Date(),
        lastUpdatedDate: new Date(),
        createdbyId: '',
        createdByName: '',
        lastUpdatedbyId: '',
        lastUpdatedByName: '',
      },
    ]);
  
    
  // Convert data to a computed signal that updates when permissionData changes
  data = computed(() => {
    const permissionData = this.permissionData();
    const roles = this.roles();
    if (!permissionData) return undefined;
    if (!roles) return undefined;

    return {
      userName: permissionData.name,
      column: [
        {
          columnName: 'Permissions Details',
          rows:[
             { name: 'Name', value: permissionData.name },
             { name: 'Created By', value: permissionData.createdByName },
             { name: 'Created Date', value: this.formatDate(permissionData.createdDate) },
             { name: 'Updated by', value: permissionData.lastUpdatedByName },
             { name: 'Updated Date', value: this.formatDate(permissionData.lastUpdatedDate) },
            ]

        },
        {
          columnName: 'Roles',
          rows: roles.map(role => (
            {
            name: role.name,
        }))
      }
      ]
    };
  });

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
