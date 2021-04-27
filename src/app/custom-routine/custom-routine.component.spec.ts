import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRoutineComponent } from './custom-routine.component';

describe('CustomRoutineComponent', () => {
  let component: CustomRoutineComponent;
  let fixture: ComponentFixture<CustomRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
