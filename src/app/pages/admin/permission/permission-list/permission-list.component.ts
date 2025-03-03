import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { PermissionTableComponent } from '../../../../features/permissions/component/permission-table/permission-table.component';

@Component({
  selector: 'app-permission-list',
  imports: [PermissionTableComponent,Button,RouterLink],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent {

}
