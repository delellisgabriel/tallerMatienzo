import { TestBed, inject } from '@angular/core/testing';

import { CarSelectService } from './car-select.service';

describe('CarSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarSelectService]
    });
  });

  it('should be created', inject([CarSelectService], (service: CarSelectService) => {
    expect(service).toBeTruthy();
  }));
});
