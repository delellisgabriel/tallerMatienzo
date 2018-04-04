import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedCarListComponent } from './deactivated-car-list.component';

describe('DeactivatedCarListComponent', () => {
  let component: DeactivatedCarListComponent;
  let fixture: ComponentFixture<DeactivatedCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
