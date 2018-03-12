import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCanvasComponent } from './car-canvas.component';

describe('CarCanvasComponent', () => {
  let component: CarCanvasComponent;
  let fixture: ComponentFixture<CarCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
