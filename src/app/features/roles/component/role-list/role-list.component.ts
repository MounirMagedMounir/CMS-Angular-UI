import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MetaDataResponse } from '../../../../core/interface/meta-data-response';
import { UserResponse } from '../../../../core/interface/user/user-response';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-role-list',
  imports: [ ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  constructor( private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }


  isLoading: boolean = true;
  userList: Array<UserResponse> = [];

  culumnsTitle = [{ title: 'name', sort: true },];
  culemnsFilter = [ { title: 'name', type: "text", tip: "contain string , no special characters" },
    ];

  metaData: MetaDataResponse<null> = {
    filters: null
    ,
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    perPage: 5,
    totalPages: 0,
    totalItems: 0,
  };

  checkbox: boolean = false;
  selectionMode: string = "single";
  selectedUsers: any[] = [];

  actionButtons = [{ icon: 'pi pi-pencil', url: "", severity: null }, { icon: 'pi pi-trash', url: "", severity: "danger" }];
 
  onSelectedUsersChange(selectedUsers: any): void {
    this.selectedUsers = selectedUsers;
  }
  onDelete() {
    this.confirmationService.confirm({
      header: 'Confirm to Delete',
      message: 'Please confirm to Delete Users ' + this.selectedUsers.map((u) => u.name + "  ") + '  .',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        outlined: true,
        size: 'small'
      },
      acceptButtonProps: {
        label: 'Delete',
        icon: 'pi pi-trash',
        severity: "danger",
        size: 'small'
      },
      accept: () => {
        this.deleteUsers();
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'You have Deleted ' + this.selectedUsers.map((u) => u.name + "  ") + '  .', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Canceled', detail: 'You have Canceled', life: 3000 });
      }
    });
  }

  deleteUsers() {
    const ids = this.selectedUsers.map((u) => u.id);
    console.log(ids);
    // this.userApi.deleteUsers(ids).subscribe(
    //   {
    //     next: (response: any) => {
    //       const res = response as ApiResponse<any>;
    //       if (res.status === 200) {
    //         
    //         this.loading = false;
    //         this.getUsersList(
    //           this.metaData.filters,
    //           this.metaData.sortOrder,
    //           this.metaData.sortBy,
    //           this.metaData.page,
    //           this.metaData.perPage
    //         );
    //       } else if (res.status === 404) {
    //         res.message.forEach((element: any) => {
    //           this.alert.set(element)
    //         });
    //         console.error(res);
    //       }
    //     },
    //     error: (error) => {
    //       
    //       this.loading = false;
    //       this.alert.set('An error occurred while deleting user data.');
    //       console.error(error);
    //     }

    //   }
    // );
  }
}
