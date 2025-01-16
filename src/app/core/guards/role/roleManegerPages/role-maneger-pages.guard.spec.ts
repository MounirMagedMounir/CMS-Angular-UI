import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleManegerPagesGuard } from './role-maneger-pages.guard';

describe('roleManegerPagesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleManegerPagesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
