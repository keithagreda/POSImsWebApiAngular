import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import { CreateOrEditProductCategComponent } from './create-or-edit-product-categ/create-or-edit-product-categ.component';
import {
  ProductCategoryDto,
  ProductCategoryService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    MaterialModule,
    DialogModule,
    CommonModule,
    CreateOrEditProductCategComponent,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild(CreateOrEditProductCategComponent)
  createOrEditProductCategComponent!: CreateOrEditProductCategComponent;
  displayedColumns1: string[] = ['name', 'action'];
  productCategoryDto: ProductCategoryDto[] = [];
  constructor(private _productCategService: ProductCategoryService) {}
  ngOnInit(): void {
    this.getProductCateg();
  }

  getProductCateg() {
    this._productCategService.getProductCategory().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.productCategoryDto = res.data ?? [];
        }
        if (!res.isSuccess) {
          console.warn(res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showCreateModal() {
    this.createOrEditProductCategComponent.show();
  }
}
