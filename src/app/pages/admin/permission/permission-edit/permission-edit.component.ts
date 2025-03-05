import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ApiResponse } from '../../../../core/interface/api-response';
import { PermissionDetailsComponent } from '../../../../features/permissions/component/permission-details/permission-details.component';
import { PermissionEditDialogComponent } from '../../../../features/permissions/component/permission-edit-dialog/permission-edit-dialog.component';
import { PermissionResponse } from '../../../../features/permissions/interface/permission-response';
import { PermissionApiService } from '../../../../core/services/api/permission/permission-api.service';
import { RoleApiService } from '../../../../core/services/api/role/role-api.service';
import { MetaDataResponse } from '../../../../core/interface/meta-data-response';
import { RoleFilter } from '../../../../features/roles/interface/role-filter';
import { RoleResponse } from '../../../../features/roles/interface/role-response';

@Component({
  selector: 'app-permission-edit',
  imports: [PermissionDetailsComponent, Button, PermissionEditDialogComponent],
  templateUrl: './permission-edit.component.html',
  styleUrl: './permission-edit.component.scss',
})
export class PermissionEditComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissionApi: PermissionApiService,
    private messageService: MessageService,
    private roleApi: RoleApiService
  ) {}

  isLoading = signal(true);
  visible: boolean = false;

  protected permissionData = signal<PermissionResponse>({
    id: '',
    name: '',
    createdDate: new Date(),
    lastUpdatedDate: new Date(),
    createdbyId: '',
    createdByName: '',
    lastUpdatedbyId: '',
    lastUpdatedByName: '',
  });

  roles = signal<Array<RoleResponse>>([
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

  filters = {
    name: null,
    id: null,
    createdDateFrom: null,
    createdDateTo: null,
    lastUpdatedDateFrom: null,
    lastUpdatedDateTo: null,
    createdbyId: null,
    createdbyName: null,
    lastUpdatedbyId: null,
    lastUpdatedbyName: null,
    permissions: [{ name: '',
       id: null,
        createdDateFrom: null,
        createdDateTo: null, 
        lastUpdatedDateFrom: null,
         lastUpdatedDateTo: null, 
         createdbyId: null,
          createdbyName: null, 
         lastUpdatedbyId: null,
          lastUpdatedbyName: null }],
  };

  ngOnInit() {
    const permissionId = this.route.snapshot.paramMap.get('id');
    if(!permissionId){

    }else
    this.permissionApi
      .getPermissionById(permissionId)
      .subscribe({
        next: (response: any) => {
          const res = response as ApiResponse<Array<PermissionResponse>>;
          if (res.status === 200) {
            this.isLoading.set(false);
            this.permissionData.set(res.data[0]);
            this.getRoles();
          } else if (res.status === 400) {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'permission not found',
              detail: res.message.toString(),
            });
            console.error(res);
            setTimeout(() => {
              this.router.navigate(['/admin/permission/dashboard']);
            }, 2000);
          }
        },
        error: (error) => {
          this.isLoading.set(false);
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while fetching permission permission.',
            detail: error.message,
          });

          console.error(error);
        },
      });
  }

  getRoles() {

    this.filters.permissions = [
      {
        name:this.permissionData().name,
        id: null,
        createdDateFrom: null,
        createdDateTo: null, 
        lastUpdatedDateFrom: null,
         lastUpdatedDateTo: null, 
         createdbyId: null,
          createdbyName: null, 
         lastUpdatedbyId: null,
          lastUpdatedbyName: null 
      }];  
        console.log('getRoles', this.filters);
    this.roleApi
      .getRolesList(
        { sortOrder: 'asc', sortBy: 'name', skip: 1, take: 100 },
        this.filters
      )
      .subscribe({
        next: (response: any) => {
          const res = response as ApiResponse<
            [Array<RoleResponse>, MetaDataResponse<RoleFilter>]
          >;
          if (res.status === 200) {
            this.roles.set(res.data[0]); // List of roles
          } else if (res.status === 404) {
            console.error(res);
          }
        },
        error: (error) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while fetching role data.',
            detail: error.toString(),
          });
          console.error(error);
        },
      });
  }

  onvisibleChange(value: any): void {
    this.visible = value;
    this.messageService.messageObserver.subscribe((message) => {
      if (!Array.isArray(message) && message.severity === 'success') {
        this.ngOnInit();
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

}
