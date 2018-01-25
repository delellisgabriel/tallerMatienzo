import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudcitaComponent } from './solicitudcita.component';

describe('SolicitudcitaComponent', () => {
  let component: SolicitudcitaComponent;
  let fixture: ComponentFixture<SolicitudcitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudcitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudcitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
