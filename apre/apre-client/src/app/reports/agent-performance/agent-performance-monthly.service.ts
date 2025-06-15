import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonthPerformance {
  month: string;
  averagePerformance: number;
}

@Injectable({ providedIn: 'root' })
export class AgentPerformanceMonthlyService {
  private apiUrl = 'http://localhost:3000/api/reports/agent-performance/monthly';

  constructor(private http: HttpClient) {}

  getMonthlyPerformance(): Observable<MonthPerformance[]> {
    return this.http.get<MonthPerformance[]>(this.apiUrl);
  }
}
