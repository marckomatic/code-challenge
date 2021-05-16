import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPlannerComponent } from './daily-planner.component';

describe('DailyPlannerComponent', () => {
  let component: DailyPlannerComponent;
  let fixture: ComponentFixture<DailyPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
