import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SalesByCategoryTableComponent } from './sales-by-category-table.component';
import { of } from 'rxjs';
import { SalesService, SaleCategory } from '../services/sales.service';
import { By } from '@angular/platform-browser';



describe('SalesByCategoryTableComponent', () => {
  let component: SalesByCategoryTableComponent;
  let fixture: ComponentFixture<SalesByCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SalesByCategoryTableComponent,  // standalone component
        HttpClientTestingModule         // to satisfy HttpClient in the service
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByCategoryTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call SalesService.getSalesByCategory and populate data', () => {
  // Arrange
  const mockData: SaleCategory[] = [
    { category: 'TestCat1', total: 100 },
    { category: 'TestCat2', total: 200 }
  ];
  const salesService = TestBed.inject(SalesService);
  spyOn(salesService, 'getSalesByCategory').and.returnValue(of(mockData));

  // Act
  fixture.detectChanges(); // triggers ngOnInit

  // Assert
  expect(salesService.getSalesByCategory).toHaveBeenCalled();
  expect(component.data).toEqual(mockData);
  });

  it('should render a table row for each SaleCategory item', () => {
  // Arrange
  const mockData: SaleCategory[] = [
    { category: 'A', total: 10 },
    { category: 'B', total: 20 },
    { category: 'C', total: 30 }
  ];
  const salesService = TestBed.inject(SalesService);
  spyOn(salesService, 'getSalesByCategory').and.returnValue(of(mockData));

  // Act
  fixture.detectChanges(); // runs ngOnInit and renders template

  // Assert
  const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));
  expect(tableRows.length).toBe(mockData.length);

  // Optional: check contents of first row
  const firstRowCells = tableRows[0].queryAll(By.css('td'));
  expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('A');
  expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('10');
  });

});
