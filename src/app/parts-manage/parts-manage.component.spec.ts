import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsManageComponent } from './parts-manage.component';

describe('PartsManageComponent', () => {
  let component: PartsManageComponent;
  let fixture: ComponentFixture<PartsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
