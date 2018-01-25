import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFavComponent } from './side-bar-fav.component';

describe('SideBarFavComponent', () => {
  let component: SideBarFavComponent;
  let fixture: ComponentFixture<SideBarFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
