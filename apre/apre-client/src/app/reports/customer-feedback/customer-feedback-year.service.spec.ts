import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  CustomerFeedbackYearService,
  FeedbackYear
} from './customer-feedback-year.service';

describe('CustomerFeedbackYearService', () => {
  let service: CustomerFeedbackYearService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerFeedbackYearService]
    });
    service  = TestBed.inject(CustomerFeedbackYearService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should issue a GET request to the correct URL', () => {
    service.getFeedbackByYear().subscribe();

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      // match only the path, ignore host/port
      r.url.endsWith('/api/reports/customer-feedback/year')
    );
    expect(req.request.method).toBe('GET');
    req.flush([]); // complete it
  });

  it('should return an array of FeedbackYear objects', () => {
    const mockResponse: FeedbackYear[] = [
      { year: 2023, feedbackCount: 12 },
      { year: 2024, feedbackCount: 18 }
    ];

    service.getFeedbackByYear().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url.endsWith('/api/reports/customer-feedback/year')
    );
    req.flush(mockResponse);
  });
});
