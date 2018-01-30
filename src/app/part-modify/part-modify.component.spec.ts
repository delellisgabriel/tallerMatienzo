import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartModifyComponent } from './part-modify.component';

describe('PartModifyComponent', () => {
  let component: PartModifyComponent;
  let fixture: ComponentFixture<PartModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
