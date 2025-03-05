import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ApiResponse } from '../../../../core/interface/api-response';
import { PermissionApiService } from '../../../../core/services/api/permission/permission-api.service';
import { PermissionResponse } from '../../../../features/permissions/interface/permission-response';

@Component({
  selector: 'app-permission-delete',
  imports: [ButtonModule,RouterLink],
  templateUrl: './permission-delete.component.html',
  styleUrl: './permission-delete.component.scss'
})
export class PermissionDeleteComponent {
 constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissionApi: PermissionApiService,
    private messageService: MessageService
  ) {}

  permission:any={
    name:'',
  };
  
  ngOnInit() {
    const permissionId = this.route.snapshot.paramMap.get('id');
    if(!permissionId){

    }else
    this.permissionApi.getPermissionById(permissionId).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<PermissionResponse>>;
        if (res.status === 200) {
         this.permission.name=res.data[0].name;
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

  onDeletePermanentPermission() {
    const permissionId = this.route.snapshot.paramMap.get('id');
    if(!permissionId){

    }else
    this.permissionApi.DeletePermissionById(permissionId).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<PermissionResponse>>;
        if (res.status === 200) {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: `Permission ${this.permission.name} deleted successfully`,
            detail: res.message.toString(),
          });
          setTimeout(() => {
            this.router.navigate(['/admin/permission/dashboard']);
          }, 2000);
        } else {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while deleting permission.',
            detail: res.message.toString(),
          });
          console.error(res);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'An error occurred while deleting permission.',
          detail: error.message,
        });
        console.error(error);
      },
    });
  }
}
