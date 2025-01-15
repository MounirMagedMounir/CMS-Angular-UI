import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unAuthGuard } from './un-auth.guard';

describe('unAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
