import { TestBed } from '@angular/core/testing';

import { ConnectApiService } from './connect-api.service';

describe('ConnectApiService', () => {
  let service: ConnectApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
