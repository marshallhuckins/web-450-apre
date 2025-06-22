import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FeedbackYear {
  year: number;
  feedbackCount: number;
}

@Injectable({ providedIn: 'root' })
export class CustomerFeedbackYearService {
  private apiUrl = 'http://localhost:3000/api/reports/customer-feedback/year';

  constructor(private http: HttpClient) {}

  getFeedbackByYear(): Observable<FeedbackYear[]> {
    return this.http.get<FeedbackYear[]>(this.apiUrl);
  }
}
