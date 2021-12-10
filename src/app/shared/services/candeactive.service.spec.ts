import { TestBed } from '@angular/core/testing';

import { CandeactiveService } from './candeactive.service';

describe('CandeactiveService', () => {
  let service: CandeactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandeactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
