import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ApiResponse } from '../../../../core/interface/api-response';
import { RoleApiService } from '../../../../core/services/api/role/role-api.service';
import { RoleResponse } from '../../../../features/roles/interface/role-response';

@Component({
  selector: 'app-role-delete',
  imports: [ButtonModule,RouterLink],
  templateUrl: './role-delete.component.html',
  styleUrl: './role-delete.component.scss'
})
export class RoleDeleteComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleApi: RoleApiService,
    private messageService: MessageService
  ) {}

  role:any={
    name:'',
  };
  
  ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get('id');
    this.roleApi.getRoleById({ RoleId: roleId }).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<RoleResponse>>;
        if (res.status === 200) {
         this.role.name=res.data[0].name;
        } else if (res.status === 400) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'role not found',
            detail: res.message.toString(),
          });
          console.error(res);
          setTimeout(() => {
            this.router.navigate(['/admin/role/dashboard']);
          }, 2000);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'An error occurred while fetching role role.',
          detail: error.message,
        });

        console.error(error);
      },
    });
  }

  onDeletePermanentRole() {
    const roleId = this.route.snapshot.paramMap.get('id');
    this.roleApi.DeleteRoleById({ RoleId: roleId }).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<RoleResponse>>;
        if (res.status === 200) {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: `Role ${this.role.name} deleted successfully`,
            detail: res.message.toString(),
          });
          setTimeout(() => {
            this.router.navigate(['/admin/role/dashboard']);
          }, 2000);
        } else {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while deleting role.',
            detail: res.message.toString(),
          });
          console.error(res);
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'An error occurred while deleting role.',
          detail: error.message,
        });
        console.error(error);
      },
    });
  }

}
