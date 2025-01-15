import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

export const roleAdminPagesGuard: CanActivateFn = (route, state) => {
  var auth = inject(AuthenticationService);
  const router = inject(Router);

  if (auth.isAdmin()) {
    console.log('You are authorized to access this page');
    return true;

  }
  else {
    router.navigate(['/admin/login']);
    console.log('You are not authorized to access this page');
    return false;
  }

};
