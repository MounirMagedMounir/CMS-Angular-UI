import { Component } from '@angular/core';

import { UserTableComponent } from '../../../../features/users/component/user-table/user-table.component';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [UserTableComponent,Button,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

}
