import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../../share/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../../core/interface/api-response';
import { MetaDataResponse } from '../../../../core/interface/meta-data-response';
import { UserFilter } from '../../../../core/interface/user/user-filter';
import { UserResponse } from '../../../../core/interface/user/user-response';
import { UserApiService } from '../../../../core/services/api/user/user-api.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { RequestQueryParams } from '../../../../core/interface/request-query-params';

@Component({
  selector: 'app-user-table',
  imports: [TableComponent, ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})

export class UserTableComponent implements OnInit {

  constructor(private userApi: UserApiService, private route: ActivatedRoute, private router: Router,private messageService:MessageService) { }

  isLoading: boolean = true;
  userList: Array<UserResponse> | undefined | null = undefined;

  culumnsTitle = [ { title: 'userName', sort: true },{ title: 'name', sort: true }, { title: 'email', sort: true }, { title: 'phone', sort: true }, { title: 'isActive', sort: true }, { title: 'role', sort: true }, { title: 'createdDate', sort: true }];
  culemnsFilter = [  { title: 'userName', type: "text", tip: "contain only letters, numbers, underscores and periods . Special characters such as @ or # or consecutive underscores or periods or end with an underscore or period are not allowed. " },
{ title: 'name', type: "text", tip: "contain string , no special characters" },
  { title: 'email', type: "text", tip: "" },
  { title: 'phone', type: "text", tip: "must contain only numbers . " },
  { title: 'isActive', type: "boolean", tip: "contain true or false" },
  { title: 'roleName', type: "text", tip: "contain string , no special characters" },
  { title: 'createdDateFrom', type: "text", tip: "must be in form of yyyy-mm-dd e.g 2025-1-1" }];

  metaData: MetaDataResponse<UserFilter> = {
    filters: {
      id: null,
      createdDateFrom: null,
      createdDateTo: null,
      lastUpdatedDateFrom: null,
      lastUpdatedDateTo: null,
      createdbyId: null,
      createdbyName: null,
      lastUpdatedbyId: null,
      lastUpdatedbyName: null,
      name: null,
      userName: null,
      email: null,
      phone: null,
      isActive: null,
      roleName: null
    },
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    perPage: 5,
    totalPages: 0,
    totalItems: 0,
  };

  checkbox: boolean = false;
  selection = { mode: "", metaKey: false };
  selectedUsers: any[] = [];

  actionButtons = [{ icon: 'pi pi-pencil', url: "/admin/user/edit/", severity: null }, { icon: 'pi pi-trash', url: "/admin/user/delete/", severity: "danger" }];

  ngOnInit(): void {
    this.initializeQueryParams();
    this.route.queryParams.subscribe(params => {
      this.updateMetadataFromQueryParams(params);
      this.getUsersList(
        this.metaData.filters,
       { sortOrder: this.metaData.sortOrder,
       sortBy: this.metaData.sortBy,
       skip: this.metaData.page,
       take: this.metaData.perPage
      }
      );

    });
  }

  onSelectedUsersChange(selectedUsers: any): void {
    this.selectedUsers = selectedUsers;
    this.router.navigate(["/admin/user/edit/" + selectedUsers.id]);
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
      const filterKey = key as keyof UserFilter;
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

  getUsersList(filter: UserFilter, queryParams: RequestQueryParams) {
    queryParams.sortBy = queryParams.sortBy.toLocaleLowerCase().includes("role") ? "roleid" : queryParams.sortBy;
    console.log(filter, queryParams);
    this.userApi.getUsersList(queryParams,filter ).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<[Array<UserResponse>, MetaDataResponse<UserFilter>]>;
          if (res.status === 200) {
           
            this.isLoading = false;
            this.userList = res.data[0]; // List of users
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
              summary: 'could not fetch users data',
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
            summary: 'An error occurred while fetching user data.',
            detail: error.toString(),
          });
          console.error(error);
        }

      }
    );
  }

}
