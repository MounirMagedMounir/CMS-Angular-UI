import { Component } from '@angular/core';

import { UserListComponent } from '../../../features/users/component/user-list/user-list.component';

@Component({
  selector: 'app-user',
  imports: [UserListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
