import { Component } from '@angular/core';

import { UserTableComponent } from '../../../../features/users/component/user-table/user-table.component';

@Component({
  selector: 'app-user-list',
  imports: [UserTableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

}
