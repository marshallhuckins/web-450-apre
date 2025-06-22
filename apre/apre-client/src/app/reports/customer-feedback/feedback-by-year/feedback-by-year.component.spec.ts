import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { FeedbackByYearComponent } from './feedback-by-year.component';

describe('FeedbackByYearComponent', () => {
  let component: FeedbackByYearComponent;
  let fixture: ComponentFixture<FeedbackByYearComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeedbackByYearComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackByYearComponent);
    component = fixture.componentInstance;
    httpMock  = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle API error without throwing', () => {
    spyOn(console, 'error');

    // trigger ngOnInit()
    fixture.detectChanges();

    // grab all requests to the feedback-by-year endpoint
    const calls = httpMock.match(req =>
      req.url.includes('/api/reports/customer-feedback/year')
    );
    expect(calls.length).toBeGreaterThan(0);

    // simulate error on each
    calls.forEach(req => req.error(new ErrorEvent('Network error')));

    // after errors, labels & data stay empty
    expect(component.labels).toEqual([]);
    expect(component.data).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should fetch and map API data into labels & data arrays', () => {
    const mockResponse = [
      { year: 2023, feedbackCount: 10 },
      { year: 2024, feedbackCount: 20 }
    ];

    // trigger ngOnInit()
    fixture.detectChanges();

    // match all your requests
    const calls = httpMock.match(req =>
      req.url.includes('/api/reports/customer-feedback/year') &&
      req.method === 'GET'
    );
    expect(calls.length).toBeGreaterThanOrEqual(1);

    // flush the mock response on each call
    calls.forEach(req => req.flush(mockResponse));

    // map should now be applied once (or multiple times, but end state:)
    expect(component.labels).toEqual(['2023', '2024']);
    expect(component.data).toEqual([10, 20]);
  });
});
