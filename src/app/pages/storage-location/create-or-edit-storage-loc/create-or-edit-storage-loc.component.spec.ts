import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditStorageLocComponent } from './create-or-edit-storage-loc.component';

describe('CreateOrEditStorageLocComponent', () => {
  let component: CreateOrEditStorageLocComponent;
  let fixture: ComponentFixture<CreateOrEditStorageLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditStorageLocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditStorageLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
