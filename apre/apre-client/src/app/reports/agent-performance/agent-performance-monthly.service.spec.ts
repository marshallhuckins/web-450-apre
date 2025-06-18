import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  AgentPerformanceMonthlyService,
  MonthPerformance
} from './agent-performance-monthly.service';

describe('AgentPerformanceMonthlyService', () => {
  let service: AgentPerformanceMonthlyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting],
      providers: [AgentPerformanceMonthlyService]
    });
    service  = TestBed.inject(AgentPerformanceMonthlyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should issue a GET request to the correct URL', () => {
    service.getMonthlyPerformance().subscribe();
    const req = httpMock.expectOne('/api/reports/agent-performance/monthly');
    expect(req.request.method).toBe('GET');
    // respond with an empty array to complete the call
    req.flush([]);
  });

  it('should return an array of MonthPerformance objects', () => {
    const mockResponse: MonthPerformance[] = [
      { month: '2023-01', averagePerformance: 75 },
      { month: '2023-02', averagePerformance: 80 }
    ];

    service.getMonthlyPerformance().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/reports/agent-performance/monthly');
    req.flush(mockResponse);
  });
});
