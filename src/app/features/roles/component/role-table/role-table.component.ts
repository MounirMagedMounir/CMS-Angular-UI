import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MetaDataResponse } from '../../../../core/interface/meta-data-response';
import { RoleApiService } from '../../../../core/services/api/role/role-api.service';
import { TableComponent } from '../../../../share/table/table.component';
import { RoleFilter } from '../../interface/role-filter';
import { ApiResponse } from '../../../../core/interface/api-response';
import { RoleResponse } from '../../interface/role-response';

@Component({
  selector: 'app-role-table',
  imports: [TableComponent, ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.scss'
})
export class RoleTableComponent {

  constructor(private route: ActivatedRoute, private roleApi: RoleApiService, private router: Router,
    // private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  isLoading: boolean = true;
  roleList: Array<RoleResponse> = [];

  culumnsTitle = [{ title: 'name', sort: true },
  { title: 'createdDate', sort: true },
  { title: 'createdByName', sort: true },
  { title: 'lastUpdatedDate', sort: true }];
  culemnsFilter = [{ title: '', type: "text", tip: "" },
  { title: 'name', type: "text", tip: "contain string , no special characters" },
  { title: 'createdDateFrom', type: "text", tip: "must be in form of yyyy-mm-dd e.g 2025-1-1" },
  { title: 'createdByName', type: "text", tip: "contain string , no special characters" },
  { title: 'lastUpdatedDate', type: "text", tip: "must be in form of yyyy-mm-dd e.g 2025-1-1" }
  ];

  metaData: MetaDataResponse<RoleFilter> = {
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
      lastUpdatedbyName: null,
      permissions: []
    }
    ,
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    perPage: 5,
    totalPages: 0,
    totalItems: 0,
  };

  checkbox: boolean = true;
  selection = { mode: "multiple", metaKey: false };
  selectedRoles: any[] = [];

  actionButtons = [{ icon: 'pi pi-pencil', url: "/admin/role/edit/", severity: null }, { icon: 'pi pi-trash', url: "/admin/role/delete/", severity: "danger" }];


  onSelectedRolesChange(selectedRoles: any): void {
    this.selectedRoles = selectedRoles;
  }

  ngOnInit(): void {
    this.initializeQueryParams();
    this.route.queryParams.subscribe(params => {
      this.updateMetadataFromQueryParams(params);
      this.getRolesList(
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
      const filterKey = key as keyof RoleFilter;
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

  getRolesList(filter: RoleFilter, sortOrder: string, sortBy: string, page: number, perPage: number) {
    sortBy = sortBy.toLocaleLowerCase().includes("role") ? "roleid" : sortBy;
    console.log(filter, sortOrder, sortBy, page, perPage);
    this.roleApi.getRolesList({ sortOrder: sortOrder, sortBy: sortBy, skip: page, take: perPage }, filter).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<[Array<RoleResponse>, MetaDataResponse<RoleFilter>]>;
          if (res.status === 200) {

            this.isLoading = false;
            this.roleList = res.data[0]; // List of roles
            const meta = res.data[1]; // Metadata

            // Ensure metadata fields are populated correctly
            this.metaData.filters = meta.filters || this.metaData.filters;
            this.metaData.sortBy = meta.sortBy || this.metaData.sortBy;
            this.metaData.sortBy = meta.sortBy.toLocaleLowerCase().includes("roleid") ? "role" : meta.sortBy
            this.metaData.sortOrder = meta.sortOrder || this.metaData.sortOrder;
            this.metaData.page = meta.page || this.metaData.page;
            this.metaData.perPage = meta.perPage || this.metaData.perPage;
            this.metaData.totalItems = meta.totalItems || this.metaData.totalItems;
            this.metaData.totalPages = meta.totalPages || this.metaData.totalPages;
          } else if (res.status === 404) {

            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'could not fetch roles data',
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
            summary: 'An error occurred while fetching role data.',
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
      detail: 'Please confirm to Delete Roles ' + this.selectedRoles.map((u) => u.name + "  ") + '  .',
      data: {
        button: [{
          label: 'Delete',
          severity: 'danger',
          action: () => this.deleteRoles(),
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

  deleteRoles() {
    this.messageService.clear('toast');
    const ids = this.selectedRoles.map((u) => u.id);
    console.log(ids);
    this.roleApi.DeleteRoleListById(ids).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<any>;
          if (res.status === 200) {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Deleted',
              detail: 'You have Deleted ' + this.selectedRoles.map((u) => u.name + "  ") + '  .', life: 3000
            });
            this.isLoading = false;
            this.getRolesList(
              this.metaData.filters,
              this.metaData.sortOrder,
              this.metaData.sortBy,
              this.metaData.page,
              this.metaData.perPage
            );
            this.selectedRoles = [];
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
            detail: 'An error occurred while deleting role data.',
            life: 3000
          });
          console.error(error);
        }

      }
    );
  }
}
