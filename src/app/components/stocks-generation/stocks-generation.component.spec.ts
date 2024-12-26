import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksGenerationComponent } from './stocks-generation.component';

describe('StocksGenerationComponent', () => {
  let component: StocksGenerationComponent;
  let fixture: ComponentFixture<StocksGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
