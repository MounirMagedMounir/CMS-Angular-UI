import { TestBed } from '@angular/core/testing';

import { AdminauthenticationApiService } from './adminauthenticationApi.service';

describe('AdminauthenticationApiService', () => {
  let service: AdminauthenticationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminauthenticationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
