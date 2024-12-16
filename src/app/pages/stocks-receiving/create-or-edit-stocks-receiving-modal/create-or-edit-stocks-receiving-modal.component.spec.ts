import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditStocksReceivingModalComponent } from './create-or-edit-stocks-receiving-modal.component';

describe('CreateOrEditStocksReceivingModalComponent', () => {
  let component: CreateOrEditStocksReceivingModalComponent;
  let fixture: ComponentFixture<CreateOrEditStocksReceivingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditStocksReceivingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditStocksReceivingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
