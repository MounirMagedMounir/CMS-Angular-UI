import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../../share/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../../core/interface/api-response';
import { MetaDataResponse } from '../../../../core/interface/meta-data-response';
import { UserFilterResponse } from '../../../../core/interface/user-filter-response';
import { UserResponse } from '../../../../core/interface/user-response';
import { UserApiService } from '../../../../core/services/api/user/userApi.service';

@Component({
  selector: 'app-user-list',
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  constructor(private userApi: UserApiService, private route: ActivatedRoute, private router: Router) { }

  alert = signal("");
  loading: boolean = true;
  userList: Array<UserResponse> = [];

  culumnsTitle = [{ title: 'profileImage', sort: false }, { title: 'name', sort: true }, { title: 'userName', sort: true }, { title: 'email', sort: true }, { title: 'phone', sort: true }, { title: 'isActive', sort: true }, { title: 'role', sort: true }, { title: 'createdDate', sort: true }];
  culemnsFilter = ['', '', { title: 'name', type: "text" }, { title: 'userName', type: "text" }, { title: 'email', type: "text" }, { title: 'phone', type: "text" }, { title: 'isActive', type: "boolean" }, { title: 'roleName', type: "text" }, { title: 'createdDate', type: "text" }];

  metaData: MetaDataResponse<UserFilterResponse> = {
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

  selectedMembers: any[] = [];


  ngOnInit(): void {
    this.initializeQueryParams();
    this.route.queryParams.subscribe(params => {
      this.updateMetadataFromQueryParams(params);
      this.getUsersList(
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
      const filterKey = key as keyof UserFilterResponse;
      this.metaData.filters[filterKey] = params[filterKey];

    });
  }

  getUsersList(filter: UserFilterResponse, sortOrder: string, sortBy: string, page: number, perPage: number) {
    console.log(filter, sortOrder, sortBy, page, perPage);
    this.userApi.getUsersList(filter, { sortOrder: sortOrder, sortBy: sortBy, skip: page, take: perPage }).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<[Array<UserResponse>, MetaDataResponse<UserFilterResponse>]>;
          if (res.status === 200) {
            this.alert.set("");
            this.loading = false;
            this.userList = res.data[0]; // List of users
            const meta = res.data[1]; // Metadata

            // Ensure metadata fields are populated correctly
            this.metaData.filters = meta.filters || this.metaData.filters;
            this.metaData.sortBy = meta.sortBy || this.metaData.sortBy;
            this.metaData.sortOrder = meta.sortOrder || this.metaData.sortOrder;
            this.metaData.page = meta.page || this.metaData.page;
            this.metaData.perPage = meta.perPage || this.metaData.perPage;
            this.metaData.totalItems = meta.totalItems || this.metaData.totalItems;
            this.metaData.totalPages = meta.totalPages || this.metaData.totalPages;

          } else if (res.status === 404) {
            res.message.forEach((element: any) => {
              this.alert.set(element)
            });
            console.error(res);
          }
        },
        error: (error) => {
          this.alert.set("");
          this.loading = false;
          this.alert.set('An error occurred while fetching user data.');
          console.error(error);
        }

      }
    );
  }


}
