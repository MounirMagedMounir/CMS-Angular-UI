import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
auth=inject(AuthenticationService);
}
