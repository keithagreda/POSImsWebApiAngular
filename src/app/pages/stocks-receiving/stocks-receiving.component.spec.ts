import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksReceivingComponent } from './stocks-receiving.component';

describe('StocksReceivingComponent', () => {
  let component: StocksReceivingComponent;
  let fixture: ComponentFixture<StocksReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksReceivingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
