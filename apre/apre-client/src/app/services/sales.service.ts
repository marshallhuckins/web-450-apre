import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the shape of a sales‐by‐category record
export interface SaleCategory {
  category: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = '/api/sales/category';

  constructor(private http: HttpClient) { }

  getSalesByCategory(): Observable<SaleCategory[]> {
    return this.http.get<SaleCategory[]>(this.apiUrl);
  }
}
