import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [Breadcrumb, RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'], // Corrected property name
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = []; // Initialized as an empty array
  home: MenuItem | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set home menu item
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    // Subscribe to router events to dynamically update breadcrumbs
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.buildBreadcrumbs(currentUrl);
      });
  }

  buildBreadcrumbs(currentUrl: string): void {
    // Remove query parameters and fragments from the URL
    const urlWithoutQueryParams = currentUrl.split('?')[0];

    // Split the URL into segments, ignoring empty segments
    const urlSegments = urlWithoutQueryParams.split('/').filter(segment => segment);

    let cumulativeUrl = '';

    this.items = urlSegments.map(segment => {
      cumulativeUrl += `/${segment}`;
      return {
        label: this.capitalize(segment), // Capitalize the breadcrumb label
        routerLink: cumulativeUrl,
      };
    });
  }

  capitalize(segment: string): string {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }
}
