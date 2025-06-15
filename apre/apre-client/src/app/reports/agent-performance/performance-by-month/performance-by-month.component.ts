import { Component, OnInit } from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ChartComponent }       from '../../../shared/chart/chart.component';
import {
  AgentPerformanceMonthlyService,
  MonthPerformance
} from '../agent-performance-monthly.service';

@Component({
  selector: 'app-performance-by-month',
  standalone: true,
  imports: [ CommonModule, ChartComponent ],
  templateUrl: './performance-by-month.component.html',
  styleUrls: ['./performance-by-month.component.css']
})
export class PerformanceByMonthComponent implements OnInit {
  data: number[] = [];
  labels: string[] = [];
  label = 'Avg Performance';

  constructor(private svc: AgentPerformanceMonthlyService) {}

  ngOnInit() {
    this.svc.getMonthlyPerformance().subscribe({
      next: (months: MonthPerformance[]) => {
        this.labels = months.map(m => m.month);
        this.data   = months.map(m => m.averagePerformance);
      },
      error: err => console.error('✖ API error:', err)
    });
  }
}
