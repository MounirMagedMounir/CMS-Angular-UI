import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export const unAuthGuard: CanActivateFn = (route, state) => {
  var auth = inject(AuthenticationService);
  const router = inject(Router);  
  
  if (auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }  else {
  return true;
  }
};
