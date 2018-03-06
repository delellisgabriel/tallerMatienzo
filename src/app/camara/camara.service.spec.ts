import { TestBed, inject } from '@angular/core/testing';

import { CamaraService } from './camara.service';

describe('CamaraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CamaraService]
    });
  });

  it('should be created', inject([CamaraService], (service: CamaraService) => {
    expect(service).toBeTruthy();
  }));
});
