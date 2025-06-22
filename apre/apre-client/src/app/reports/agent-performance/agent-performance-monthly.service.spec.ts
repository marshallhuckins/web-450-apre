import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  AgentPerformanceMonthlyService,
  MonthPerformance
} from './agent-performance-monthly.service';

describe('AgentPerformanceMonthlyService', () => {
  let service: AgentPerformanceMonthlyService;
  let httpMock: HttpTestingController;
  const fullUrl = 'http://localhost:3000/api/reports/agent-performance/monthly';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentPerformanceMonthlyService]
    });
    service  = TestBed.inject(AgentPerformanceMonthlyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should issue a GET request to the correct URL', () => {
    service.getMonthlyPerformance().subscribe();
    const testReq = httpMock.expectOne(req =>
      req.method === 'GET' && req.url === fullUrl
    );
    expect(testReq.request.method).toBe('GET');
    testReq.flush([]); // complete
  });

  it('should return an array of MonthPerformance objects', () => {
    const mock: MonthPerformance[] = [
      { month: '2023-01', averagePerformance: 75 },
      { month: '2023-02', averagePerformance: 80 }
    ];
    service.getMonthlyPerformance().subscribe(data => {
      expect(data).toEqual(mock);
    });
    const testReq = httpMock.expectOne(req => req.url === fullUrl);
    testReq.flush(mock);
  });
});
