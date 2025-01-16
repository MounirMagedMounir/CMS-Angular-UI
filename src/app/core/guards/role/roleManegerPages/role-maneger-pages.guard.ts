import { CanActivateFn } from '@angular/router';

export const roleManegerPagesGuard: CanActivateFn = (route, state) => {
  return true;
};
