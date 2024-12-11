import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditProductComponent } from './create-or-edit-product.component';

describe('CreateOrEditProductComponent', () => {
  let component: CreateOrEditProductComponent;
  let fixture: ComponentFixture<CreateOrEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
