import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unAuthAdminGuard } from './un-auth-admin.guard';

describe('unAuthAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unAuthAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
