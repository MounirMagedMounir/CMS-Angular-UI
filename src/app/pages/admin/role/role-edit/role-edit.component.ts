import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ApiResponse } from '../../../../core/interface/api-response';
import { RoleApiService } from '../../../../core/services/api/role/role-api.service';
import { RoleDetailsComponent } from '../../../../features/roles/component/role-details/role-details.component';
import { RoleEditDialogComponent } from '../../../../features/roles/component/role-edit-dialog/role-edit-dialog.component';
import { RoleResponse } from '../../../../features/roles/interface/role-response';

@Component({
  selector: 'app-role-edit',
  imports: [RoleDetailsComponent, Button, RoleEditDialogComponent],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.scss'
})
export class RoleEditComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleApi: RoleApiService,
    private messageService: MessageService
  ) {}
  
  isLoading = signal(true);
  visible: boolean = false;

  protected roleData = signal<RoleResponse>({
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

  ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get('id');
    if(!roleId){

    }else
    this.roleApi.getRoleById(roleId).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<RoleResponse>>;
        if (res.status === 200) {
          this.isLoading.set(false);
          this.roleData.set(res.data[0]);
       
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
        this.isLoading.set(false);
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
