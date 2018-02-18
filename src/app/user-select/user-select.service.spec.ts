import { TestBed, inject } from '@angular/core/testing';

import { UserSelectService } from './user-select.service';

describe('UserSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSelectService]
    });
  });

  it('should be created', inject([UserSelectService], (service: UserSelectService) => {
    expect(service).toBeTruthy();
  }));
});
