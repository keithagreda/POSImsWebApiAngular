import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  ProductDto,
  ProductService,
} from 'src/app/services/nswag/nswag.service';
import { CreateOrEditProductComponent } from './create-or-edit-product/create-or-edit-product.component';

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
    'action',
  ];
  visible = false;
  products: ProductDto[] = [];
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

  showCreateModal() {
    this.createOrEditProductComponent.show();
  }
}
