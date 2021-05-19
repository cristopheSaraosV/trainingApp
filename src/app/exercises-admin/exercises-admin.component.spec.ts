import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesAdminComponent } from './exercises-admin.component';

describe('ExercisesAdminComponent', () => {
  let component: ExercisesAdminComponent;
  let fixture: ComponentFixture<ExercisesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
