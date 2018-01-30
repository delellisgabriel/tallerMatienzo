import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartNewComponent } from './part-new.component';

describe('PartNewComponent', () => {
  let component: PartNewComponent;
  let fixture: ComponentFixture<PartNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
