import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashclientComponent } from './dashclient.component';

describe('DashclientComponent', () => {
  let component: DashclientComponent;
  let fixture: ComponentFixture<DashclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
