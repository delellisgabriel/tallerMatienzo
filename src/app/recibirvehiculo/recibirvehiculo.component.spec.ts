import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirvehiculoComponent } from './recibirvehiculo.component';

describe('RecibirvehiculoComponent', () => {
  let component: RecibirvehiculoComponent;
  let fixture: ComponentFixture<RecibirvehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibirvehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibirvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
