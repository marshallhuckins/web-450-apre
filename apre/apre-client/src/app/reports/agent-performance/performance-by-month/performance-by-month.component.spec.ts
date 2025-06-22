import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PerformanceByMonthComponent } from './performance-by-month.component';
import { AgentPerformanceMonthlyService, MonthPerformance } from '../agent-performance-monthly.service';

describe('PerformanceByMonthComponent', () => {
  let component: PerformanceByMonthComponent;
  let fixture: ComponentFixture<PerformanceByMonthComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PerformanceByMonthComponent,  // standalone component
        HttpClientTestingModule       // provides HttpClient & the mock controller
      ],
      providers: [
        AgentPerformanceMonthlyService
      ]
    }).compileComponents();

    fixture  = TestBed.createComponent(PerformanceByMonthComponent);
    component = fixture.componentInstance;
    httpMock  = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // ensure no stray requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and populate labels & data', () => {
    const mockResponse: MonthPerformance[] = [
      { month: '2023-01', averagePerformance: 75 },
      { month: '2023-02', averagePerformance: 80 }
    ];

    // trigger ngOnInit
    fixture.detectChanges();

    // match GET to our API endpoint
    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url.endsWith('/api/reports/agent-performance/monthly')
    );
    expect(req.request.method).toBe('GET');

    // respond with mock data
    req.flush(mockResponse);

    // after flush, component arrays should be set
    expect(component.labels).toEqual(['2023-01', '2023-02']);
    expect(component.data).toEqual([75, 80]);
  });

  it('should handle API error without throwing', () => {
    spyOn(console, 'error');

    // trigger ngOnInit
    fixture.detectChanges();

    // simulate network error
    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url.endsWith('/api/reports/agent-performance/monthly')
    );
    req.error(new ErrorEvent('Network error'));

    // component should catch and log, but not throw
    expect(console.error).toHaveBeenCalled();
    expect(component.labels).toEqual([]);
    expect(component.data).toEqual([]);
  });
});
