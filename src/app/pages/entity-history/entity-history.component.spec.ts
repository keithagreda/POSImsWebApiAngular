import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityHistoryComponent } from './entity-history.component';

describe('EntityHistoryComponent', () => {
  let component: EntityHistoryComponent;
  let fixture: ComponentFixture<EntityHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
