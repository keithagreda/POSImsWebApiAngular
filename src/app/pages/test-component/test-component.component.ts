import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import {
  GetProductDropDownTableDto,
  ProductService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
})
export class TestComponentComponent implements OnInit {
  items: GetProductDropDownTableDto[] = [];
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService
      .getProductDropDownTable(null, null, null)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.items = res.data.items ?? [];
        }
      });
  }
}
