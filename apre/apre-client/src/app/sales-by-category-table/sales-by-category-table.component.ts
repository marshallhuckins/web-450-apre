import { Component, OnInit } from '@angular/core';
import { SalesService, SaleCategory } from '../services/sales.service';
import { TableComponent } from '../shared/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-by-category-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './sales-by-category-table.component.html',
  styleUrls: ['./sales-by-category-table.component.css']
})

export class SalesByCategoryTableComponent implements OnInit {
  // title shown above the table
  title = 'Sales by Category';

  // raw data from the server
  data: SaleCategory[] = [];

  // property names on each SaleCategory object
  headers = ['category', 'total'];

  // allow sorting on both columns
  sortableColumns = this.headers;

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.salesService.getSalesByCategory().subscribe({
      next: res => this.data = res,
      error: err => console.error('Failed to load sales data', err)
    });
  }
}

