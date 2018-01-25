import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColacitasComponent } from './colacitas.component';

describe('ColacitasComponent', () => {
  let component: ColacitasComponent;
  let fixture: ComponentFixture<ColacitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColacitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColacitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
