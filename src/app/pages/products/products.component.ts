import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  ProductV1Dto,
  ProductService,
} from 'src/app/services/nswag/nswag.service';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';
import { P } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MaterialModule,
    DialogModule,
    CommonModule,
    CreateOrEditProductComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  @ViewChild(CreateOrEditProductComponent)
  createOrEditProductComponent!: CreateOrEditProductComponent;
  displayedColumns1: string[] = [
    'productCode',
    'name',
    'price',
    'daysTillExpiration',
    'category',
    'action',
  ];
  visible = false;
  products: ProductV1Dto[] = [];
  constructor(
    private _productService: ProductService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }

  onShow() {
    this.visible = true;
  }

  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.products = res.data;
          console.log(res);
        }
        if (!res.isSuccess) {
          console.error(res.data);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showCreateModal(id?: number) {
    this.createOrEditProductComponent.show(id);
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete this product? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete operation here
        this._productService.deleteProduct(id).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              this._toastr.success('Product deleted successfully');
              this.getProducts();
            }
            if (!res.isSuccess) {
              this._toastr.error('Error deleting product');
            }
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }
}
