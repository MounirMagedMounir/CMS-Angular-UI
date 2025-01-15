import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleAdminPagesGuard } from './role-admin-pages.guard';

describe('roleAdminPagesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleAdminPagesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
