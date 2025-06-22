import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { CustomerFeedbackYearService, FeedbackYear } from '../customer-feedback-year.service';

@Component({
  selector: 'app-feedback-by-year',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './feedback-by-year.component.html',
  styleUrls: ['./feedback-by-year.component.css']
})
export class FeedbackByYearComponent implements OnInit {
  data: number[] = [];
  labels: string[] = [];
  label = 'Feedback Count';

  constructor(private svc: CustomerFeedbackYearService) {}

  ngOnInit() {
  console.log('🐛 About to fetch feedback-by-year…');
  this.svc.getFeedbackByYear().subscribe({
    next: (years: FeedbackYear[]) => {
      console.log('🐛 API payload:', years);
      this.labels = years.map(y => y.year.toString());
      this.data   = years.map(y => y.feedbackCount);
    },
    error: err => console.error('✖ API error:', err)
  });
}

}
