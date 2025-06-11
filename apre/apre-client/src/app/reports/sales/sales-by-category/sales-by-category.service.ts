import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesCategory {
  category: string;
  totalSales: number;
}

@Injectable({ providedIn: 'root' })
export class SalesByCategoryService {

  private apiUrl = 'http://localhost:3000/api/reports/sales/category';

  constructor(private http: HttpClient) {}

  getSalesByCategory(): Observable<SalesCategory[]> {
    return this.http.get<SalesCategory[]>(this.apiUrl);
  }
}