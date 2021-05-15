import { TestBed } from '@angular/core/testing';

import { ScheduleManagerService } from './schedule-manager.service';

describe('ScheduleManagerService', () => {
  let service: ScheduleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
