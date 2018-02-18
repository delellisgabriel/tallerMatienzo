import { TestBed, inject } from '@angular/core/testing';

import { OrdenSelectService } from './orden-select.service';

describe('OrdenSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdenSelectService]
    });
  });

  it('should be created', inject([OrdenSelectService], (service: OrdenSelectService) => {
    expect(service).toBeTruthy();
  }));
});
