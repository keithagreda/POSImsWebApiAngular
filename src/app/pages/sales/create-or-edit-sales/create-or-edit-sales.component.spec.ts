import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditSalesComponent } from './create-or-edit-sales.component';

describe('CreateOrEditSalesComponent', () => {
  let component: CreateOrEditSalesComponent;
  let fixture: ComponentFixture<CreateOrEditSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
