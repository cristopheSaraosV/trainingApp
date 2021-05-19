import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksAdminComponent } from './parks-admin.component';

describe('ParksAdminComponent', () => {
  let component: ParksAdminComponent;
  let fixture: ComponentFixture<ParksAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParksAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParksAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
