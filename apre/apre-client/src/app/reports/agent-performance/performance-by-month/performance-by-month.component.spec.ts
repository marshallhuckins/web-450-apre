import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceByMonthComponent } from './performance-by-month.component';

describe('PerformanceByMonthComponent', () => {
  let component: PerformanceByMonthComponent;
  let fixture: ComponentFixture<PerformanceByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceByMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
