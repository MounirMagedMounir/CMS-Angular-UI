import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export const unAuthAdminGuard: CanActivateFn = (route, state) => {
  var auth = inject(AuthenticationService);
  const router = inject(Router);

  if ( auth.isAdmin()) {
    console.log('Admin is already logged in'+auth.isAdmin()+auth.isLoggedIn());
    router.navigate(['/admin']);
    return false;
  }  else {
  console.log('Admin is not logged in'+ auth.isAdmin()+auth.isLoggedIn());
  return true;
}
};
