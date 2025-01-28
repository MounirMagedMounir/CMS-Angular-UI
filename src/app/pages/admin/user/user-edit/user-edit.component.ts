import { Component } from '@angular/core';
import { UserDetailsComponent } from '../../../../features/users/component/user-details/user-details.component';

@Component({
  selector: 'app-user-edit',
  imports: [UserDetailsComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {

}
