import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesDetailsV1Component } from './view-sales-details.component';

describe('ViewSalesDetailsComponent', () => {
  let component: ViewSalesDetailsV1Component;
  let fixture: ComponentFixture<ViewSalesDetailsV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSalesDetailsV1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSalesDetailsV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
