import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  CreateProductDto,
  ProductCategoryDto,
  ProductCategoryService,
  ProductService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-create-or-edit-product',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-or-edit-product.component.html',
  styleUrl: './create-or-edit-product.component.scss',
})
export class CreateOrEditProductComponent {
  productCategories: ProductCategoryDto[] = [];
  createOrEditProduct: CreateProductDto = new CreateProductDto();
  createProductForm!: FormGroup;
  visible = false;
  constructor(
    private fb: FormBuilder,
    private _toastr: ToastrService,
    private _productService: ProductService,
    private _productCategoryService: ProductCategoryService
  ) {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.min(1)],
      daysTillExpiration: ['', Validators.required, Validators.min(1)],
      categories: this.fb.array([]),
    });
  }

  closeForm() {
    this.visible = false;
  }

  show(id?: number) {
    this.visible = true;
    if (!id) {
      this.createOrEditProduct = new CreateProductDto();
      return;
    }
    this.getProduct(id);
    //get product
  }

  get categories(): FormArray {
    return this.createProductForm.get('categories') as FormArray;
  }

  addCategory() {
    this.categories.push(new FormControl(''));
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index); // Remove category at specific index
  }

  getCategory() {}

  getProduct(id: number) {
    this._productService.getProductForEdit(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.createOrEditProduct = res.data;
        }
      },
      error: (err) => {
        this._toastr.error('Something went wrong. While retrieving product');
      },
    });
  }

  onSubmit() {
    console.log(this.createProductForm);
    this._productService.createProduct(this.createProductForm.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._toastr.success(res.data);
          this.closeForm();
        }
        if (!res.isSuccess) {
          this._toastr.error(res.data);
        }
      },
      error: (err) => {
        this._toastr.error('Something went wrong. While creating product');
      },
    });
  }
}
