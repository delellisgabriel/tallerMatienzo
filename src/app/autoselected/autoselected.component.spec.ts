import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoselectedComponent } from './autoselected.component';

describe('AutoselectedComponent', () => {
  let component: AutoselectedComponent;
  let fixture: ComponentFixture<AutoselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
