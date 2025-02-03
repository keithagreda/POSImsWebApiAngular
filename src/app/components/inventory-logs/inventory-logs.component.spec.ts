import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLogsComponent } from './inventory-logs.component';

describe('InventoryLogsComponent', () => {
  let component: InventoryLogsComponent;
  let fixture: ComponentFixture<InventoryLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
