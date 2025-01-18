import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';
import { LoadingService } from 'src/app/services/loading.service';
import {
  ProductCategoryService,
  StorageLocationService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-create-or-edit-product-categ',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-or-edit-product-categ.component.html',
  styleUrl: './create-or-edit-product-categ.component.scss',
})
export class CreateOrEditProductCategComponent {
  @Output() modalSave = new EventEmitter<any>();
  createProductCateg: FormGroup;
  visible = false;
  constructor(
    private fb: FormBuilder,
    private _productCategoryService: ProductCategoryService,
    private _loadingService: LoadingService,
    private _toastr: ToastrService
  ) {
    this.createProductCateg = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  save() {
    this._loadingService.show();
    this._productCategoryService
      .addProductCategory(this.createProductCateg.value)
      .subscribe({
        next: (res) => {
          this._loadingService.hide();
          if (!res.isSuccess) {
            this._toastr.warning(res.message);
            return;
          }
          this._toastr.success(res.message);
          this.visible = false;
          this.modalSave.emit(null);
          return;
        },
        error: (err) => {
          this._loadingService.hide();
          console.error(err);
        },
      });
  }

  close() {
    this.visible = false;
    this.createProductCateg.reset();
  }

  show() {
    this.visible = true;
  }
}
