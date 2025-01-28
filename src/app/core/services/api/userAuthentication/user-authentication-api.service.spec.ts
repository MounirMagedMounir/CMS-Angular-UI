import { TestBed } from '@angular/core/testing';

import { userAuthenticationApiService } from './user-authentication-api.service';

describe('userAuthenticationApiService', () => {
  let service: userAuthenticationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(userAuthenticationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
