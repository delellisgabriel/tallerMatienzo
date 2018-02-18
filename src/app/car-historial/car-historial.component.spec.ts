import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHistorialComponent } from './car-historial.component';

describe('CarHistorialComponent', () => {
  let component: CarHistorialComponent;
  let fixture: ComponentFixture<CarHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
