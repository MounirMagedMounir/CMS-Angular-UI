import { Component } from '@angular/core';
import { RoleTableComponent } from "../../../../features/roles/component/role-table/role-table.component";
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-list',
  imports: [RoleTableComponent,Button,RouterLink],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {

}
