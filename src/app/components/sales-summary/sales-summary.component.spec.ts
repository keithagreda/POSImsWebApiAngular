import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSummaryComponent } from './sales-summary.component';

describe('SalesSummaryComponent', () => {
  let component: SalesSummaryComponent;
  let fixture: ComponentFixture<SalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
