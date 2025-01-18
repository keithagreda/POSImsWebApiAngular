import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditProductCategComponent } from './create-or-edit-product-categ.component';

describe('CreateOrEditProductCategComponent', () => {
  let component: CreateOrEditProductCategComponent;
  let fixture: ComponentFixture<CreateOrEditProductCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditProductCategComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditProductCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
