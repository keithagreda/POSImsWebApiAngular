import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStocksComponent } from './current-stocks.component';

describe('CurrentStocksComponent', () => {
  let component: CurrentStocksComponent;
  let fixture: ComponentFixture<CurrentStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
