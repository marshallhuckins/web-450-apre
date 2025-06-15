import { TestBed } from '@angular/core/testing';

import { AgentPerformanceMonthlyService } from './agent-performance-monthly.service';

describe('AgentPerformanceMonthlyService', () => {
  let service: AgentPerformanceMonthlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentPerformanceMonthlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
