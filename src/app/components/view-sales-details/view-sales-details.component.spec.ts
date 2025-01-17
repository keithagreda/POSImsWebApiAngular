import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesDetailsComponent } from './view-sales-details.component';

describe('ViewSalesDetailsComponent', () => {
  let component: ViewSalesDetailsComponent;
  let fixture: ComponentFixture<ViewSalesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSalesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
