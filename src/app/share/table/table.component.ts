import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { MetaDataResponse } from '../../core/interface/meta-data-response';
import { FilterMetadata, SortEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-table',
  imports: [CommonModule, TableModule, TagModule, DropdownModule, FormsModule, Message, AvatarModule, ButtonModule, PaginatorModule, Tooltip],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }
  @ViewChild('dt', { static: true }) dt!: Table;

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
  @Input() selection:any = {};
  @Input() checkbox: boolean = false;

  @Input() actionButtons: any[]=[];

  @Output() selectedMembersChange = new EventEmitter<any[]>();

  filteredData: any[] = [];
  filters: { [s: string]: FilterMetadata } = {};
  first: number = 0;

  selectedMembers: any[] = [];


  ngOnInit(): void {
    this.dt.hasFilter = () => false;
    this.first = this.metaData.page * this.metaData.perPage - this.metaData.perPage;
    this.filteredData = this.culemnsFilter.map(obj => obj.title).filter((value) => value != undefined);
    this.route.queryParams.subscribe(params => {
      // Populate filters from query params
      Object.keys(this.metaData.filters).forEach(key => {

        const paramValue = params[key];
        let parsedValue;
        if (paramValue !== undefined && paramValue !== null && paramValue.trim() !== '') {
          // Set filter if paramValue exists and is valid
          if (paramValue.toLowerCase() === 'true' || paramValue.toLowerCase() === 'false') {
            parsedValue = paramValue.toLowerCase() === 'true'; // Convert to boolean
          } else {
            // If it's not a boolean string, use the value as-is
            parsedValue = paramValue;
          }
          this.filters[key] =
            { value: parsedValue, matchMode: 'contains', operator: 'or' }
            ;

          this.metaData.filters[key] = parsedValue; // Sync metaData.filters
        } else {
          // If paramValue is undefined or empty, remove the filter
          this.filters[key] =
          { value: null, matchMode: 'contains', operator: 'or' }
          ;
          this.metaData.filters[key] = null; // Optional: Reset metaData.filters
        }
      });
    });
  }

  onSelectionChange(event: any): void {
    this.selectedMembersChange.emit(this.selectedMembers);
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
        event.filters[key].value = event.filters[key].value === '' ? null : event.filters[key].value;
        const filter = event.filters[key]; // Get the filter object
        const filterValue = filter?.value; // Safely access value with optional chaining
        this.metaData.filters[key] = filterValue;
        if (filter && filterValue !== null) {
          if (updatedParams[key] != filterValue) {
            updatedParams[key] = filterValue;
            this.router.navigate([], {
              queryParams: updatedParams,  // Apply the updated query parameters
              queryParamsHandling: 'merge',  // Merge with existing parameters
              replaceUrl: true,  // Replace the URL without adding a new history entry
            });
          }
        } else {
          if (this.route.snapshot.queryParams[key]) {
            delete updatedParams[key];
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
  
  navigateTo(url:string){
    this.router.navigate([url]);
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
