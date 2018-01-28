import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsSearchComponent } from './parts-search.component';

describe('PartsSearchComponent', () => {
  let component: PartsSearchComponent;
  let fixture: ComponentFixture<PartsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
