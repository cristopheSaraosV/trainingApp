import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRoutinesComponent } from './home-routines.component';

describe('HomeRoutinesComponent', () => {
  let component: HomeRoutinesComponent;
  let fixture: ComponentFixture<HomeRoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRoutinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
