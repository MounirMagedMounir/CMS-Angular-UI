import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    console.log('Admin is logged in');
    return true;
  }  else {
  router.navigate(['/admin/login']);
  console.log('Admin is not logged in');
  return false;
}
};
