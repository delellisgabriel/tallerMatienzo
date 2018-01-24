import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregisterComponent } from './carregister.component';

describe('CarregisterComponent', () => {
  let component: CarregisterComponent;
  let fixture: ComponentFixture<CarregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
