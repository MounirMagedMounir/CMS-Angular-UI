import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { UserFilterResponse } from '../../core/interface/user-filter-response';
import { Message } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { MetaDataResponse } from '../../core/interface/meta-data-response';
import { FilterMetadata, SortEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-table',
  imports: [CommonModule, TableModule, TagModule, DropdownModule, FormsModule, Message, AvatarModule, ButtonModule, PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }

  @Input() alert = signal("");
  @Input() loading: boolean = true;
  @Input() rowsData: Array<any> = [];
  @Input() metaData: MetaDataResponse<any> = {
    filters: {
    },
    sortBy: '',
    sortOrder: '',
    page: 0,
    perPage: 0,
    totalPages: 0,
    totalItems: 0,
  };
  @Input() culumnsTitle: any[] = [];
  @Input() culemnsFilter: any[] = [];

  filteredData: any[] = [];
  selectedMembers: any[] = [];
  filters: { [s: string]: FilterMetadata } = {};
  first :number= 0;

  ngOnInit() {  
    this.first = this.metaData.page * this.metaData.perPage - this.metaData.perPage;
    this.filteredData = this.culemnsFilter.map(obj => obj.title).filter((value) => value != undefined);
    this.route.queryParams.subscribe(params => {
      // Populate filters from query params
      Object.keys(this.metaData.filters).forEach(key => {
        const paramValue = params[key];

        if (paramValue !== undefined && paramValue !== null && paramValue.trim() !== '') {
          // Set filter if paramValue exists and is valid
          this.filters[key] =
            { value: paramValue, matchMode: 'contains', operator: 'or' }
            ;

          this.metaData.filters[key] = paramValue; // Sync metaData.filters
        } else {
          // If paramValue is undefined or empty, remove the filter
        
          this.metaData.filters[key] = null; // Optional: Reset metaData.filters
        }
      });
    });
  

  }

  customSort(event: SortEvent) {
    if (event.field) {
      // Update metadata directly to avoid redundant subscriptions
      this.metaData.sortBy = event.field.toString();
      this.metaData.sortOrder = event.order === 1 ? 'asc' : 'desc';

      // Get current query parameters and preserve filters
      const updatedParams: any = { ...this.route.snapshot.queryParams };

      // Update only the sort parameters
      updatedParams.sortBy = this.metaData.sortBy;
      updatedParams.sortOrder = this.metaData.sortOrder;

      // Update the URL without adding a new entry to history
      this.router.navigate([], {
        queryParams: updatedParams,  // Apply the updated query parameters
        queryParamsHandling: 'merge',  // Merge with existing parameters
        replaceUrl: true,  // Replace the URL without adding a new history entry
      });
    }
  }

  handleFilter(event: any) {
    if (event.filters) {
      const updatedParams: any = { ...this.route.snapshot.queryParams };
      // Iterate through filters and update queryParams
      Object.keys(event.filters).forEach(key => {
        event.filters[key].value =event.filters[key].value===''? null:event.filters[key].value;
        const filter = event.filters[key]; // Get the filter object
        const filterValue = filter?.value; // Safely access value with optional chaining
        const filterKey = key as keyof UserFilterResponse;
        this.metaData.filters[filterKey] = filterValue;
        if (filter && (filterValue !== null)) {
          if (filterValue) {
            if (updatedParams[filterKey] != filterValue) {
              updatedParams[filterKey] = filterValue;
              this.router.navigate([], {
                queryParams: updatedParams,  // Apply the updated query parameters
                queryParamsHandling: 'merge',  // Merge with existing parameters
                replaceUrl: true,  // Replace the URL without adding a new history entry
              });

            }
          }
        } else {
          if (this.route.snapshot.queryParams[filterKey]) {
            delete updatedParams[filterKey];
            this.router.navigate([], {
              queryParams: updatedParams,  // Apply the updated query parameters
              queryParamsHandling: 'replace',  // Merge with existing parameters
              replaceUrl: true,  // Replace the URL without adding a new history entry
            });
          }
        }
      });
    }
  }

  pageChange(event: any) {
    this.first = event.first;
    this.router.navigate([], {
      queryParams: { page: event.first / event.rows + 1, perPage: event.rows },
      queryParamsHandling: 'merge', // 'merge' to merge with existing params
      replaceUrl: true, // Update the current URL without adding a new history entry
    });
  }
  clearMessages() {
    this.alert.set("");
  }
}
