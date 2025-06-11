import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SalesByCategoryService,
  SalesCategory
} from './sales-by-category.service';

@Component({
  selector: 'app-sales-by-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-by-category.component.html',
  styles: [`
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      padding: 8px 12px;
      border: 1px solid #ddd;
    }
    .table th {
      background: #f0f0f0;
      text-align: left;
    }
    .card {
      padding: 1rem;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class SalesByCategoryComponent implements OnInit {
  sales: SalesCategory[] = [];

  constructor(private svc: SalesByCategoryService) {}

  ngOnInit() {
    this.svc.getSalesByCategory().subscribe({
      next: data => this.sales = data,
      error: err => console.error('API error:', err)
    });
  }
}
