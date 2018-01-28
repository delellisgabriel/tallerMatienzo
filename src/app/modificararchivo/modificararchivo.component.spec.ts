import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificararchivoComponent } from './modificararchivo.component';

describe('ModificararchivoComponent', () => {
  let component: ModificararchivoComponent;
  let fixture: ComponentFixture<ModificararchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificararchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificararchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
