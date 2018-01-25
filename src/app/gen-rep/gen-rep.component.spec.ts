import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenRepComponent } from './gen-rep.component';

describe('GenRepComponent', () => {
  let component: GenRepComponent;
  let fixture: ComponentFixture<GenRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
