import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ApiResponse } from '../../../../core/interface/api-response';
import { MetaDataResponse } from '../../../../core/interface/meta-data-response';
import { PermissionApiService } from '../../../../core/services/api/permission/permission-api.service';
import { TableComponent } from '../../../../share/table/table.component';
import { PermissionFilter } from '../../interface/permission-filter';
import { PermissionResponse } from '../../interface/permission-response';

@Component({
  selector: 'app-permission-table',
  imports: [TableComponent, ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './permission-table.component.html',
  styleUrl: './permission-table.component.scss'
})
export class PermissionTableComponent {

  constructor(private route: ActivatedRoute, private permissionApi: PermissionApiService, private router: Router,
    // private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  isLoading: boolean = true;
  permissionList: Array<PermissionResponse> = [];

  culumnsTitle = [{ title: 'name', sort: false },
  { title: 'createdDate', sort: false },
  { title: 'createdByName', sort: false },
  { title: 'lastUpdatedDate', sort: false }];
  
  culemnsFilter = [{ title: '', type: "text", tip: "" },
  { title: '', type: "", tip: "" },
  { title: '', type: "", tip: "" },
  { title: '', type: "", tip: "" },
  { title: '', type: "", tip: "" }
  ];

  metaData: MetaDataResponse<PermissionFilter> = {
    filters: {
      name: null,
      id: null,
      createdDateFrom: null,
      createdDateTo: null,
      lastUpdatedDateFrom: null,
      lastUpdatedDateTo: null,
      createdbyId: null,
      createdbyName: null,
      lastUpdatedbyId: null,
      lastUpdatedbyName: null},
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    perPage: 5,
    totalPages: 0,
    totalItems: 0,
  };

  checkbox: boolean = true;
  selection = { mode: "multiple", metaKey: false };
  selectedPermissions: any[] = [];

  actionButtons = [{ icon: 'pi pi-pencil', url: "/admin/permission/edit/", severity: null }, { icon: 'pi pi-trash', url: "/admin/permission/delete/", severity: "danger" }];


  onSelectedPermissionsChange(selectedPermissions: any): void {
    this.selectedPermissions = selectedPermissions;
  }

  ngOnInit(): void {
    this.initializeQueryParams();
    this.route.queryParams.subscribe(params => {
      this.updateMetadataFromQueryParams(params);
      this.getPermissionsList(
        this.metaData.filters,
        this.metaData.sortOrder,
        this.metaData.sortBy,
        this.metaData.page,
        this.metaData.perPage
      );

    });
  }

  initializeQueryParams() {
    const queryParams = this.route.snapshot.queryParams;

    const defaultParams = {
      page: 1, perPage: 5, sortBy: 'name', sortOrder: 'asc',
      ...queryParams
    };

    this.router.navigate([], {
      queryParams: defaultParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

  }

  updateMetadataFromQueryParams(params: any): void {
    this.metaData.page = params['page'] || 1;
    this.metaData.perPage = params['perPage'] || 5;
    this.metaData.sortBy = params['sortBy'] || 'name';
    this.metaData.sortOrder = params['sortOrder'] || 'asc';

    Object.keys(this.metaData.filters).forEach((key) => {
      const filterKey = key as keyof PermissionFilter;
      let parsedValue;
      if (params[filterKey] === 'true' || params[filterKey] === 'false') {
        parsedValue = params[filterKey] === 'true'; // Convert to boolean
      } else if (filterKey?.includes('Date') && params[filterKey]) {
        const dateString = params[filterKey];
        let parts = dateString.split('-');
        let year = parts[0];
        let month = parts[1];
        let day = parts[2].padStart(2, '0');
        parsedValue = `${year}-${month}-${day}T00:00:00`;
      }
      else {
        // If it's not a boolean string, use the value as-is
        parsedValue = params[filterKey];
      }
      this.metaData.filters[filterKey] = parsedValue;

    });


  }

  getPermissionsList(filter: PermissionFilter, sortOrder: string, sortBy: string, page: number, perPage: number) {
    sortBy = sortBy.toLocaleLowerCase().includes("permission") ? "permissionid" : sortBy;
    console.log(filter, sortOrder, sortBy, page, perPage);
    this.permissionApi.getPermissionsList({ sortOrder: sortOrder, sortBy: sortBy, skip: page, take: perPage }, filter).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<[Array<PermissionResponse>, MetaDataResponse<PermissionFilter>]>;
          if (res.status === 200) {

            this.isLoading = false;
            this.permissionList = res.data[0]; // List of permissions
            const meta = res.data[1]; // Metadata

            // Ensure metadata fields are populated correctly
            this.metaData.filters = meta.filters || this.metaData.filters;
            this.metaData.sortBy = meta.sortBy || this.metaData.sortBy;
            this.metaData.sortBy = meta.sortBy.toLocaleLowerCase().includes("permissionid") ? "permission" : meta.sortBy
            this.metaData.sortOrder = meta.sortOrder || this.metaData.sortOrder;
            this.metaData.page = meta.page || this.metaData.page;
            this.metaData.perPage = meta.perPage || this.metaData.perPage;
            this.metaData.totalItems = meta.totalItems || this.metaData.totalItems;
            this.metaData.totalPages = meta.totalPages || this.metaData.totalPages;
          } else if (res.status === 404) {

            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'could not fetch permissions data',
              detail: res.message.toString(),
            });

            console.error(res);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'An error occurred while fetching permission data.',
            detail: error.toString(),
          });
          console.error(error);
        }

      }
    );
  }

  onDelete() {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      sticky: true,
      summary: 'Confirm to Delete',
      detail: 'Please confirm to Delete Permissions ' + this.selectedPermissions.map((u) => u.name + "  ") + '  .',
      data: {
        button: [{
          label: 'Delete',
          severity: 'danger',
          action: () => this.deletePermissions(),
        }, {
          label: 'cansel',
          severity: 'error',
          action: () => {
            this.messageService.clear('toast');
            this.messageService.add({
              key: 'toast',
              severity: 'info',
              summary: 'Canceled',
              detail: 'You have Canceled', life: 3000
            });
          },
        }],
      },
    });


  }

  deletePermissions() {
    this.messageService.clear('toast');
    const ids = this.selectedPermissions.map((u) => u.id);
    console.log(ids);
    this.permissionApi.DeletePermissionListById(ids).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<any>;
          if (res.status === 200) {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Deleted',
              detail: 'You have Deleted ' + this.selectedPermissions.map((u) => u.name + "  ") + '  .', life: 3000
            });
            this.isLoading = false;
            this.getPermissionsList(
              this.metaData.filters,
              this.metaData.sortOrder,
              this.metaData.sortBy,
              this.metaData.page,
              this.metaData.perPage
            );
            this.selectedPermissions = [];
          } else if (res.status === 404) {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Deleted failed',
              detail:  res.message.toString() ,
              life: 3000
            });
            console.error(res);
          }
        },
        error: (error) => {

          this.isLoading = false;
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Deleted',
            detail: 'An error occurred while deleting permission data.',
            life: 3000
          });
          console.error(error);
        }

      }
    );
  }
}
